import EmojiPicker from 'emoji-picker-react'; // 리액트 이모지 선택창 라이브러리
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navigation, Tag } from '#publicComponents';
import smileIcon from '../../assets/ic_smile.svg';
import { StudyInfo } from '../../components/StudyDetailPage/StudyInfo.jsx';
import { StudyPasswordModal } from '../../components/StudyDetailPage/StudyPasswordModal.jsx';
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

  // 기록표에 표시할 연습용 습관 목록 (DB연결하고 나면 지우겠습니다.)
  const habits = [
    {
      id: 1,
      name: '책 10쪽 읽기',
      records: [true, false, true, false, false, false, false],
    },
    {
      id: 2,
      name: '스트레칭',
      records: [true, true, false, false, false, false, false],
    },
    {
      id: 3,
      name: '물 2L 마시기',
      records: [false, false, false, false, false, false, false],
    },
    {
      id: 4,
      name: '물 3L 마시기',
      records: [false, false, false, false, false, false, false],
    },
    {
      id: 5,
      name: '물 4L 마시기',
      records: [false, false, false, false, false, false, false],
    },
    {
      id: 6,
      name: '물 5L 마시기',
      records: [false, false, false, false, false, false, false],
    },
    {
      id: 7,
      name: '물 6L 마시기',
      records: [false, false, false, false, false, false, false],
    },
    {
      id: 8,
      name: '물 8L 마시기',
      records: [false, false, false, false, false, false, false],
    },
    {
      id: 9,
      name: '물 9L 마시기',
      records: [false, false, false, false, false, false, false],
    },
  ];

  //연습용 이모지 조회 샘플
  const [emojis, setEmojis] = useState([
    // 화면에 표시할 연습용 이모지 반응 목록
    { id: 1, emoji: '👍', count: 3 },
    { id: 2, emoji: '❤️', count: 2 },
  ]);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  //이모지가 있으면 횟수 증가, 없으면 새로추가
  function handleEmojiSelect(emojiData) {
    const selectedEmoji = emojiData.emoji;

    setEmojis((currentEmojis) => {
      const exists = currentEmojis.some((item) => item.emoji === selectedEmoji);

      if (exists) {
        return currentEmojis.map((item) => {
          if (item.emoji === selectedEmoji) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        });
      }

      return [
        ...currentEmojis,
        { id: selectedEmoji, emoji: selectedEmoji, count: 1 },
      ];
    });

    setIsEmojiPickerOpen(false);
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
            <div className={styles.emojiList}>
              {emojis.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.emojiReactionButton}
                  onClick={() => handleEmojiSelect(item)}
                >
                  <Tag emoji={item.emoji} count={item.count} />
                </button>
              ))}

              {/* 이모지 목록 오른쪽 추가버튼 열고 닫힘 기능 */}
              <button
                type="button"
                className={styles.addEmojiButton}
                onClick={() => setIsEmojiPickerOpen((isOpen) => !isOpen)}
              >
                <img src={smileIcon} width={16.125} height={16.125} />
                <span>추가</span>
              </button>

              {isEmojiPickerOpen && (
                <div
                  className={styles.emojiPickerPanel}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      setIsEmojiPickerOpen(false);
                    }
                  }}
                >
                  <EmojiPicker
                    width={306}
                    height={392}
                    emojiStyle="native" //해볼 것 : apple, google, facebook, twitter, native
                    previewConfig={{ showPreview: false }} //해볼 것 : true
                    onEmojiClick={handleEmojiSelect}
                  />
                </div>
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
          <HabitRecordTable habits={habits} />{' '}
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
