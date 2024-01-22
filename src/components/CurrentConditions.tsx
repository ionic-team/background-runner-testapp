import styles from "./CurrentConditions.module.css";

interface CurrentConditionsProps {
  conditions: WeatherCondition;
  lastUpdated?: Date;
}

export interface WeatherCondition {
  location: string;
  temp: number;
  condition: string;
  conditionIcon: string;
}

const CurrentConditions: React.FC<CurrentConditionsProps> = ({
  conditions,
  lastUpdated,
}) => {
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
          Last Updated: {lastUpdated ? lastUpdated.toISOString() : "---"}
        </div>
      </div>
    </div>
  );
};

export default CurrentConditions;
