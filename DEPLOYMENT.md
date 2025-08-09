# 🚀 Production Deployment Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Redis (optional, for caching)
- Docker & Docker Compose
- SSL certificates

## Environment Setup

1. Copy environment template:
```bash
cp .env.example .env
```

2. Configure production variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Strong random secret (32+ characters)
- `NEXTAUTH_URL`: Your production domain
- `STRIPE_*`: Stripe API keys for payments
- Other service credentials as needed

## Database Setup

1. Run migrations:
```bash
npm run db:migrate:prod
```

2. Seed initial data:
```bash
npm run db:seed
```

## Docker Deployment

### Option 1: Docker Compose (Recommended)

1. Start production stack:
```bash
npm run prod:up
```

2. View logs:
```bash
npm run prod:logs
```

3. Stop services:
```bash
npm run prod:down
```

### Option 2: Manual Docker Build

1. Build image:
```bash
npm run docker:build
```

2. Run container:
```bash
npm run docker:run
```

## Manual Deployment

1. Install dependencies:
```bash
npm ci --only=production
```

2. Build application:
```bash
npm run build
```

3. Start production server:
```bash
npm start
```

## Health Monitoring

- Health check endpoint: `/api/health`
- Returns service status, database connectivity, and memory usage
- Use for load balancer health checks

## Security Checklist

✅ Environment variables secured
✅ HTTPS enabled with valid certificates
✅ Security headers configured
✅ Rate limiting implemented
✅ Database credentials rotated
✅ CORS properly configured
✅ Input validation with Zod
✅ SQL injection protection via Prisma
✅ Authentication with NextAuth.js

## Performance Optimizations

✅ Image optimization with Sharp
✅ Static asset caching
✅ Gzip compression
✅ Database connection pooling
✅ React strict mode enabled
✅ Bundle optimization
✅ CDN-ready static files

## Monitoring & Logging

- Structured JSON logging in production
- Error tracking and reporting
- Performance metrics collection
- Database query monitoring
- Memory usage tracking

## Backup Strategy

1. Database backups:
```bash
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql
```

2. File uploads backup (if using local storage)
3. Environment variables backup (securely)

## Scaling Considerations

- Use load balancer (Nginx configuration included)
- Database read replicas for high traffic
- Redis for session storage and caching
- CDN for static assets
- Container orchestration (Kubernetes/Docker Swarm)

## Troubleshooting

### Common Issues

1. **Database connection fails**
   - Check DATABASE_URL format
   - Verify network connectivity
   - Ensure database is running

2. **Build fails**
   - Clear node_modules and reinstall
   - Check TypeScript errors
   - Verify environment variables

3. **Authentication issues**
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches domain
   - Ensure database schema is up to date

### Logs Location

- Application logs: stdout/stderr (captured by Docker)
- Nginx logs: `/var/log/nginx/`
- Database logs: PostgreSQL data directory

## Support

For production issues:
1. Check health endpoint: `/api/health`
2. Review application logs
3. Monitor database performance
4. Check external service status (Stripe, etc.)