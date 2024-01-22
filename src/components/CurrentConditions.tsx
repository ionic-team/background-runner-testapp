import styles from "./CurrentConditions.module.css";

const CurrentConditions: React.FC = () => {
  return (
    <div className={styles.conditions}>
      <div className={styles.inner}>
        <div className={styles.location}>Any City, South Dakota 57106</div>
        <h2 className={styles.temp}>-10&deg;</h2>
        <h1 className={styles.condition}>
          <span className={styles.icon}>
            <i className="wi wi-night-sleet"></i>
          </span>
          &nbsp;Clear
        </h1>
        <div className={styles.timestamp}>Last Updated: ---</div>
      </div>
    </div>
  );
};

export default CurrentConditions;
