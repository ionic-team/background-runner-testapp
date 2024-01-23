import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.capacitorjs.background.testapp",
  appName: "background-runner-testapp",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
