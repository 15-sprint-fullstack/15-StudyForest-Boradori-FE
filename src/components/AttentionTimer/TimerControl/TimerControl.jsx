import pauseIcon from '#assets/ic_pause.svg';
import playIcon from '#assets/ic_play.svg';
import restartIcon from '#assets/ic_restart.svg';
import stopIcon from '#assets/ic_stop.svg';
import styles from './TimerControl.module.css';

export function TimerControl({
  hasStarted,
  onStart,
  onPause,
  onStop,
  onResume,
  isRunning,
  isOvertime,
}) {
  return (
    <div className={styles.timerButtonContainer}>
      {hasStarted && !isOvertime && (
        <button
          onClick={onPause}
          className={styles.circleBtn}
          disabled={!isRunning}
        >
          <img src={pauseIcon} alt="일시정지_아이콘" />
        </button>
      )}
      {!hasStarted && (
        <button onClick={onStart} className={styles.mainButton}>
          <img src={playIcon} alt="시작_아이콘" />
          <span>Start!</span>
        </button>
      )}
      {hasStarted && (
        <button onClick={onStop} className={styles.mainButton}>
          <img src={stopIcon} alt="정지_아이콘" />
          <span>Stop!</span>
        </button>
      )}
      {hasStarted && !isOvertime && (
        <button
          onClick={onResume}
          className={styles.circleBtn}
          disabled={isRunning}
        >
          <img src={restartIcon} alt="재개_아이콘" />
        </button>
      )}
    </div>
  );
}
