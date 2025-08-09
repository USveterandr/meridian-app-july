import { PrismaClient, UserRole, SubscriptionTier, PropertyType, PropertyStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@meridian.com' },
    update: {},
    create: {
      email: 'admin@meridian.com',
      name: 'Admin User',
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
      subscriptionTier: SubscriptionTier.UNLIMITED,
      isVerified: true,
      country: 'DO',
      language: 'en',
    },
  });

  // Create Meridian subscription plans
  const subscriptionPlans = [
    {
      name: 'Initial',
      description: 'Individual Owners',
      tier: SubscriptionTier.INITIAL,
      price: 0,
      originalPrice: 49,
      discountPercent: 100,
      maxUsers: 1,
      maxProperties: 1,
      maxPhotos: 12,
      commissionRate: 0,
      targetAudience: 'Individual Owners',
      features: JSON.stringify(['Basic Buyer Verification', 'Manual Contract Templates', 'Email Support']),
      isPromotional: true,
    },
    {
      name: 'Team',
      description: 'Small Agencies or Families',
      tier: SubscriptionTier.TEAM,
      price: 97,
      originalPrice: 147,
      discountPercent: 34,
      maxUsers: 3,
      maxProperties: 100,
      maxPhotos: 12,
      commissionRate: 0.05,
      targetAudience: 'Small Agencies or Families',
      features: JSON.stringify(['Advanced Verification (ID + Income)', '0.05% Commission', 'Digital Contract Generator', 'Lead Scoring System', 'Commission Protection for 365 Days', '24/7 Chat Support']),
    },
    {
      name: 'Company Lite',
      description: 'Growing Brokerages',
      tier: SubscriptionTier.COMPANY_LITE,
      price: 499,
      originalPrice: 697,
      discountPercent: 28,
      maxUsers: 12,
      maxProperties: 600,
      maxPhotos: 18,
      commissionRate: 0,
      targetAudience: 'Growing Brokerages',
      features: JSON.stringify(['Biometric Buyer Verification', '0% Commission', 'Auto-Renewable Smart Contracts', 'Integration with Escrow Services', 'Commission Protection for 180 Days', 'Dedicated Account Manager']),
    },
    {
      name: 'Unlimited',
      description: 'Large Institutions',
      tier: SubscriptionTier.UNLIMITED,
      price: 199,
      originalPrice: null,
      discountPercent: null,
      maxUsers: -1,
      maxProperties: -1,
      maxPhotos: 24,
      commissionRate: 0,
      targetAudience: 'Large Institutions',
      features: JSON.stringify(['AI Verification (Anti-Money Laundering)', 'Lifetime Commission Protection', 'Customizable Contracts and Branding', '24/7 Legal/Technical Support']),
    },
  ];

  // Create additional packages
  const additionalPackages = [
    {
      name: 'Essential Exposure',
      description: 'Basic Package',
      price: 399,
      features: JSON.stringify(['25 Professionally Edited Photos', '90-second HD Video Tour', '5 Drone Photos', 'SEO Optimization']),
    },
    {
      name: 'Premium Presentation',
      description: 'Professional Package',
      price: 899,
      features: JSON.stringify(['50 Advanced Edited Photos', '3-minute Cinematic Video', '15 Drone Photos']),
    },
    {
      name: 'Maximum Exposure',
      description: 'Concierge Package',
      price: 1999,
      features: JSON.stringify(['75+ Magazine-Style Photos', '5-minute Cinematic Video', 'Global Distribution on Luxury Portals']),
    },
  ];

  // Create promotional coupons
  const coupons = [
    {
      code: 'FIRST1000',
      discountPercent: 50,
      maxUses: 1000,
      expiresAt: new Date('2025-12-31'),
    },
  ];

  for (const plan of subscriptionPlans) {
    await prisma.subscriptionPlan.upsert({
      where: { tier: plan.tier },
      update: {},
      create: plan,
    });
  }

  for (const pkg of additionalPackages) {
    await prisma.additionalPackage.create({
      data: pkg,
    });
  }

  for (const coupon of coupons) {
    await prisma.coupon.upsert({
      where: { code: coupon.code },
      update: {},
      create: coupon,
    });
  }

  // Create sample properties
  const sampleProperties = [
    {
      title: 'Luxury Beachfront Villa',
      description: 'Stunning oceanfront property with panoramic views',
      type: PropertyType.VILLA,
      status: PropertyStatus.AVAILABLE,
      price: 850000,
      address: 'Playa Dorada, Puerto Plata',
      city: 'Puerto Plata',
      province: 'Puerto Plata',
      area: 450,
      bedrooms: 4,
      bathrooms: 3,
      yearBuilt: 2020,
      ownerId: adminUser.id,
    },
    {
      title: 'Modern Downtown Condo',
      description: 'Contemporary living in the heart of the city',
      type: PropertyType.CONDO,
      status: PropertyStatus.AVAILABLE,
      price: 320000,
      address: 'Zona Colonial, Santo Domingo',
      city: 'Santo Domingo',
      province: 'Distrito Nacional',
      area: 120,
      bedrooms: 2,
      bathrooms: 2,
      yearBuilt: 2019,
      ownerId: adminUser.id,
    },
  ];

  for (const property of sampleProperties) {
    await prisma.property.create({
      data: property,
    });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });