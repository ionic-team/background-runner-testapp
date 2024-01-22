import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./FeedTab.css";
import NewsFeed from "../components/NewsFeed";

const FeedTab: React.FC = () => {
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
        <NewsFeed />
      </IonContent>
    </IonPage>
  );
};

export default FeedTab;
