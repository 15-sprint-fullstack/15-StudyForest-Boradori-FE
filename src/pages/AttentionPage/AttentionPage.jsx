import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Toast, MoveButton } from '#publicComponents';
import { TimeSettingInput } from '../../components/AttentionTimer/TimeSettingInput/TimeSettingInput';
import { TimerControl } from '../../components/AttentionTimer/TimerControl/TimerControl';
import { TimerDisplay } from '../../components/AttentionTimer/TimerDisplay/TimerDisplay';
import { useAttentionTimer } from '../../hooks/useAttentionTimer';
import { usePoint } from '../../hooks/usePoint';
import { useStudy } from '../../hooks/useStudy';
import styles from './AttentionPage.module.css';
import pointIcon from '/src/assets/ic_point.svg';

export function AttentionPage() {
  const { studyId } = useParams();
  const { study, isLoading, error } = useStudy(studyId);

  const [pagePoint, setPagePoint] = useState(null);

  const point = pagePoint ?? study?.point;

  const { awardPoint, gainPoint, showGainPoint } = usePoint(
    studyId,
    point,
    setPagePoint,
  );
  const { setting, timer, controls, showPauseWarning, isOvertime } =
    useAttentionTimer({
      onStop: awardPoint,
    });

  if (error) {
    return <div>스터디 정보를 불러오지 못했습니다.</div>;
  }

  if (isLoading || !study) {
    return <div>불러오는 중...</div>;
  }

  return (
    <div>
      <div className={styles.attentionPage}>
        <div className={styles.attentionContainer}>
          <div className={styles.attentionHeader}>
            <div className={styles.mainHeader}>
              <h2>
                {study.nickname}의 {study.name}
              </h2>
              <div className={styles.moveButtonContainer}>
                <MoveButton route={'/studies/${studyId}/habit'}>
                  오늘의 습관
                </MoveButton>
                <MoveButton route={'/studies/${studyId}/habitRecord'}>
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
              <TimerDisplay duration={timer.duration} isOvertime={isOvertime} />
            )}

            <TimerControl
              {...controls}
              hasStarted={timer.hasStarted}
              isRunning={timer.isRunning}
              isOvertime={isOvertime}
            />
          </div>
        </div>
        {showPauseWarning && (
          <Toast className={styles.alertContainer}>
            🚨 집중이 중단되었습니다.
          </Toast>
        )}
        {showGainPoint && (
          <Toast className={styles.pointContainer}>
            🎉 {gainPoint}포인트를 획득했습니다!
          </Toast>
        )}
      </div>
    </div>
  );
}
