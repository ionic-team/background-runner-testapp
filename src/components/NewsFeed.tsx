import {
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonNote,
  IonIcon,
} from "@ionic/react";
import { arrowRedoOutline } from "ionicons/icons";
import styles from "./NewsFeed.module.css";

const NewsFeed: React.FC = () => {
  return (
    <div className={styles.feed}>
      <IonList inset={true}>
        <IonItem button={true} detail={false}>
          <IonLabel>
            <strong>Sample Article Title</strong>
            <IonText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              vehicula dapibus velit...
            </IonText>
          </IonLabel>
          <div className="metadata-end-wrapper" slot="end">
            <IonIcon color="medium" icon={arrowRedoOutline}></IonIcon>
          </div>
        </IonItem>
      </IonList>
      <div className={styles.timestamp}>Last Updated: ---</div>
    </div>
  );
};

export default NewsFeed;
