import { useEffect, useState } from "react";
import { IonButton } from "@ionic/react";
import { BackgroundRunner } from "@capacitor/background-runner";
import { WeatherCondition } from "../context/AppContext";
import { format } from "date-fns";
import styles from "./CurrentConditions.module.css";

interface CurrentConditionsProps {
  conditions: WeatherCondition;
  lastUpdated?: Date;
}

const CurrentConditions: React.FC<CurrentConditionsProps> = ({
  conditions,
  lastUpdated,
}) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const requestPermissions = async () => {
    const permissions = await BackgroundRunner.requestPermissions({
      apis: ["geolocation"],
    });
    if (permissions.geolocation === "granted") {
      setHasPermission(true);
    }
  };

  const dispatchBackgroundEvent = async () => {
    try {
      await BackgroundRunner.dispatchEvent({
        event: "updateData",
        label: "com.capacitorjs.background.testapp.task",
        details: {},
      });
    } catch (err) {
      console.error(`Dispatch error: ${err}`);
    }
  };

  useEffect(() => {
    (async () => {
      const permissions = await BackgroundRunner.checkPermissions();
      if (permissions.geolocation === "granted") {
        setHasPermission(true);
      }
    })();
  }, []);

  return (
    <div className={styles.conditions}>
      <div className={styles.inner}>
        <div className={styles.location}>{conditions.location}</div>
        <h2 className={styles.temp}>{conditions.temp}&deg;</h2>
        <h1 className={styles.condition}>
          {conditions.conditionIcon.length > 0 && (
            <span className={styles.icon}>
              <i className="wi wi-night-sleet"></i>
            </span>
          )}
          &nbsp;{conditions.condition}
        </h1>
        <div className={styles.timestamp}>
          Last Updated:{" "}
          {lastUpdated ? format(lastUpdated, "LL-dd-yyyy hh:mm:ss a") : "---"}
        </div>

        <div className="actions">
          <IonButton
            disabled={hasPermission}
            onClick={requestPermissions}
            size="small"
          >
            Permissions
          </IonButton>
          <IonButton onClick={dispatchBackgroundEvent} size="small">
            Dispatch UpdateData
          </IonButton>
        </div>
      </div>
    </div>
  );
};

export default CurrentConditions;
