import { MoveButton } from '#publicComponents';
import pointIcon from '../../assets/ic_point.svg';
import styles from './StudyInfo.module.css';

export function StudyInfo({ study, onOpenPasswordModal }) {
  return (
    <div className={styles.info}>
      {/* 스터디 제목 영역 */}
      <div className={styles.headingRow}>
        <h1 className={styles.title}>
          {study.nickname}의 {study.name}
        </h1>

        {/* 오늘의 습관 / 오늘의 집중 이동 버튼 */}
        <div className={styles.moveActions}>
          <div
            onClickCapture={(event) => {
              event.preventDefault();
              onOpenPasswordModal('habit');
            }}
          >
            <MoveButton route="/habit">오늘의 습관</MoveButton>
          </div>

          <div
            className={styles.focusButton}
            onClickCapture={(event) => {
              event.preventDefault();
              onOpenPasswordModal('focus');
            }}
          >
            <MoveButton route="/focus">오늘의 집중</MoveButton>
          </div>
        </div>
      </div>

      {/* 스터디 소개와 포인트 정보 */}
      <div className={styles.details}>
        <section className={styles.section}>
          <h2 className={styles.label}>소개</h2>
          <p className={styles.description}>{study.description}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.label}>현재까지 획득한 포인트</h2>

          {/* 현재 포인트 표시 */}
          <p className={styles.badge}>
            <img src={pointIcon} alt="" width={19} height={19} />
            <span>{study.point}P 획득</span>
          </p>
        </section>
      </div>
    </div>
  );
}