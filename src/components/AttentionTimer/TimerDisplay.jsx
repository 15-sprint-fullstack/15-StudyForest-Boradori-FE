import { formatDuration } from '../../utils/formatDuration';

export function TimerDisplay({ duration }) {
  return (
    <p style={{ fontSize: '56px', fontWeight: 700, margin: 0 }}>
      {formatDuration(duration)}
    </p>
  );
}
