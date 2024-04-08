import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
} from "@ionic/react";
import { format, fromUnixTime } from "date-fns";
import "./FeedTab.css";

import { useApp } from "../context/AppContext";
import { useEffect } from "react";

const LogTab: React.FC = () => {
  const { log, getLog } = useApp();

  useEffect(() => {
    getLog();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Update Log</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="small">Update log</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonListHeader>
            <IonLabel>News Update Log</IonLabel>
          </IonListHeader>
          {log.weather.length == 0 && (
            <IonItem>
              <IonLabel>No News Update Attempts</IonLabel>
            </IonItem>
          )}
          {log.news.map((l) => {
            return (
              <IonItem key={l.timestamp}>
                <IonLabel>
                  <strong>
                    {format(fromUnixTime(l.timestamp), "hh:mm aa - MM/dd/yyyy")}
                  </strong>
                  <IonText>{l.status}</IonText>
                </IonLabel>
              </IonItem>
            );
          })}
          <IonListHeader>
            <IonLabel>Weather Update Log</IonLabel>
          </IonListHeader>
          {log.weather.length == 0 && (
            <IonItem>
              <IonLabel>No Weather Update Attempts</IonLabel>
            </IonItem>
          )}
          {log.weather.map((l) => {
            return (
              <IonItem key={l.timestamp}>
                <IonLabel>
                  <strong>
                    {format(fromUnixTime(l.timestamp), "hh:mm aa - MM/dd/yyyy")}
                  </strong>
                  <IonText>{l.status}</IonText>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default LogTab;
