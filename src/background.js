async function checkWeather() {
  let location;
  try {
    console.log("checking weather...");
    location = await CapacitorGeolocation.getCurrentPosition();
  } catch (err) {
    console.error(`Could not get current location: ${err}`);
  }

  try {
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&exclude=minutely,hourly,daily,alerts&appid={API_KEY}`;
    const response = await fetch(weatherAPI);

    if (!response.ok) {
      throw new Error("Fetch GET request failed");
    }

    const weather = await response.json();

    const conditions = {
      location: weather.name,
      temp: Math.round(weather.main.temp),
      condition: weather.weather[0].main ?? "",
      conditionIcon: weather.weather[0].icon ?? "",
    };

    CapacitorKV.set(
      "CapacitorStorage.cached_weather",
      JSON.stringify(conditions)
    );
  } catch (err) {
    console.error(`Could not check weather: ${err}`);
  }
}

async function checkNews() {
  console.log("checking news...");
}

addEventListener("updateData", async (resolve, reject, args) => {
  try {
    await Promise.all([checkWeather(), checkNews()]);
    const currentTimestamp = Math.floor(Date.now() / 1000);

    CapacitorKV.set(
      "CapacitorStorage.last_updated",
      currentTimestamp.toString()
    );
    resolve();
  } catch (err) {
    console.error(`Could not update data: ${err}`);
    reject(err);
  }
});
