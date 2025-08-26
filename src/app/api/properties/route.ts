import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { PropertyType, PropertyStatus, ListingType } from '@prisma/client';
import { z } from 'zod';

// Note: This route uses NextAuth which requires Node.js runtime, not edge

const createPropertySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.nativeEnum(PropertyType),
  price: z.number().positive('Price must be positive'),
  currency: z.string().default('USD'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province is required'),
  country: z.string().default('DO'),
  zipCode: z.string().optional(),
  coordinates: z.string().optional(),
  area: z.number().positive('Area must be positive'),
  bedrooms: z.number().int().positive().optional(),
  bathrooms: z.number().int().positive().optional(),
  yearBuilt: z.number().int().positive().optional(),
  features: z.string().optional(),
  taxIncentives: z.string().optional(),
  images: z.array(z.string()).default([]),
  documents: z.array(z.string()).default([]),
  videoUrl: z.string().url().optional(),
  virtualTourUrl: z.string().url().optional(),
  listingType: z.nativeEnum(ListingType).default(ListingType.SALE),
  rentalPrice: z.number().positive().optional(),
});

// GET /api/properties - Get properties with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = (page - 1) * limit;

    // Filters
    const type = searchParams.get('type') as PropertyType | null;
    const status = searchParams.get('status') as PropertyStatus | null;
    const listingType = searchParams.get('listingType') as ListingType | null;
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const city = searchParams.get('city');
    const province = searchParams.get('province');
    const featured = searchParams.get('featured') === 'true';
    const verified = searchParams.get('verified') === 'true';
    const search = searchParams.get('search');

    // Build where clause
    const where: any = {};
    
    if (type) where.type = type;
    if (status) where.status = status;
    if (listingType) where.listingType = listingType;
    if (featured) where.isFeatured = true;
    if (verified) where.isVerified = true;
    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (province) where.province = { contains: province, mode: 'insensitive' };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { province: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    // Get properties with pagination
    const [properties, total] = await Promise.all([
      db.property.findMany({
        where,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
              isVerified: true,
            },
          },
          reviews: {
            select: {
              rating: true,
              comment: true,
            },
          },
        },
        orderBy: [
          { isFeatured: 'desc' },
          { createdAt: 'desc' },
        ],
        skip: offset,
        take: limit,
      }),
      db.property.count({ where }),
    ]);

    // Calculate average rating for each property
    const propertiesWithRatings = properties.map(property => {
      const avgRating = property.reviews.length > 0 
        ? property.reviews.reduce((sum, review) => sum + review.rating, 0) / property.reviews.length
        : 0;
      
      return {
        ...property,
        avgRating,
        reviewCount: property.reviews.length,
      };
    });

    return NextResponse.json({
      properties: propertiesWithRatings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get properties error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/properties - Create new property
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate input
    const validatedData = createPropertySchema.parse(body);
    
    // Get user from session
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check user subscription limits
    const userPropertiesCount = await db.property.count({
      where: { ownerId: user.id },
    });

    const subscriptionLimits = {
      FREE: 1,
      BASIC: 100,
      PROFESSIONAL: 600,
      ENTERPRISE: Infinity,
    };

    const maxProperties = subscriptionLimits[user.subscriptionTier] || 1;
    
    if (userPropertiesCount >= maxProperties) {
      return NextResponse.json(
        { error: `Property limit reached. Your ${user.subscriptionTier} plan allows ${maxProperties} properties.` },
        { status: 403 }
      );
    }

    // Create property
    const { images, documents, ...rest } = validatedData;
    const property = await db.property.create({
      data: {
        ...rest,
        images: images && images.length ? JSON.stringify(images) : undefined,
        documentUrls: documents && documents.length ? JSON.stringify(documents) : undefined,
        ownerId: user.id,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            isVerified: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: 'Property created successfully',
      property,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Create property error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}