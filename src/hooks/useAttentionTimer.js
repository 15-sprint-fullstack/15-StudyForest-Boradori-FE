import { useState, useEffect } from 'react';

export function useAttentionTimer({ onStop }) {
  // const [settingMinutes, setSettingMinutes] = useState(0);
  // const [settingSeconds, setSettingSeconds] = useState(0);
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
  // 분리할 거임.

  // 시작버튼 누를 때는 타이머 맨 처음
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

  // 정지 버튼 - 초기화 버튼
  // 러닝 중이면 축적된 것에서 또 재개한 시간들 더해서 넣으면 됨.
  // 러닝 중 아니면 그냥 축적된 것만 넣으면 됨 : 추가로 동작한 게 없으니까.
  const handleStop = () => {
    const finalAccumlated = isRunning
      ? accumulatedTime + (performance.now() - startTime)
      : accumulatedTime;

    // 그러고 나서 여기도 초기화 하기
    // 그냥 초기화 함수를 만드는 것이 좋을 듯 하다.

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
  // 재개버튼 누르면 시작 시간 새로 받기.
  const handleResume = () => {
    setStartTime(performance.now());
    setIsRunning(true);
  };

  useEffect(() => {
    sessionStorage.setItem(
      'timer',
      JSON.stringify({ minutes: settingMinutes, seconds: settingSeconds }),
    );
  }, [settingMinutes, settingSeconds]);

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

  useEffect(() => {
    if (!showPauseWarning) {
      return;
    }
    const timer = setTimeout(() => setShowPauseWarning(false), 5000);
    return () => clearTimeout(timer);
  }, [showPauseWarning]);

  // alert 경고창

  const hasStarted = accumulatedTime > 0 || isRunning;

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
