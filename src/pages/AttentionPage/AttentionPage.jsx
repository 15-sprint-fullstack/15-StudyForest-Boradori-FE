import { TimeSettingInput } from '../../components/AttentionTimer/TimeSettingInput/TimeSettingInput';
import { TimerControl } from '../../components/AttentionTimer/TimerControl/TimerControl';
import { TimerDisplay } from '../../components/AttentionTimer/TimerDisplay/TimerDisplay';
import { useAttentionTimer } from '../../hooks/useAttentionTimer';
import { usePoint } from '../../hooks/usePoint';
import styles from './AttentionPage.module.css';
import { AlertBox, MoveButton } from '#publicComponents';
import pointIcon from '/src/assets/ic_point.svg';

export function AttentionPage() {
  const { point, awardPoint } = usePoint();
  const { setting, timer, controls, showPauseWarning, isOvertime } =
    useAttentionTimer({
      onStop: awardPoint,
    });

  return (
    <div>
      <div className={styles.attentionPage}>
        <div className={styles.attentionContainer}>
          <div className={styles.attentionHeader}>
            <div className={styles.mainHeader}>
              <h2>연우의 개발공장</h2>
              <div className={styles.moveButtonContainer}>
                <MoveButton route={'/studies/:studyId/habit'}>
                  오늘의 습관
                </MoveButton>
                <MoveButton route={'/studies/:studyId/habitRecord'}>
                  홈
                </MoveButton>
              </div>
            </div>
            <div className={styles.headerContent}>
              <p>현재까지 획득한 포인트</p>
              <div>
                <img src={pointIcon} alt="포인트_아이콘" />
                <span>{point}P 획득</span>
              </div>
            </div>
          </div>

          <div className={styles.timerContainer}>
            <h3>오늘의 집중</h3>
            {!timer.hasStarted ? (
              <TimeSettingInput {...setting} />
            ) : (
              <TimerDisplay duration={timer.duration} />
            )}

            <TimerControl
              {...controls}
              hasStarted={timer.hasStarted}
              isOvertime={isOvertime}
            />
          </div>
        </div>
        {showPauseWarning && <AlertBox>🚨 집중이 중단되었습니다.</AlertBox>}
      </div>
    </div>
  );
}
