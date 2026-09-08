import { formatDuration } from '../../../utils/formatDuration';
import styles from './TimerDisplay.module.css';

export function TimerDisplay({ duration }) {
  return <p className={styles.timerDisplay}>{formatDuration(duration)}</p>;
}
