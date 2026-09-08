import { useState } from 'react';
import styles from './TimeSettingInput.module.css';

export function TimeSettingInput({
  minutes,
  seconds,
  onMinutesChange,
  onSecondsChange,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.timerContainer}>
      <input
        type="text"
        inputMode="numberic"
        maxLength={2}
        min={0}
        value={isFocused ? minutes : String(minutes).padStart(2, '0')}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onMinutesChange}
      />
      <span>:</span>
      <input
        type="text"
        inputMode="numberic"
        maxLength={2}
        min={0}
        value={isFocused ? seconds : String(seconds).padStart(2, '0')}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onSecondsChange}
      />
    </div>
  );
}
