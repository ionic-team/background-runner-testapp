import { IonButton } from "@ionic/react";
import { format } from "date-fns";

import { WeatherCondition } from "../context/AppContext";
import { useApp } from "../context/AppContext";

import styles from "./CurrentConditions.module.css";

interface CurrentConditionsProps {
  conditions: WeatherCondition;
  lastUpdated?: Date;
}

const CurrentConditions: React.FC<CurrentConditionsProps> = ({
  conditions,
  lastUpdated,
}) => {
  const { requestPermissions, hasPermissions, dispatchBackgroundEvent } =
    useApp();
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
            disabled={hasPermissions}
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
