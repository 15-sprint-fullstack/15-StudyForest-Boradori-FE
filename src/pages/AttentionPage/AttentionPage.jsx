import { useEffect, useState } from 'react';

export function AttentionPage() {
  // 이제 저 settingMinutes를 ㅣocalStorage 에 저장하면 될 듯용?
  // 입력받을 때 일단 기본으로 00 으로 시작하는 거 : 1시간
  // 타이머 받을 수 있는 정도의 제한 값
  const [settingMinutes, setSettingMinutes] = useState(0);
  const [settingSeconds, setSettingSecondes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);

  const [duration, setDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const settingDuration = settingMinutes * 60 * 1000 + settingSeconds * 1000;
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  const [showPauseWarning, setShowPauseWarning] = useState(false);

  // 시작버튼 누를 때는 타이머 맨 처음
  const handleStart = () => {
    setStartTime(performance.now());
    setDuration(settingDuration);
    setAccumulatedTime(0);
    setTotalDuration(0);
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
    setTotalDuration(finalAccumlated);
    setDuration(0);
    setAccumulatedTime(0);
    setIsRunning(false);
  };

  // 정지 버튼 눌렀을 때는 축적 값 바꾸기.
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

  // 분 / 초 와 - 값 받기
  const calcDuration = (duration) => {
    const isOvertime = duration < 0;
    const absDuration = Math.abs(duration);
    const totalSeconds = Math.round(absDuration / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;

    return { isOvertime, seconds, minutes };
  };

  // setInterval 해서 1초마다 duration 보여주기.
  useEffect(() => {
    // running 중 아니면 저 모든 duration이 들어가지 않게 하면 됨~
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

  // 입력 값
  const handleMinutesChange = (e) => {
    const value = Number(e.target.value);
    if (!Number.isNaN(value) && value >= 0) {
      setSettingMinutes(value);
    }
  };

  const handleSecondsChange = (e) => {
    const value = Number(e.target.value);
    if (!Number.isNaN(value) && value >= 0) {
      setSettingSecondes(value);
    }
  };

  // alert 경고창

  const hasStarted = accumulatedTime > 0 || isRunning;
  const hasStopped = !hasStarted && totalDuration > 0;

  const runningResult = calcDuration(duration);
  const totalResult = calcDuration(totalDuration);

  return (
    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
      <p
        style={{ color: 'var(--text-secondary, #888)', marginBottom: '1.5rem' }}
      >
        오늘의 집중
      </p>

      {!hasStarted ? (
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
            value={settingMinutes}
            onChange={handleMinutesChange}
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
          <span style={{ fontSize: '56px', fontWeight: 700, margin: 0 }}>
            :
          </span>
          <input
            type="number"
            min={0}
            value={settingSeconds}
            onChange={handleSecondsChange}
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
      ) : (
        <p style={{ fontSize: '56px', fontWeight: 700, margin: 0 }}>
          {runningResult.isOvertime ? '-' : ''}
          {String(runningResult.minutes).padStart(2, '0')}:
          {String(runningResult.seconds).padStart(2, '0')}
        </p>
      )}

      <div
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {!hasStarted && <button onClick={handleStart}>▶ Start!</button>}
        {isRunning && <button onClick={handlePause}>일시정지</button>}
        {!isRunning && hasStarted && (
          <button onClick={handleResume}>재개</button>
        )}
        {hasStarted && <button onClick={handleStop}>정지</button>}
      </div>

      {hasStopped && (
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary, #888)' }}>
          최종시간 | {totalResult.isOvertime ? '-' : ''}
          {String(totalResult.minutes).padStart(2, '0')}:
          {String(totalResult.seconds).padStart(2, '0')}
        </p>
      )}

      {showPauseWarning && (
        <p
          style={{ marginTop: '0.5rem', color: 'var(--text-danger, #d32f2f)' }}
        >
          집중이 중단되었습니다.
        </p>
      )}
    </div>
  );
}
