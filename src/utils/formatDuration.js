// ms -> minute / seconds 구분
export function formatDuration(ms) {
  const isOvertime = ms < 0;
  const absDuration = Math.abs(ms);
  const totalSeconds = Math.round(absDuration / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;

  return { isOvertime, seconds, minutes };
}
