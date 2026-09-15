import { useState } from 'react';
import { StudyEmojiReactions } from '../../components/StudyDetailPage/StudyEmojiReactions.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigation, Tag } from '#publicComponents';
import smileIcon from '../../assets/ic_smile.svg';
import { StudyInfo } from '../../components/StudyDetailPage/StudyInfo.jsx';
import { StudyPasswordModal } from '../../components/StudyDetailPage/StudyPasswordModal.jsx';
import { useHabitRecords } from '../../hooks/useHabitRecords.js';
import { useStudy } from '../../hooks/useStudy.js';
import { HabitRecordTable } from './HabitRecordTable.jsx';
import styles from './StudyDetailPage.module.css';
import { useStudyAccess } from '../../hooks/useStudyAccess.js';

export function StudyDetailPage() {
  //수정하기 버튼
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [modalType, setModalType] = useState('edit');
  const [isDeleting, setIsDeleting] = useState(false); //삭제하기
  const navigate = useNavigate();
  const {
    isModalOpen,
    isAccessLoading,
    accessError,
    requireAccess,
    authPassword,
    closeModal,
  } = useStudyAccess(studyId);

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

  //연습용 이모지 조회 샘플
  const [emojis, setEmojis] = useState([
    { id: 1, emoji: '👍', count: 3, isSelected: false }, // 아직 선택하지 않은 상태
    { id: 2, emoji: '❤️', count: 2, isSelected: false }, // 아직 선택하지 않은 상태
  ]);

  //이모지가 있으면 횟수 증가, 없으면 새로추가
  function handleEmojiSelect(emojiData) {
    const selectedEmoji = emojiData.emoji;

    setEmojis((currentEmojis) => {
      const exists = currentEmojis.some((item) => item.emoji === selectedEmoji);

      if (!exists) {
        return [
          ...currentEmojis,
          {
            id: selectedEmoji,
            emoji: selectedEmoji,
            count: 1,
            isSelected: true,
          },
        ];
      }

      return currentEmojis
        .map((item) => {
          if (item.emoji !== selectedEmoji) return item;

          const nextSelected = !item.isSelected;

          return {
            ...item,
            isSelected: nextSelected,
            count: Math.max(0, item.count + (nextSelected ? 1 : -1)),
          };
        })
        .filter((item) => item.count > 0);
    });
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href); // 현재 페이지주소를 클립보드에 복사
      alert('링크가 복사되었습니다');
    } catch {
      alert('링크를 복사하지 못했습니다. 주소창에서 복사해주세요');
    }
  }

  // 인증 관련 함수
  function handleEnter(type) {
    const path = type === 'habit' ? 'habits' : 'focus';
    requireAccess(() => {
      navigate(`/studies/${studyId}/${path}`);
    });
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
            <StudyEmojiReactions
              emojis={emojis}
              onEmojiSelect={handleEmojiSelect} // 기존 선택·취소 함수
            />

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
