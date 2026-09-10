import { formatDuration } from '../../../utils/formatDuration';
import styles from './TimerDisplay.module.css';

export function TimerDisplay({ duration, isOvertime }) {
  const isTimeRunningOut = duration <= 60 * 1000;

  const statusClass = isOvertime
    ? styles.isOvertime
    : isTimeRunningOut
      ? styles.isTimeRunningOut
      : '';

  return (
    <p className={`${styles.timerDisplay} ${statusClass}`}>
      {formatDuration(duration)}
    </p>
  );
}
