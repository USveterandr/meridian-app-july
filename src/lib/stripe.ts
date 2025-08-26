import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export default stripe;

export const stripePlans = {
  free: {
    priceId: null, // Free plan doesn't have a Stripe price
    productId: null,
  },
  basic: {
    priceId: process.env.STRIPE_BASIC_PRICE_ID,
    productId: process.env.STRIPE_BASIC_PRODUCT_ID,
  },
  professional: {
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
    productId: process.env.STRIPE_PROFESSIONAL_PRODUCT_ID,
  },
  enterprise: {
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    productId: process.env.STRIPE_ENTERPRISE_PRODUCT_ID,
  },
};

export const getStripePlanByPriceId = (priceId: string) => {
  for (const [planKey, plan] of Object.entries(stripePlans)) {
    if (plan.priceId === priceId) {
      return planKey as keyof typeof stripePlans;
    }
  }
  return null;
};

export const createStripeCustomer = async (email: string, name?: string) => {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      source: 'meridian_platform',
    },
  });
  return customer;
};

export const createCheckoutSession = async (
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string,
  metadata?: Record<string, string>
) => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: metadata || {},
  });
  return session;
};

export const createPaymentIntent = async (
  amount: number,
  currency: string = 'usd',
  metadata?: Record<string, string>
) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
    metadata: metadata || {},
  });
  return paymentIntent;
};

export const handleWebhook = async (payload: string, signature: string) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  
  try {
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    return event;
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    throw new Error('Webhook signature verification failed');
  }
};

export const cancelSubscription = async (subscriptionId: string) => {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
  return subscription;
};

export const createInvoice = async (
  customerId: string,
  amount: number,
  description: string,
  metadata?: Record<string, string>
) => {
  const invoice = await stripe.invoices.create({
    customer: customerId,
    description,
    metadata: metadata || {},
  });

  const invoiceItem = await stripe.invoiceItems.create({
    customer: customerId,
    amount: Math.round(amount * 100), // Convert to cents
    currency: 'usd',
    description,
  });

  await stripe.invoices.finalizeInvoice(invoice.id as string);
  return invoice;
};