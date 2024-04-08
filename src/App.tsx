import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  newspaperOutline,
  cloudOutline,
  settingsOutline,
} from "ionicons/icons";
import ConditionsTab from "./pages/ConditionsTab";
import FeedTab from "./pages/FeedTab";
import LogTab from "./pages/LogTab";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/weather-icons.css";
import { AppProvider } from "./context/AppContext";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AppProvider>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/conditions">
              <ConditionsTab />
            </Route>
            <Route exact path="/feed">
              <FeedTab />
            </Route>
            <Route exact path="/log">
              <LogTab />
            </Route>
            <Route exact path="/">
              <Redirect to="/conditions" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/conditions">
              <IonIcon aria-hidden="true" icon={cloudOutline} />
              <IonLabel>Conditions</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/feed">
              <IonIcon aria-hidden="true" icon={newspaperOutline} />
              <IonLabel>Feed</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/log">
              <IonIcon aria-hidden="true" icon={settingsOutline} />
              <IonLabel>Log</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </AppProvider>
  </IonApp>
);

export default App;
