# Next.js Community Starter

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/usveterandrs-projects/v0-next-js-community-starter)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/yZe4T0rlyCZ)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Production Deployment Guide

### AWS Amplify Configuration

1. In the AWS Amplify Console, configure these environment variables:
   - `EMAIL_REGION`: Your AWS region (e.g., 'us-east-1')
   - `EMAIL_FROM`: The email address to send from (e.g., 'meridiandr1@gmail.com')
   - `AWS_ACCESS_KEY_ID`: Your AWS access key ID
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key

2. Set the build settings to use the following commands:
   ```yaml
   version: 1
   applications:
     - frontend:
         phases:
           preBuild:
             commands:
               - nvm install 18
               - nvm use 18
               - npm ci
           build:
             commands:
               - npm run build
   ```

### Security Best Practices

- Never store AWS credentials in version control
- Use AWS IAM roles and policies to limit permissions
- Rotate credentials regularly
- Enable AWS CloudTrail logging for audit purposes

### Production Troubleshooting

- Check AWS CloudWatch logs for SES errors
- Monitor email sending limits in AWS SES console
- Verify email templates are properly verified in AWS SES

## Deployment

Your project is live at:

**[https://vercel.com/usveterandrs-projects/v0-next-js-community-starter](https://vercel.com/usveterandrs-projects/v0-next-js-community-starter)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/yZe4T0rlyCZ](https://v0.dev/chat/projects/yZe4T0rlyCZ)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository