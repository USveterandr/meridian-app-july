'use client'

import { useEffect } from 'react'

// Dynamically import Capacitor plugins only when needed
const loadCapacitorPlugins = async () => {
  if (typeof window === 'undefined') return null
  
  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar')
    const { SplashScreen } = await import('@capacitor/splash-screen')
    const { Keyboard } = await import('@capacitor/keyboard')
    const { App } = await import('@capacitor/app')
    const { Device } = await import('@capacitor/device')
    
    return { StatusBar, Style, SplashScreen, Keyboard, App, Device }
  } catch (error) {
    console.log('Capacitor plugins not available in web environment')
    return null
  }
}

export function MobileOptimizations() {
  useEffect(() => {
    const initializeMobile = async () => {
      try {
        const plugins = await loadCapacitorPlugins()
        if (!plugins) return
        
        const { StatusBar, Style, SplashScreen, Keyboard, App, Device } = plugins
        
        // Check if running in mobile app
        const info = await Device.getInfo()
        
        if (info.platform !== 'web') {
          // Hide splash screen after app loads
          await SplashScreen.hide()
          
          // Configure status bar
          await StatusBar.setStyle({ style: Style.Dark })
          await StatusBar.setBackgroundColor({ color: '#0f172a' })
          
          // Configure keyboard behavior
          Keyboard.addListener('keyboardDidShow', () => {
            document.body.classList.add('keyboard-open')
          })
          
          Keyboard.addListener('keyboardDidHide', () => {
            document.body.classList.remove('keyboard-open')
          })
          
          // Handle app state changes
          App.addListener('appStateChange', ({ isActive }) => {
            if (isActive) {
              // App became active
              console.log('App is now active')
            } else {
              // App went to background
              console.log('App went to background')
            }
          })
          
          // Handle back button for Android
          App.addListener('backButton', ({ canGoBack }) => {
            if (!canGoBack) {
              App.exitApp()
            } else {
              window.history.back()
            }
          })
        }
      } catch (error) {
        console.log('Not running in mobile app environment')
      }
    }
    
    initializeMobile()
  }, [])
  
  return null
}

// Add CSS for keyboard optimization
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    .keyboard-open {
      height: calc(100vh - var(--keyboard-height, 0px));
    }
    
    /* iOS safe area support */
    @supports (padding: max(0px)) {
      .safe-area-top {
        padding-top: max(1rem, env(safe-area-inset-top));
      }
      
      .safe-area-bottom {
        padding-bottom: max(1rem, env(safe-area-inset-bottom));
      }
      
      .safe-area-left {
        padding-left: max(1rem, env(safe-area-inset-left));
      }
      
      .safe-area-right {
        padding-right: max(1rem, env(safe-area-inset-right));
      }
    }
    
    /* Touch optimizations */
    .touch-target {
      min-height: 44px;
      min-width: 44px;
      cursor: pointer;
    }
    
    /* Prevent zoom on input focus (iOS) */
    input[type=\"text\"],
    input[type=\"email\"],
    input[type=\"tel\"],
    input[type=\"number\"],
    textarea,
    select {
      font-size: 16px !important;
    }
    
    /* Smooth scrolling for mobile */
    html {
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }
    
    /* Hide scrollbars on mobile */
    @media (max-width: 768px) {
      ::-webkit-scrollbar {
        display: none;
      }
      
      * {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    }
  `
  document.head.appendChild(style)
}