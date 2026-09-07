import { TimeSettingInput } from '../../components/AttentionTimer/TimeSettingInput';
import { TimerControl } from '../../components/AttentionTimer/TimerControl';
import { TimerDisplay } from '../../components/AttentionTimer/TimerDisplay';
import { useAttentionTimer } from '../../hooks/useAttentionTimer';
import { usePoint } from '../../hooks/usePoint';

export function AttentionPage() {
  const { point, awardPoint } = usePoint();
  const { setting, timer, controls, showPauseWarning } = useAttentionTimer({
    onStop: awardPoint,
  });

  return (
    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
      <span styles="fontSize : 32px;">Point : {point}</span>
      <p
        style={{ color: 'var(--text-secondary, #888)', marginBottom: '1.5rem' }}
      >
        오늘의 집중
      </p>

      {!timer.hasStarted ? (
        <TimeSettingInput {...setting} />
      ) : (
        <TimerDisplay duration={timer.duration} />
      )}

      <TimerControl
        {...controls}
        hasStarted={timer.hasStarted}
        isRunning={timer.isRunning}
      />

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
