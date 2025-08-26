import { NextRequest, NextResponse } from 'next/server';
import { getStripe, cancelSubscription as cancelStripeSubscription } from '@/lib/stripe';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { NotificationType } from '@prisma/client';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !user.stripeCustomerId) {
      return NextResponse.json({ error: 'User not found or no subscription' }, { status: 404 });
    }

    // Get user's active subscription
    const stripe = getStripe();
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 404 });
    }

    const subscription = subscriptions.data[0];

    // Cancel subscription at period end
    const canceledSubscription = await cancelStripeSubscription(subscription.id);    // Update user in database
    await db.user.update({
      where: { id: user.id },
      data: {
        subscriptionEnd: new Date((canceledSubscription as any).current_period_end * 1000),
      },
    });

    // Create notification
    await db.notification.create({
      data: {
        type: NotificationType.ACCOUNT_UPDATE,
        title: 'Subscription Canceled',
        message: 'Your subscription has been canceled and will end at the current billing period.',
        userId: user.id,
      },
    });

    return NextResponse.json({ 
      message: 'Subscription canceled successfully',
  endDate: new Date((canceledSubscription as any).current_period_end * 1000)
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}