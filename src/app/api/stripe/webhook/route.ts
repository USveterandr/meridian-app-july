import { NextRequest, NextResponse } from 'next/server';
import { getStripe, handleWebhook as verifyStripeWebhook } from '@/lib/stripe';
import { SubscriptionTier, NotificationType, PaymentStatus, PaymentMethod } from '@prisma/client';
import { db } from '@/lib/db';

// Note: This route uses Prisma which may not be fully Edge Runtime compatible

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('stripe-signature')!;

  const event = await verifyStripeWebhook(payload, signature);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: any) {
  const { userId, planId, billingCycle } = session.metadata;

  if (!userId || !planId) {
    console.error('Missing metadata in checkout session');
    return;
  }

  // Update user subscription
  await db.user.update({
    where: { id: userId },
    data: {
      subscriptionTier: planId.toUpperCase(),
      stripeCustomerId: session.customer,
      stripePriceId: session.subscription ? 
        (await getStripe().subscriptions.retrieve(session.subscription)).items.data[0].price.id : 
        null,
    },
  });

  // Create payment record
  await db.payment.create({
    data: {
      amount: session.amount_total / 100,
      currency: session.currency,
      status: 'COMPLETED',
      paymentMethod: 'STRIPE',
      stripePaymentId: session.payment_intent,
      stripeInvoiceId: session.invoice,
      description: `Subscription payment for ${planId} plan`,
      userId: userId,
    },
  });
}

async function handleSubscriptionCreated(subscription: any) {
  const customerId = subscription.customer;
  
  // Find user by Stripe customer ID
  const user = await db.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    console.error('User not found for subscription:', customerId);
    return;
  }

  // Update user subscription end date
  const subscriptionEndDate = new Date(subscription.current_period_end * 1000);
  
  await db.user.update({
    where: { id: user.id },
    data: {
      subscriptionEnd: subscriptionEndDate,
      stripePriceId: subscription.items.data[0].price.id,
    },
  });
}

async function handleSubscriptionUpdated(subscription: any) {
  const customerId = subscription.customer;
  
  // Find user by Stripe customer ID
  const user = await db.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    console.error('User not found for subscription update:', customerId);
    return;
  }

  // Update user subscription end date
  const subscriptionEndDate = new Date(subscription.current_period_end * 1000);
  
  await db.user.update({
    where: { id: user.id },
    data: {
      subscriptionEnd: subscriptionEndDate,
      stripePriceId: subscription.items.data[0].price.id,
    },
  });
}

async function handleSubscriptionDeleted(subscription: any) {
  const customerId = subscription.customer;
  
  // Find user by Stripe customer ID
  const user = await db.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    console.error('User not found for subscription deletion:', customerId);
    return;
  }

  // Downgrade user to free tier
  await db.user.update({
    where: { id: user.id },
    data: {
  subscriptionTier: SubscriptionTier.INITIAL,
      subscriptionEnd: new Date(subscription.current_period_end * 1000),
    },
  });
}

async function handleInvoicePaymentSucceeded(invoice: any) {
  const customerId = invoice.customer;
  
  // Find user by Stripe customer ID
  const user = await db.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    console.error('User not found for invoice payment:', customerId);
    return;
  }

  // Create payment record
  await db.payment.create({
    data: {
      amount: invoice.amount_paid / 100,
      currency: invoice.currency,
      status: 'COMPLETED',
      paymentMethod: 'STRIPE',
      stripePaymentId: invoice.payment_intent,
      stripeInvoiceId: invoice.id,
      description: `Subscription payment - ${invoice.lines.data[0].description}`,
      userId: user.id,
    },
  });
}

async function handleInvoicePaymentFailed(invoice: any) {
  const customerId = invoice.customer;
  
  // Find user by Stripe customer ID
  const user = await db.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    console.error('User not found for failed invoice payment:', customerId);
    return;
  }

  // Create failed payment record
  await db.payment.create({
    data: {
      amount: invoice.amount_due / 100,
      currency: invoice.currency,
  status: PaymentStatus.FAILED,
  paymentMethod: PaymentMethod.STRIPE,
      stripeInvoiceId: invoice.id,
      description: `Failed subscription payment - ${invoice.lines.data[0].description}`,
      userId: user.id,
    },
  });

  // Create notification for user
  await db.notification.create({
    data: {
  type: NotificationType.SYSTEM_ALERT,
      title: 'Payment Failed',
      message: 'Your subscription payment failed. Please update your payment method.',
      userId: user.id,
    },
  });
}