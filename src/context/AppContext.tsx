import { createContext, useContext, useEffect, useState } from "react";
import { App } from "@capacitor/app";
import { BackgroundRunner } from "@capacitor/background-runner";

export interface UpdateLogEntry {
  timestamp: number;
  status: string;
}

export interface UpdateLog {
  news: UpdateLogEntry[];
  weather: UpdateLogEntry[];
}
export interface WeatherCondition {
  location: string;
  temp: number;
  condition: string;
  conditionIcon: string;
}

export interface NewsStory {
  title: string;
  teaser: string;
  link: string;
  publishDate?: Date;
}

interface NewsStories {
  [key: string]: NewsStory;
}

interface AppContextProps {
  conditions: WeatherCondition;
  stories: NewsStories;
  log: UpdateLog;
  lastUpdated?: Date;

  update: () => Promise<any>;
  getLog: () => Promise<void>;
}

interface AppProviderProps {
  children?: React.ReactNode;
}

const emptyUpdateLog: UpdateLog = {
  news: [],
  weather: [],
};

const defaultCondition: WeatherCondition = {
  location: "---",
  temp: 0,
  condition: "---",
  conditionIcon: "",
};

export const AppContext = createContext<AppContextProps>({
  conditions: defaultCondition,
  stories: {},
  log: emptyUpdateLog,
  lastUpdated: undefined,
  update: () => Promise.reject(),
  getLog: () => Promise.reject(),
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [conditions, setConditions] =
    useState<WeatherCondition>(defaultCondition);
  const [stories, setStories] = useState<NewsStories>({});
  const [log, setLog] = useState<UpdateLog>(emptyUpdateLog);
  const [lastUpdated, setLastUpdated] = useState<Date | undefined>(undefined);

  const updateStories = async (): Promise<void> => {
    try {
      const result = await BackgroundRunner.dispatchEvent<{ value: string }>({
        event: "getStories",
        label: "com.capacitorjs.background.testapp.task",
        details: {},
      });

      if (result && result.value) {
        const cachedStories = JSON.parse(result.value) as NewsStories;
        setStories(cachedStories);
      } else {
        console.warn("No value for key 'cached_stories'");
      }
    } catch (err) {
      console.error(`Could not update stories: ${err}`);
    }
  };

  const updateWeatherConditions = async (): Promise<void> => {
    try {
      const result = await BackgroundRunner.dispatchEvent<{ value: string }>({
        event: "getCurrentConditions",
        label: "com.capacitorjs.background.testapp.task",
        details: {},
      });

      console.log(JSON.stringify(result));

      if (result && result.value) {
        const cachedWeather = JSON.parse(result.value) as WeatherCondition;
        setConditions(cachedWeather);
      } else {
        console.warn("No value for key 'cached_weather'");
      }
    } catch (err) {
      console.error(`Could not update weather condition: ${err}`);
    }
  };

  const update = async (): Promise<any> => {
    await Promise.all([updateWeatherConditions(), updateStories()]);

    await getLog();

    const result = await BackgroundRunner.dispatchEvent<{ value: string }>({
      event: "getLastUpdated",
      label: "com.capacitorjs.background.testapp.task",
      details: {
        currentDate: new Date(),
      },
    });

    if (result && result.value) {
      const timestamp = parseInt(result.value);
      const timestampDate = new Date(timestamp * 1000);
      setLastUpdated(timestampDate);
    } else {
      console.warn("No value for key 'last_updated'");
    }
  };

  const getLog = async (): Promise<void> => {
    const result = await BackgroundRunner.dispatchEvent<{ value: string }>({
      event: "getUpdateLog",
      label: "com.capacitorjs.background.testapp.task",
      details: {},
    });

    if (result && result.value) {
      const latestLog = JSON.parse(result.value) as UpdateLog;
      setLog(latestLog);
    } else {
      console.warn("no value for key `update_log`");
    }
  };

  useEffect(() => {
    update();

    const handle = App.addListener("appStateChange", (appState) => {
      if (appState.isActive) {
        update();
      }
    });

    return () => {
      handle.remove();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        conditions,
        stories,
        log,
        lastUpdated,
        update,
        getLog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
