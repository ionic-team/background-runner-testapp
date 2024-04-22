# Background Runner Test App

This is a sample Capacitor app designed to demonstrate the background task capabilities of the [Capacitor Background Runner](https://github.com/ionic-team/capacitor-background-runner) plugin.

The app will fetch the following data every 15 minutes (or when available depending on OS):

- Weather from the device's current location (using the OpenWeather API)
- The latest news from Apple/Google developer news feeds

To demonstrate the use of background updates, these updates are performed entirely in the background.

## Setup

1. Fork and clone this repo.
2. Install the dependencies.
   ```bash
   npm install
   ```
3. In order to get weather data updates, you'll need a free API key for the [OpenWeatherMap Weather API](https://openweathermap.org/api).  
   Copy the example `.env.example` file to a new file called `.env` and set `OPENWEATHERMAP_API_KEY` equal to the value of your key.
4. Build the app
   ```bash
   npm run build
   npx cap sync
   ```

#### iOS

Keep in mind that iOS will ultamately decide when and how often your background task will run. Read [here](https://capacitorjs.com/docs/apis/background-runner#ios-1) for more information.

#### Android

Unfortunately, various Android device manufacturers have employed various aggressive battery optimization software that may interfere with or outright break the functionality of background tasks on Android. This app has been tested thoroughly with these optimizations turned **OFF** on the following devices:

- Samsung (A41, S9, S21) - [More info & How to disable](https://dontkillmyapp.com/samsung)
- Xiaomi (Mi A2 Lite) - [More info & How to disable](https://dontkillmyapp.com/xiaomi)
- Huawei (P20 Lite) - [More info & How to disable](https://dontkillmyapp.com/huawei)
