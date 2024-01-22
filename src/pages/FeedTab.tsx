import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./FeedTab.css";
import NewsFeed from "../components/NewsFeed";
import { useApp } from "../context/AppContext";

const FeedTab: React.FC = () => {
  const { stories, lastUpdated } = useApp();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Apple Developer News</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Apple Developer News</IonTitle>
          </IonToolbar>
        </IonHeader>
        <NewsFeed stories={stories} lastUpdated={lastUpdated} />
      </IonContent>
    </IonPage>
  );
};

export default FeedTab;
