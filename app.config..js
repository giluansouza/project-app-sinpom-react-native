import * as dotenv from 'dotenv';

dotenv.config();

export default {
  expo: {
    name: "Sinpom",
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
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.giluansouza.sinpom",
      permissions: [
        "android.permission.INTERNET"
      ],
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY
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
