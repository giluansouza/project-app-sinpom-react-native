import * as dotenv from 'dotenv';

dotenv.config();

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.giluansouza.sinpom.dev';
  }

  if (IS_PREVIEW) {
    return 'com.giluansouza.sinpom.preview';
  }

  return 'com.giluansouza.sinpom';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'SINPOM (Dev)';
  }

  if (IS_PREVIEW) {
    return 'SINPOM (Preview)';
  }

  return 'SINPOM';
};

export default {
  expo: {
    name: getAppName(),
    slug: "sinpom",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    scheme: "sinpom",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./src/assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      bundleIdentifier: getUniqueIdentifier(),
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: getUniqueIdentifier(),
      permissions: [
        "android.permission.INTERNET"
      ],
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
        }
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./src/assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-secure-store"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      eas: {
        projectId: "efc8f778-0b9e-405b-a657-ac83ee4ddf19"
      }
    },
    owner: "giluan"
  }
}
