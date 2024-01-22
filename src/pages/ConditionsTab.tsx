import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './ConditionsTab.css';
import CurrentConditions from '../components/CurrentConditions';

const ConditionsTab: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>   
        <CurrentConditions />     
      </IonContent>
    </IonPage>
  );
};

export default ConditionsTab;
