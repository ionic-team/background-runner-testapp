import { createContext, useContext, useEffect, useState } from "react";

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

  const update = async (): Promise<any> => {
    return Promise.resolve();
  };

  useEffect(() => {
    console.log("App Context Loaded");
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
