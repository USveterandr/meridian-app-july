import Stripe from 'stripe';

// Only initialize Stripe if the secret key is available
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-07-30.basil',
      typescript: true,
    })
  : null;

export default stripe;

export const createStripeCustomer = async (email: string, name?: string) => {
  if (!stripe) throw new Error('Stripe not initialized');
  
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
  if (!stripe) throw new Error('Stripe not initialized');
  
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
  if (!stripe) throw new Error('Stripe not initialized');
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
    metadata: metadata || {},
  });
  return paymentIntent;
};

export const handleWebhook = async (payload: string, signature: string) => {
  if (!stripe) throw new Error('Stripe not initialized');
  
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
  if (!stripe) throw new Error('Stripe not initialized');
  
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
  if (!stripe) throw new Error('Stripe not initialized');
  
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

  await stripe.invoices.finalizeInvoice(invoice.id);
  return invoice;
};