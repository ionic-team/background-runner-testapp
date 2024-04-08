import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "com.capacitorjs.background.testapp",
    appName: "background-runner-testapp",
    webDir: "dist",
    server: {
        androidScheme: "https",
    },
    plugins: {
        BackgroundRunner: {
            label: "com.capacitorjs.background.testapp.task",
            src: "assets/background.js",
            event: "updateData",
            repeat: true,
            interval: 15,
            autoStart: true,
        },
    },
};

export default config;
