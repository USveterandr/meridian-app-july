# Meridian - Dominican Republic Real Estate Platform

**ALWAYS follow these instructions first and only fallback to additional search and context gathering if the information here is incomplete or found to be in error.**

Meridian is a Next.js 15.3.5 financial and real estate investment platform specifically designed for the Dominican Republic market. It features Dominican ID (cedula) validation, property management, user verification, payment processing with Stripe, and a sophisticated financial dashboard.

## Working Effectively

### Bootstrap and Setup
Run these commands in exact order to set up a working development environment:

1. **Install dependencies** (takes ~30 seconds):
   ```bash
   npm install
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env
   ```
   **CRITICAL**: Edit `.env` to set:
   - `DATABASE_URL="file:./dev.db"` (for SQLite development database)
   - `NEXTAUTH_URL="http://localhost:3000"`
   - `NEXTAUTH_SECRET="development-secret-key-for-testing-purposes-only"`

3. **Generate Prisma client** (takes ~2 seconds):
   ```bash
   npm run db:generate
   ```

4. **Set up database** (takes ~2 seconds):
   ```bash
   npm run db:push
   ```

### Development Server
- **Start development server** (takes ~1.5 seconds):
  ```bash
  npm run dev
  ```
  Application runs at http://localhost:3000
  **NEVER CANCEL** - Server starts quickly but let it fully initialize

### Build and Production Issues
**WARNING**: Production builds currently fail due to TypeScript and import errors.

- **Type checking** fails with 50+ TypeScript errors across 18 files
- **Production build** fails due to:
  - Missing exports (`EmailService`, `auth` function)
  - Rate limiter configuration issues  
  - Stripe API version mismatch
  - Import/export mismatches
- **Docker build** fails due to same build issues

**Workaround for testing builds**:
1. Temporarily modify `next.config.ts`:
   ```typescript
   typescript: { ignoreBuildErrors: true },
   eslint: { ignoreDuringBuilds: true },
   ```
2. Build still fails with runtime errors in API routes

### Available Commands and Timing
- `npm install` - **30 seconds** - Install all dependencies
- `npm run dev` - **1.5 seconds** - Start development server (WORKS PERFECTLY)
- `npm run build` - **21 seconds** - Production build (FAILS - see issues above)
- `npm run type-check` - **10 seconds** - TypeScript validation (FAILS - 50 errors)
- `npm run lint` - **5 seconds** - ESLint validation (FAILS - Function type error)
- `npm run db:generate` - **2 seconds** - Generate Prisma client
- `npm run db:push` - **2 seconds** - Apply schema to database
- `npm run db:migrate` - Prisma migrations for development
- `npm run db:migrate:prod` - Prisma migrations for production
- `npm run docker:build` - **2+ minutes** - Docker build (FAILS due to build issues)

**NEVER CANCEL any build or database operations** - Let them complete fully.

## Validation

### Manual Testing Requirements
**ALWAYS run through these scenarios after making changes:**

1. **Development Server Test**:
   - Start `npm run dev`
   - Navigate to http://localhost:3000
   - Verify the financial dashboard loads with wealth management interface
   - Test navigation through different sections

2. **API Endpoints Test**:
   - Health check: `curl http://localhost:3000/api/health` - Should return 200 with system status
   - DR validation: `curl "http://localhost:3000/api/validate/cedula?cedula=12345678901"` - Should return validation response

3. **Core Features Test**:
   - Financial dashboard displays properly
   - User interface is responsive
   - Power actions, budget categories, and investment tracking visible
   - Recent transactions and subscription management functional

4. **Database Test**:
   - Verify `prisma/dev.db` exists after setup
   - Check database connectivity via health endpoint

### Required Validation Steps
- **ALWAYS** run `npm run dev` and verify the application loads completely
- **ALWAYS** test the health endpoint responds correctly
- **ALWAYS** verify database is properly initialized
- **CRITICAL**: Do NOT attempt production builds unless specifically fixing build issues

## Common Tasks

### Development Workflow
1. Make code changes
2. Development server auto-reloads (usually within 1-2 seconds)
3. Test manually in browser
4. Verify API endpoints still respond
5. Check health endpoint for any errors

### Database Operations
- Reset database: `npm run db:reset` (recreates and seeds)
- Apply schema changes: `npm run db:push`
- Run seeds: `npm run db:seed`

### Linting and Code Quality
**WARNING**: Current linting fails - do NOT run `npm run lint` expecting success
- Fix specific errors when found rather than running full lint
- TypeScript errors are extensive and block production builds

## Known Issues and Limitations

### What WORKS:
- ✅ Development server (`npm run dev`)
- ✅ Database setup and connectivity
- ✅ API endpoints (health, cedula validation, etc.)
- ✅ Full application functionality in development
- ✅ Financial dashboard and user interface
- ✅ Dominican Republic features (cedula validation)

### What FAILS:
- ❌ Production builds (`npm run build`)
- ❌ TypeScript validation (`npm run type-check`)
- ❌ ESLint validation (`npm run lint`)  
- ❌ Docker builds (`npm run docker:build`)

### Critical Build Errors:
1. **EmailService import error** - `@/lib/email` exports `emailService` not `EmailService`
2. **Auth function missing** - `@/lib/auth` missing `auth` export
3. **Rate limiter issues** - Missing drizzle-orm dependency
4. **Stripe API version** - Using 2024 version instead of 2025
5. **TypeScript strict checking** - 50+ type errors across codebase

### Recommended Approach:
- **Development work**: Use `npm run dev` - works perfectly
- **Production deployment**: Fix build issues first or use workarounds
- **Code changes**: Focus on functionality that works in development
- **Testing**: Manual testing via browser and API calls

## Project Structure Deep Dive

### Key Directories:
- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - React components (uses shadcn/ui)
- `src/lib/` - Utility functions and configurations
- `prisma/` - Database schema and migrations
- `public/` - Static assets

### Important Files:
- `package.json` - All npm scripts and dependencies
- `next.config.ts` - Next.js configuration
- `prisma/schema.prisma` - Database schema (SQLite for dev, PostgreSQL for prod)
- `.env` - Environment variables (copy from .env.example)
- `tailwind.config.ts` - Tailwind CSS configuration
- `eslint.config.mjs` - ESLint configuration (currently very permissive)

### Technology Stack:
- **Framework**: Next.js 15.3.5 with React 19
- **Database**: Prisma ORM (SQLite dev, PostgreSQL prod)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: NextAuth.js
- **Payments**: Stripe integration
- **Validation**: Zod for schemas
- **Dominican Features**: Custom cedula validation service

## Performance Notes
- **Development server**: Very fast hot reload (~1-2 seconds)
- **Database operations**: Quick with SQLite (~2 seconds for setup)
- **Dependency installation**: Moderate (~30 seconds)
- **Build attempts**: Fast failure (~21 seconds) due to errors
- **Docker builds**: Slow failure (~2+ minutes) due to build issues

## Emergency Fallbacks
If development server fails to start:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Ensure `.env` file exists with correct values
4. Check if port 3000 is available
5. Verify database file permissions

**Remember**: This codebase works excellently in development mode but has production build issues that need resolution. Focus on development workflow and manual testing for reliable results.