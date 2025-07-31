# Meridian Real Estate Platform

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/usveterandrs-projects/v0-next-js-community-starter)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/yZe4T0rlyCZ)

## Overview
Meridian is a Next.js-based real estate platform template designed for property listings, investment opportunities, and property selling solutions. Built with modern web technologies and optimized for performance, this application provides a comprehensive foundation for real estate businesses.

## Key Features
- **Property Listings**: Showcase available properties with detailed information and high-quality images
- **Investment Opportunities**: Highlight investment potential and financial benefits
- **Sell Your Property**: Guided process for property owners to list their properties
- **Responsive Design**: Mobile-first approach with Tailwind CSS for optimal viewing across devices
- **Form Interactions**: Contact forms, property search, and filtering capabilities
- **AWS SES Integration**: Production-ready email service for user notifications and communications

## Technology Stack
- **Framework**: Next.js 14 with React 18+
- **Styling**: Tailwind CSS 3.4.17 with Radix UI components
- **Type System**: TypeScript 5+
- **State Management**: React Hook Form for form handling
- **Validation**: Zod schema validation
- **Deployment**: AWS Amplify integration with Docker support
- **API**: AWS SDK for SES integration

## Development Environment
- Node.js v18+
- npm for package management
- Docker for containerized deployment
- Multi-stage build optimization for minimal image size

## Deployment
The application is configured for deployment on AWS Amplify with environment variables for:
- AWS SES email configuration
- Region settings
- Secure credential management

## Installation
To run the application locally:
1. Clone the repository
2. Install dependencies with `npm install`
3. Start development server with `npm run dev`

For production deployment, follow the Docker build instructions or deploy directly to AWS Amplify.

## Project Structure
The application follows a modular structure with:
- `app/` directory for page routes
- `components/` for reusable UI components
- `lib/` for utility functions and environment configuration
- `styles/` for global styling

This template is designed to be easily extended and customized to meet specific real estate business requirements.

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