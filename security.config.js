/**
 * Production Security Configuration
 * This file contains security headers and policies for production deployment
 */

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
  },
  {
    key: 'Content-Security-Policy',
    value: [
      \"default-src 'self'\",
      \"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com\",
      \"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com\",
      \"img-src 'self' data: https: blob:\",
      \"font-src 'self' data: https://fonts.gstatic.com\",
      \"connect-src 'self' https: wss:\",
      \"media-src 'self' data: blob:\",
      \"object-src 'none'\",
      \"base-uri 'self'\",
      \"form-action 'self'\",
      \"frame-ancestors 'none'\",
      \"upgrade-insecure-requests\"
    ].join('; ')
  }
];

const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
};

const corsConfig = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://meridian-rd.com', 'https://www.meridian-rd.com']
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

const securityMiddleware = {
  // Input validation
  validateInput: (req, res, next) => {
    // Sanitize input to prevent XSS
    const sanitize = (str) => {
      if (typeof str !== 'string') return str;
      return str
        .replace(/[<>\"']/g, '')
        .trim()
        .substring(0, 1000); // Limit input length
    };

    if (req.body) {
      Object.keys(req.body).forEach(key => {
        if (typeof req.body[key] === 'string') {
          req.body[key] = sanitize(req.body[key]);
        }
      });
    }

    if (req.query) {
      Object.keys(req.query).forEach(key => {
        if (typeof req.query[key] === 'string') {
          req.query[key] = sanitize(req.query[key]);
        }
      });
    }

    next();
  },

  // API key validation
  validateApiKey: (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const validApiKeys = process.env.VALID_API_KEYS?.split(',') || [];
    
    if (!apiKey || !validApiKeys.includes(apiKey)) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    
    next();
  },

  // Request size limit
  limitRequestSize: (req, res, next) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (req.headers['content-length'] && parseInt(req.headers['content-length']) > maxSize) {
      return res.status(413).json({ error: 'Request too large' });
    }
    
    next();
  }
};

// Environment-specific configurations
const environments = {
  development: {
    ...corsConfig,
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    ssl: false,
    https: false
  },
  production: {
    ...corsConfig,
    origin: ['https://meridian-rd.com', 'https://www.meridian-rd.com'],
    ssl: true,
    https: true,
    forceHttps: true
  },
  staging: {
    ...corsConfig,
    origin: ['https://staging.meridian-rd.com'],
    ssl: true,
    https: true
  }
};

module.exports = {
  securityHeaders,
  rateLimit,
  corsConfig,
  securityMiddleware,
  environments
};"