// 시간 설정 입력

export function TimeSettingInput({
  minutes,
  seconds,
  onMinutesChange,
  onSecondsChange,
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        gap: '4px',
      }}
    >
      <input
        type="number"
        min={0}
        value={minutes}
        onChange={onMinutesChange}
        style={{
          width: '90px',
          fontSize: '56px',
          fontWeight: 700,
          textAlign: 'right',
          border: 'none',
          outline: 'none',
          background: 'transparent',
        }}
      />
      <span style={{ fontSize: '56px', fontWeight: 700, margin: 0 }}>:</span>
      <input
        type="number"
        min={0}
        value={seconds}
        onChange={onSecondsChange}
        style={{
          width: '90px',
          fontSize: '56px',
          fontWeight: 700,
          textAlign: 'right',
          border: 'none',
          outline: 'none',
          background: 'transparent',
        }}
      />
    </div>
  );
}
