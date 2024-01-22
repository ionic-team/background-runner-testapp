import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./FeedTab.css";
import NewsFeed, { NewsStory } from "../components/NewsFeed";

const FeedTab: React.FC = () => {
  const testStory: NewsStory[] = [
    {
      title: "Sample Article Title",
      teaser:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula dapibus velit...",
      link: "http://www.apple.com",
      publishDate: new Date(),
    },
  ];
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
        <NewsFeed stories={testStory} />
      </IonContent>
    </IonPage>
  );
};

export default FeedTab;
