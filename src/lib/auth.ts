import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { UserRole, SubscriptionTier } from '@prisma/client';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          subscriptionTier: user.subscriptionTier,
          isVerified: user.isVerified,
          verificationLevel: user.verificationLevel,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.subscriptionTier = user.subscriptionTier;
        token.isVerified = user.isVerified;
        token.verificationLevel = user.verificationLevel;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as UserRole;
        session.user.subscriptionTier = token.subscriptionTier as SubscriptionTier;
        session.user.isVerified = token.isVerified as boolean;
        session.user.verificationLevel = token.verificationLevel as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createUser(data: {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
  cedula?: string;
  phone?: string;
}) {
  const hashedPassword = await hashPassword(data.password);
  
  return await db.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: data.role || UserRole.INVESTOR,
      subscriptionTier: SubscriptionTier.INITIAL,
      cedula: data.cedula,
      phone: data.phone,
    },
  });
}

export async function updateUser(userId: string, data: {
  name?: string;
  phone?: string;
  cedula?: string;
  avatar?: string;
  bio?: string;
  language?: string;
}) {
  return await db.user.update({
    where: { id: userId },
    data,
  });
}

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: { email },
  });
}

export async function getUserById(id: string) {
  return await db.user.findUnique({
    where: { id },
  });
}