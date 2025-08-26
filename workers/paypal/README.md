# PayPal Worker

Cloudflare Worker that handles PayPal REST v2 operations for create/capture order and webhook verification. Uses R2 (`PAYPAL_LOGS`) for storing webhook/event logs.

## Endpoints

- POST /paypal/create-order
- POST /paypal/capture-order
- POST /paypal/webhook

## Env and Bindings

- PAYPAL_ENV: `sandbox` or `live`
- PAYPAL_CLIENT_ID: secret
- PAYPAL_CLIENT_SECRET: secret
- PAYPAL_WEBHOOK_ID: secret (for webhook verification)
- PAYPAL_LOGS: R2 bucket binding

## Dev

Use `wrangler dev --local` from the repo root or this folder. Ensure secrets are set.
