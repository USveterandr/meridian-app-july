import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.meridian.rd',
  appName: 'Meridian Real Estate',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    iosScheme: 'https'
  },
  ios: {
    scheme: 'Meridian Real Estate',
    contentInset: 'automatic',
    scrollEnabled: true,
    backgroundColor: '#0f172a',
    allowsLinkPreview: false
  },
  android: {
    backgroundColor: '#0f172a',
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#0f172a',
      androidSplashResourceName: 'splash',
      iosSpinnerStyle: 'small',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#0f172a'
    },
    App: {
      statusBarStyle: 'dark'
    }
  }
};

export default config;
