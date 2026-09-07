export function TimerControl({
  hasStarted,
  onStart,
  onPause,
  onStop,
  onResume,
  isRunning,
}) {
  return (
    <div
      style={{
        marginTop: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
      }}
    >
      {!hasStarted && <button onClick={onStart}>▶ Start!</button>}
      {isRunning && <button onClick={onPause}>일시정지</button>}
      {!isRunning && hasStarted && <button onClick={onResume}>재개</button>}
      {hasStarted && <button onClick={onStop}>정지</button>}
    </div>
  );
}
