import { createContext, useContext, useEffect, useState } from "react";
import { App } from "@capacitor/app";
import { Preferences } from "@capacitor/preferences";

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

interface AppContextProps {
  conditions: WeatherCondition;
  stories: NewsStory[];
  lastUpdated?: Date;

  update: () => Promise<any>;
}

interface AppProviderProps {
  children?: React.ReactNode;
}

const defaultCondition: WeatherCondition = {
  location: "---",
  temp: 0,
  condition: "---",
  conditionIcon: "",
};

export const AppContext = createContext<AppContextProps>({
  conditions: defaultCondition,
  stories: [],
  lastUpdated: undefined,
  update: () => Promise.resolve(),
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [conditions, setConditions] =
    useState<WeatherCondition>(defaultCondition);
  const [stories, setStories] = useState<NewsStory[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | undefined>(undefined);

  const updateStories = async (): Promise<void> => {
    try {
      const result = await Preferences.get({ key: "cached_stories" });
      if (result.value) {
        const cachedStories = JSON.parse(result.value) as NewsStory[];
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
      const result = await Preferences.get({ key: "cached_weather" });
      if (result.value) {
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
    await Promise.all([updateStories(), updateWeatherConditions()]);
    const result = await Preferences.get({ key: "last_updated" });
    if (result.value) {
      const timestamp = parseInt(result.value);
      const timestampDate = new Date(timestamp * 1000);
      setLastUpdated(timestampDate);
    } else {
      console.warn("No value for key 'last_updated'");
    }
  };

  useEffect(() => {
    update();

    App.addListener("appStateChange", ({ isActive }) => {
      if (isActive) {
        update();
      }
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        conditions,
        stories,
        lastUpdated,
        update,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
