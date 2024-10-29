/* eslint-env node */
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Adiciona resolução de alias para a pasta src
config.resolver.extraNodeModules = {
  "@": path.resolve(__dirname, "src"),
};

module.exports = withNativeWind(config, { input: "./src/styles/global.css" });
