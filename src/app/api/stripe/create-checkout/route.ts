import { NextRequest, NextResponse } from 'next/server';
import stripe, { createStripeCustomer, createCheckoutSession } from '@/lib/stripe';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { priceId, planId, billingCycle = 'monthly' } = await request.json();

    if (!priceId || !planId) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create or get Stripe customer
    let stripeCustomer;
    if (user.stripeCustomerId) {
      stripeCustomer = await stripe.customers.retrieve(user.stripeCustomerId);
    } else {
  stripeCustomer = await createStripeCustomer(
        user.email,
        user.name || undefined
      );
      
      // Update user with Stripe customer ID
      await db.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: stripeCustomer.id },
      });
    }

    // Create checkout session
    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`;

    const checkoutSession = await createCheckoutSession(
      (stripeCustomer as any).id,
      priceId,
      successUrl,
      cancelUrl,
      {
        planId,
        billingCycle,
        userId: user.id,
      }
    );
    return NextResponse.json({ sessionId: (checkoutSession as any).id, url: (checkoutSession as any).url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}