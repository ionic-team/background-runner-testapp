import { IonList, IonItem, IonLabel, IonText, IonIcon } from "@ionic/react";
import { arrowRedoOutline } from "ionicons/icons";

import { NewsStory } from "../context/AppContext";

import styles from "./NewsFeed.module.css";

interface NewsFeedProps {
    stories: NewsStory[];
    lastUpdated?: Date;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ stories, lastUpdated }) => {
    const launchArticle = (url: string) => {
        window.open(url, "_blank");
    };

    return (
        <div className={styles.feed}>
            <IonList inset={true}>
                {stories.map((story) => {
                    return (
                        <IonItem
                            key={story.link}
                            onClick={() => launchArticle(story.link)}
                            button={true}
                            detail={false}
                        >
                            <IonLabel>
                                <strong>{story.title}</strong>
                                <IonText>{story.teaser}</IonText>
                            </IonLabel>
                            <div className="metadata-end-wrapper" slot="end">
                                <IonIcon
                                    color="medium"
                                    icon={arrowRedoOutline}
                                ></IonIcon>
                            </div>
                        </IonItem>
                    );
                })}
            </IonList>
            <div className={styles.timestamp}>
                Last Updated: {lastUpdated ? lastUpdated.toISOString() : "---"}
            </div>
        </div>
    );
};

export default NewsFeed;
