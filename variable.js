import Constants from "expo-constants";

export const prodUrl = "https://tamboola.ml";

const ENV = {
  dev: {
    apiUrl: "http://192.168.0.102:3000",
    //apiUrl: "https://tamboola.ml",
  },
  staging: {
    apiUrl: prodUrl,
  },
  prod: {
    apiUrl: prodUrl,
  },
};

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("staging") !== -1) return ENV.staging;
  if (env.indexOf("prod") !== -1) return ENV.prod;
}

export default getEnvVars(Constants.manifest.releaseChannel);
