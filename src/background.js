async function checkWeather() {
  console.log("checking weather...");

  let location;

  try {
    location = await CapacitorGeolocation.getCurrentPosition();
  } catch (err) {
    console.error(`Could not get current location: ${err}`);
    throw err;
  }

  try {
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&exclude=minutely,hourly,daily,alerts&appid={OPENWEATHERMAP_API_KEY}`;
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

    CapacitorKV.set("cached_weather", JSON.stringify(conditions));
  } catch (err) {
    console.error(`Could not check weather: ${err}`);
    throw err;
  }
}

async function checkNews() {
  console.log("checking news...");

  try {
    const appleDeveloperNewsFeed =
      "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fdeveloper.apple.com%2Fnews%2Frss%2Fnews.rss";
    const response = await fetch(appleDeveloperNewsFeed);

    if (!response.ok) {
      throw new Error("Fetch GET request failed");
    }

    const feed = await response.json();

    let stories = {};

    if (feed.status != "ok") {
      throw new Error("could not download rss to json feed");
    }

    feed.items.map((item) => {
      const textDescription = item.description.replace(/<[^>]*>?/gm, "");
      let teaser = textDescription.substring(0, 25) + "...";
      stories[item.guid] = {
        title: item.title,
        teaser,
        link: item.link,
        publishDate: undefined,
      };
    });

    let newStories = [];
    let existingStories = {};

    const result = CapacitorKV.get("cached_stories");

    if (result && result.value) {
      existingStories = JSON.parse(result.value);
    }

    Object.keys(stories).forEach((key) => {
      if (!existingStories[key]) {
        newStories.push(stories[key]);
        existingStories[key] = stories[key];
      }
    });

    CapacitorKV.set("cached_stories", JSON.stringify(existingStories));

    console.log(`${newStories.length} new stories`);

    if (newStories.length > 0) {
      const latestStory = newStories[0];

      let scheduleDate = new Date();
      scheduleDate.setSeconds(scheduleDate.getSeconds() + 20);

      try {
        CapacitorNotifications.schedule([
          {
            id: 100,
            title: latestStory.title,
            body: latestStory.teaser,
            scheduleAt: scheduleDate,
          },
        ]);

        console.log("news story notification scheduled");
      } catch (err) {
        console.error(`Could not schedule news story notification: ${err}`);
      }
    }
  } catch (err) {
    console.error(`Could not get news stories: ${err}`);
    throw err;
  }
}

addEventListener("testThrowingError", async (resolve, reject, args) => {
  try {
    throw new Error("some simulated error");
  } catch (err) {
    reject(err);
  }
});

addEventListener("updateData", async (resolve, reject, args) => {
  try {
    const results = await Promise.allSettled([checkWeather(), checkNews()]);

    const currentTimestamp = Math.floor(Date.now() / 1000);

    let updateLog;

    let updateLogJSON = CapacitorKV.get("update_log");

    if (!updateLogJSON) {
      updateLog = {
        news: [],
        weather: [],
      };
    } else {
      updateLog = JSON.parse(updateLogJSON.value);
    }

    if (results[0].status == "fulfilled") {
      updateLog.weather.push({
        timestamp: currentTimestamp,
        status: "ok",
      });
    } else {
      updateLog.weather.push({
        timestamp: currentTimestamp,
        status: `failed: ${results[0].reason}`,
      });
    }

    if (results[1].status == "fulfilled") {
      updateLog.news.push({
        timestamp: currentTimestamp,
        status: "ok",
      });
    } else {
      updateLog.news.push({
        timestamp: currentTimestamp,
        status: `failed: ${results[1].reason}`,
      });
    }

    CapacitorKV.set("last_updated", currentTimestamp.toString());
    CapacitorKV.set("update_log", JSON.stringify(updateLog));
    resolve();
  } catch (err) {
    console.error(`Could not update data: ${err}`);
    reject(err);
  }
});

addEventListener("getUpdateLog", (resolve, reject, args) => {
  try {
    const result = CapacitorKV.get("update_log");
    resolve(result);
  } catch (err) {
    console.error(`Could not get update log: ${err}`);
    reject(err);
  }
});

addEventListener("getStories", (resolve, reject, args) => {
  try {
    const result = CapacitorKV.get("cached_stories");
    resolve(result);
  } catch (err) {
    console.error(`Could not get cached news stories: ${err}`);
    reject(err);
  }
});

addEventListener("getCurrentConditions", (resolve, reject, args) => {
  try {
    const result = CapacitorKV.get("cached_weather");
    resolve(result);
  } catch (err) {
    console.error(`Could not get current weather conditions: ${err}`);
    reject(err);
  }
});

addEventListener("getLastUpdated", (resolve, reject, args) => {
  try {
    const result = CapacitorKV.get("last_updated");
    resolve(result);
  } catch (err) {
    console.error(`Could not get last updated timestamp: ${err}`);
    reject(err);
  }
});
