# Environment Configuration Guide

## Environment Variables for Production Deployment

### Required Environment Variables

```bash
# Application Settings
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://meridian-rd.com
NEXT_PUBLIC_API_URL=https://api.meridian-rd.com

# AWS SES Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
EMAIL_REGION=us-east-1
EMAIL_FROM=noreply@meridian-rd.com

# Google AI Configuration
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Security Settings
SECRET_KEY=your_super_secret_key_here
API_SECRET=your_api_secret_here
JWT_SECRET=your_jwt_secret_here

# Database Configuration (if applicable)
DATABASE_URL=your_database_url
REDIS_URL=your_redis_url

# Third-party Services
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Analytics & Monitoring
GOOGLE_ANALYTICS_ID=your_ga_id
SENTRY_DSN=your_sentry_dsn

# CDN & Storage
CLOUDFLARE_ZONE_ID=your_cloudflare_zone_id
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
```

### Cloudflare Workers Environment Variables

```bash
# Set using wrangler secret put command
wrangler secret put AWS_ACCESS_KEY_ID
wrangler secret put AWS_SECRET_ACCESS_KEY
wrangler secret put GOOGLE_AI_API_KEY
wrangler secret put SECRET_KEY
wrangler secret put JWT_SECRET
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put DATABASE_URL
wrangler secret put SENTRY_DSN
```

### Environment-Specific Configurations

#### Development (.env.local)
```bash
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
EMAIL_REGION=us-east-1
EMAIL_FROM=test@localhost
# Add your development keys here
```

#### Staging (.env.staging)
```bash
NODE_ENV=staging
NEXT_PUBLIC_APP_URL=https://staging.meridian-rd.com
NEXT_PUBLIC_API_URL=https://staging.meridian-rd.com/api
EMAIL_REGION=us-east-1
EMAIL_FROM=staging@meridian-rd.com
# Add your staging keys here
```

#### Production (.env.production)
```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://meridian-rd.com
NEXT_PUBLIC_API_URL=https://meridian-rd.com/api
EMAIL_REGION=us-east-1
EMAIL_FROM=noreply@meridian-rd.com
# Add your production keys here
```

## Security Best Practices

### 1. Secret Management
- Never commit secrets to version control
- Use environment variables for all sensitive data
- Rotate secrets regularly
- Use different secrets for each environment

### 2. API Keys
- Restrict API keys to specific domains/IPs
- Monitor API key usage
- Implement rate limiting
- Use different keys for different services

### 3. Database Security
- Use connection pooling
- Enable SSL/TLS connections
- Implement proper access controls
- Regular security updates

### 4. Application Security
- Enable HTTPS everywhere
- Implement proper CORS policies
- Use security headers
- Regular dependency updates
- Input validation and sanitization

## Mobile App Environment

### iOS Configuration
```xml
<!-- ios/App/App/Info.plist -->
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <false/>
    <key>NSExceptionDomains</key>
    <dict>
        <key>meridian-rd.com</key>
        <dict>
            <key>NSExceptionAllowsInsecureHTTPLoads</key>
            <false/>
            <key>NSExceptionMinimumTLSVersion</key>
            <string>TLSv1.2</string>
        </dict>
    </dict>
</dict>
```

### Android Configuration
```xml
<!-- android/app/src/main/res/xml/network_security_config.xml -->
<?xml version=\"1.0\" encoding=\"utf-8\"?>
<network-security-config>
    <domain-config>
        <domain includeSubdomains=\"true\">meridian-rd.com</domain>
        <trust-anchors>
            <certificates src=\"system\"/>
        </trust-anchors>
    </domain-config>
</network-security-config>
```

## Deployment Checklist

### Before Deployment
- [ ] All environment variables set
- [ ] Security headers configured
- [ ] SSL certificates installed
- [ ] Database migrations completed
- [ ] API endpoints tested
- [ ] Error monitoring configured
- [ ] Analytics tracking setup
- [ ] CDN configured
- [ ] Performance optimizations applied
- [ ] Security audit completed

### After Deployment
- [ ] Health checks passing
- [ ] Monitoring alerts configured
- [ ] Backup systems verified
- [ ] Performance metrics baseline
- [ ] User acceptance testing
- [ ] Security scan completed
- [ ] Load testing completed
- [ ] Documentation updated

## Monitoring & Alerting

### Key Metrics to Monitor
- Application response time
- Error rates
- Database performance
- API rate limits
- Security events
- User engagement
- Mobile app crashes
- PWA installation rates

### Alert Thresholds
- Response time > 3 seconds
- Error rate > 1%
- Database connections > 80%
- API rate limit > 90%
- Security events (any)
- Mobile app crash rate > 0.1%

## Backup & Recovery

### Data Backup
- Database: Daily automated backups
- User uploads: Real-time replication
- Configuration: Version controlled
- Secrets: Secure backup storage

### Recovery Procedures
- RTO (Recovery Time Objective): 4 hours
- RPO (Recovery Point Objective): 1 hour
- Disaster recovery plan documented
- Regular recovery testing scheduled