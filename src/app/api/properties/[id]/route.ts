import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export const runtime = 'edge';

// GET /api/properties/[id] - Get single property
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
  const resolvedParams = await context.params;
  const id = resolvedParams.id;
    const property = await db.property.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            isVerified: true,
            avatar: true,
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        documents: {
          select: {
            id: true,
            name: true,
            type: true,
            url: true,
            isVerified: true,
          },
        },
      },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Increment view count
    await db.property.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    // Calculate average rating
    const avgRating = property.reviews.length > 0 
      ? property.reviews.reduce((sum, review) => sum + review.rating, 0) / property.reviews.length
      : 0;

    return NextResponse.json({
      ...property,
      avgRating,
      reviewCount: property.reviews.length,
    });
  } catch (error) {
    console.error('Get property error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/properties/[id] - Update property
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  const resolvedParams = await context.params;
  const id = resolvedParams.id;

    // Check if property exists and user owns it
    const existingProperty = await db.property.findUnique({
      where: { id },
      include: { owner: true },
    });

    if (!existingProperty) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Resolve current user from DB to obtain their id
    const currentUser = await db.user.findUnique({ where: { email: session.user.email } });
    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (existingProperty.ownerId !== currentUser.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    
    // Update property
    const property = await db.property.update({
      where: { id },
      data: body,
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
      message: 'Property updated successfully',
      property,
    });
  } catch (error) {
    console.error('Update property error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/properties/[id] - Delete property
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  const resolvedParams = await context.params;
  const id = resolvedParams.id;

    // Check if property exists and user owns it
    const existingProperty = await db.property.findUnique({
      where: { id },
      include: { owner: true },
    });

    if (!existingProperty) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    const currentUser = await db.user.findUnique({ where: { email: session.user.email } });
    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (existingProperty.ownerId !== currentUser.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Delete property
    await db.property.delete({
      where: { id },
    });

    return NextResponse.json({
      message: 'Property deleted successfully',
    });
  } catch (error) {
    console.error('Delete property error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}