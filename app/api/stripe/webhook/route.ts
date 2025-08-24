import { NextRequest, NextResponse } from 'next/server';
import stripe, { handleWebhook } from '@/lib/stripe';
// Commented out since db is not yet set up
// import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const payload = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 });
  }

  try {
    const event = await handleWebhook(payload, signature);

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
    console.error('Stripe webhook error:', error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }
}

async function handleCheckoutSessionCompleted(session: any) {
  const { userId, planId, billingCycle } = session.metadata;

  if (!userId || !planId) {
    console.error('Missing metadata in checkout session');
    return;
  }

  // TODO: Update user subscription when database is connected
  console.log('Checkout session completed for user:', userId, 'plan:', planId);
  
  // Example implementation when db is available:
  /*
  await db.user.update({
    where: { id: userId },
    data: {
      subscriptionTier: planId.toUpperCase(),
      stripeCustomerId: session.customer,
      stripePriceId: session.subscription ? 
        (await stripe.subscriptions.retrieve(session.subscription)).items.data[0].price.id : 
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
  */
}

async function handleSubscriptionCreated(subscription: any) {
  console.log('Subscription created:', subscription.id);
  // TODO: Handle subscription creation
}

async function handleSubscriptionUpdated(subscription: any) {
  const customerId = subscription.customer;
  
  console.log('Subscription updated for customer:', customerId);
  
  // TODO: Find user by Stripe customer ID and update subscription
  /*
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
  */
}

async function handleSubscriptionDeleted(subscription: any) {
  console.log('Subscription deleted:', subscription.id);
  // TODO: Handle subscription deletion
}

async function handleInvoicePaymentSucceeded(invoice: any) {
  const customerId = invoice.customer;
  
  console.log('Invoice payment succeeded for customer:', customerId);
  
  // TODO: Find user by Stripe customer ID and create payment record
  /*
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
  */
}

async function handleInvoicePaymentFailed(invoice: any) {
  console.log('Invoice payment failed:', invoice.id);
  // TODO: Handle payment failure
}