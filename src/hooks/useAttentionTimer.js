import { useState, useEffect } from 'react';

export function useAttentionTimer({ onStop }) {
  const [settingMinutes, setSettingMinutes] = useState(() => {
    const saved = sessionStorage.getItem('timer');
    return saved ? JSON.parse(saved).minutes : 0;
  });
  const [settingSeconds, setSettingSeconds] = useState(() => {
    const saved = sessionStorage.getItem('timer');
    return saved ? JSON.parse(saved).seconds : 0;
  });
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);

  const [duration, setDuration] = useState(0);
  const settingDuration = settingMinutes * 60 * 1000 + settingSeconds * 1000;
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  const [showPauseWarning, setShowPauseWarning] = useState(false);
  const hasStarted = accumulatedTime > 0 || isRunning;

  const handleStart = () => {
    if (settingDuration <= 0) {
      console.log('0보다 작음');
      return;
    }
    setStartTime(performance.now());
    setDuration(settingDuration);
    setAccumulatedTime(0);

    setIsRunning(true);
  };

  const handleStop = () => {
    const finalAccumlated = isRunning
      ? accumulatedTime + (performance.now() - startTime)
      : accumulatedTime;

    if (finalAccumlated >= settingDuration) {
      onStop?.(finalAccumlated);
    }

    setDuration(0);
    setAccumulatedTime(0);
    setIsRunning(false);
  };

  const handlePause = () => {
    setAccumulatedTime((prev) => prev + (performance.now() - startTime));
    setIsRunning(false);
    setShowPauseWarning(true);
  };

  const handleResume = () => {
    setStartTime(performance.now());
    setIsRunning(true);
  };

  const handleMinutesChange = (e) => {
    const value = Number(e.target.value);
    if (!Number.isNaN(value) && value >= 0) {
      setSettingMinutes(value);
    }
  };

  const handleSecondsChange = (e) => {
    const value = Number(e.target.value);
    if (!Number.isNaN(value) && value >= 0) {
      setSettingSeconds(value);
    }
  };
  // sessionStorage 설정
  useEffect(() => {
    sessionStorage.setItem(
      'timer',
      JSON.stringify({ minutes: settingMinutes, seconds: settingSeconds }),
    );
  }, [settingMinutes, settingSeconds]);

  // 타이머 동작
  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const timer = setInterval(() => {
      setDuration(
        settingDuration - (accumulatedTime + (performance.now() - startTime)),
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, startTime, settingDuration, accumulatedTime]);

  // 중단 메시지
  useEffect(() => {
    if (!showPauseWarning) {
      return;
    }
    const timer = setTimeout(() => setShowPauseWarning(false), 5000);
    return () => clearTimeout(timer);
  }, [showPauseWarning]);

  return {
    setting: {
      minutes: settingMinutes,
      seconds: settingSeconds,
      onMinutesChange: handleMinutesChange,
      onSecondsChange: handleSecondsChange,
    },
    timer: { duration, isRunning, hasStarted },
    controls: {
      onStart: handleStart,
      onStop: handleStop,
      onPause: handlePause,
      onResume: handleResume,
    },
    showPauseWarning,
  };
}
