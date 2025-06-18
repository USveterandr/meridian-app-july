"use client"

import type React from "react"

import { Crown, Star, Gem } from "lucide-react"

export function LuxuryBadge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-sm font-semibold shadow-lg ${className}`}
    >
      <Crown className="h-4 w-4 mr-2" />
      {children}
    </div>
  )
}

export function GoldDivider() {
  return (
    <div className="flex items-center justify-center my-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
      <div className="px-4">
        <Gem className="h-6 w-6 text-amber-500" />
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
    </div>
  )
}

export function PremiumCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-white rounded-2xl shadow-xl border border-amber-200 ${className}`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>
      <div className="absolute top-4 right-4">
        <Star className="h-5 w-5 text-amber-500" />
      </div>
      {children}
    </div>
  )
}

export function GoldButton({ children, className = "", ...props }: any) {
  return (
    <button
      className={`relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gold-shimmer animate-shimmer"></div>
      <span className="relative z-10">{children}</span>
    </button>
  )
}
