import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { StudyEmojiReactions } from '../../components/StudyDetailPage/StudyEmojiReactions.jsx';
import { StudyInfo } from '../../components/StudyDetailPage/StudyInfo.jsx';
import { StudyPasswordModal } from '../../components/StudyDetailPage/StudyPasswordModal.jsx';
import { useEmojis } from '../../hooks/useEmojis.js';
import { useHabitRecords } from '../../hooks/useHabitRecords.js';
import { useStudy } from '../../hooks/useStudy.js';
import { HabitRecordTable } from './HabitRecordTable.jsx';
import styles from './StudyDetailPage.module.css';

export function StudyDetailPage() {
  //수정하기 버튼
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [modalType, setModalType] = useState('edit');
  const [isDeleting, setIsDeleting] = useState(false); //삭제하기

  function openPasswordModal(type) {
    setModalType(type);
    setIsPasswordModalOpen(true);
  }

  //스터디 조회
  const { studyId } = useParams();
  const { study, isLoading, error } = useStudy(studyId);

  //습관기록
  const {
    habits,
    isLoading: isHabitLoading,
    error: habitError,
  } = useHabitRecords(studyId);

  //이모지 : 훅에서 목록과 서버 요청 함수 가져옴
  const {
    emojis,
    isLoading: isEmojiLoading,
    error: emojiError,
    toggleEmoji,
  } = useEmojis(studyId);

  // 클릭한 이모지를 서버 요청 함수에 전달
  function handleEmojiSelect(emojiData) {
    toggleEmoji(emojiData.emoji);
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href); // 현재 페이지주소를 클립보드에 복사
      alert('링크가 복사되었습니다');
    } catch {
      alert('링크를 복사하지 못했습니다. 주소창에서 복사해주세요');
    }
  }

  //훅 실행 후 데이터를 표시할 준비체크
  if (isLoading) {
    return <p role="status">스터디를 불러오는 중이예요.</p>;
  }
  if (error) {
    return <p role="alert">{error.message}</p>;
  }
  if (!study) {
    return <p>스터디를 찾을 수 없습니다.</p>;
  }

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <article className={styles.panel}>
          <div className={styles.topRow}>
            {/* 목록과 오류 안내를 함께 표시 */}
            <div className={styles.emojiArea}>
              {isEmojiLoading ? (
                <p role="status">이모지를 불러오는 중이에요.</p>
              ) : (
                <StudyEmojiReactions
                  emojis={emojis} // 요청 실패 시에도 기존 목록 유지
                  onEmojiSelect={handleEmojiSelect} // 기존 선택·취소 함수
                />
              )}

              {/* 오류가 생겨도 목록을 숨기지 않고 안내만 추가 */}
              {emojiError && (
                <p className={styles.emojiError} role="alert">
                  {emojiError.response?.data?.message ??
                    '이모지 요청을 처리하지 못했어요. 잠시 후 다시 시도해 주세요.'}
                </p>
              )}
            </div>

            <div className={styles.actions}>
              <button type="button" onClick={handleShare}>
                공유하기
              </button>

              <span aria-hidden="true">|</span>

              <button type="button" onClick={() => openPasswordModal('edit')}>
                수정하기
              </button>

              <span aria-hidden="true">|</span>

              <button type="button" onClick={() => openPasswordModal('delete')}>
                스터디 삭제하기
              </button>
            </div>
          </div>
          <StudyInfo
            study={study} // 스터디 정보를 전달해요.
            onOpenPasswordModal={openPasswordModal} // 모달 열기 함수를 전달해요.
          />

          {/* 조회 중, 실패, 성공을 구분해서 표시 */}
          {isHabitLoading ? (
            <p role="status">습관 기록을 불러오는 중이예요</p>
          ) : habitError ? (
            <p>습관 기록을 불러오지 못했습니다 {habitError.message}</p>
          ) : (
            <HabitRecordTable habits={habits} />
          )}
        </article>
      </main>

      {isPasswordModalOpen && ( //모달이 열렸을 때만 전용 컴포넌트를 만듦
        <StudyPasswordModal
          isOpen={isPasswordModalOpen}
          study={study}
          actionType={modalType}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}
    </div>
  );
}
