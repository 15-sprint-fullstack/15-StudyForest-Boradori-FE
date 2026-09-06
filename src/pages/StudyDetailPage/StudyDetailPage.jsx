import { useState } from 'react';
import logo from '../../assets/img_logo.svg';
import Header from '../../components/Header.jsx';
import StudyPasswordModal from '../../components/StudyDetailPage/StudyPasswordModal.jsx';
import styles from './StudyDetailPage.module.css';

function StudyDetailPage() {
  //수정하기 버튼
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [modalType, setModalType] = useState('edit');

  function openPasswordModal(type) {
    setModalType(type);
    setIsPasswordModalOpen(true);
  }

  // 연습용
  const study = {
    nickname: '코딩새싹',
    name: '매일 한 시간 공부',
    description: '매일 조금씩 함꼐 공부해요',
    point: 120,
  };

  // 기록표에 표시할 연습용 습관 목록 (DB연결하고 나면 지우겠습니다.)
  const habits = [
    // {
    //   id: 1,
    //   name: '책 10쪽 읽기',
    //   records: [true, false, true, false, false, false, false],
    // },
    // {
    //   id: 2,
    //   name: '스트레칭',
    //   records: [true, true, false, false, false, false, false],
    // },
    // {
    //   id: 3,
    //   name: '물 2L 마시기',
    //   records: [false, false, false, false, false, false, false],
    // },
  ];

  //연습용
  const emojis = [
    // 화면에 표시할 연습용 이모지 반응 목록
    { id: 1, emoji: '👍', count: 3 },
    { id: 2, emoji: '❤️', count: 2 },
    { id: 3, emoji: '😊', count: 1 },
  ]; // 반응 목록을 마쳐요.

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href); // 현재 페이지주소를 클립보드에 복사
      alert('링크가 복사되었습니다');
    } catch {
      alert('링크를 복사하지 못했습니다. 주소창에서 복사해주세요');
    }
  }

  return (
    <div className={styles.page}>
      <header>
        <Header />
      </header>

      <main className={styles.shell}>
        <article className={styles.panel}>
          <div className={styles.topRow}>
            <div className={styles.emojiList}>
              {emojis.map((item) => (
                <span key={item.id}>
                  {item.emoji} {item.count}
                </span>
              ))}

              {/* 이모지 목록 오른쪽 추가버튼 */}
              <button type="button">추가</button>
            </div>

            <div className={styles.actions}>
              <button type="button" onClick={handleShare}>
                공유하기
              </button>

              <button type="button" onClick={() => openPasswordModal('edit')}>
                수정하기
              </button>

              <button type="button" onClick={() => openPasswordModal('delete')}>
                스터디 삭제하기
              </button>
            </div>
          </div>

          <div className={styles.headingRow}>
            <h1>
              {study.nickname}의 {study.name}
            </h1>
            <div className={styles.moveActions}>
              <button
                type="button"
                className={styles.habitButton}
                onClick={() => openPasswordModal('habit')}
              >
                오늘의 습관
              </button>
              <button
                type="button"
                className={styles.focusButton}
                onClick={() => openPasswordModal('focus')}
              >
                오늘의 집중
              </button>
            </div>
          </div>

          <section>
            <h2>소개</h2>
            <p>{study.description}</p>
          </section>

          <section>
            <h2>현재까지 획득한 포인트</h2>
            <p>{study.point}P 획득</p>
          </section>

          <section className={styles.habitSection}>
            <h2>습관 기록표</h2>

            {habits.length === 0 ? (
              <p className={styles.emptyMessage}>
                아직 습관이 없어요 <br />
                오늘의 습관에서 습관을 생성해보세요
              </p>
            ) : (
              <div className={styles.tableWrapper}>
                <table className={styles.habitTable}>
                  <thead>
                    <tr>
                      <th scope="col">습관</th>
                      <th scope="col">월</th>
                      <th scope="col">화</th>
                      <th scope="col">수</th>
                      <th scope="col">목</th>
                      <th scope="col">금</th>
                      <th scope="col">토</th>
                      <th scope="col">일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {habits.map((habit) => (
                      <tr key={habit.id}>
                        <th scope="row">{habit.name}</th>
                        {habit.records.map((isCompleted, dayIndex) => (
                          <td key={dayIndex}>{isCompleted ? '완료' : '-'}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </article>
      </main>

      {isPasswordModalOpen && (
        <StudyPasswordModal
          study={study}
          actionType={modalType}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}
    </div>
  );
}

export default StudyDetailPage;
