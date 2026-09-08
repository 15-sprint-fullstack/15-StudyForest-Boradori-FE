import { useState } from 'react';
import { Navigation, MoveButton, Tag } from '#publicComponents'
import smileIcon from '../../assets/ic_smile.svg';
import {StudyPasswordModal} from '../../components/StudyDetailPage/StudyPasswordModal.jsx';
import { HabitRecordTable } from './HabitRecordTable.jsx';
import styles from './StudyDetailPage.module.css';
import EmojiPicker from 'emoji-picker-react' // 리액트 이모지 선택창 라이브러리


export function StudyDetailPage() {
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

  //연습용 이모지 조회 샘플
  const [emojis, setEmojis] = useState([
    // 화면에 표시할 연습용 이모지 반응 목록
    { id: 1, emoji: '👍', count: 3 },
    { id: 2, emoji: '❤️', count: 2 },
  ]);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  
  //이모지가 있으면 횟수 증가, 없으면 새로추가
  function handleEmojiSelect(emojiData) {
    const selectedEmoji = emojiData.emoji;

    setEmojis((currentEmojis)=>{
      const exists = currentEmojis.some((item)=> item.emoji === selectedEmoji)
    
      if(exists) {
        return currentEmojis.map((item)=>{
          if (item.emoji === selectedEmoji) {
            return {...item, count: item.count +1}
          }
          return item;
        })
      }

      return [
        ...currentEmojis,
        {id: selectedEmoji, emoji: selectedEmoji, count: 1}
      ]
    })
    
    setIsEmojiPickerOpen(false)
  }

  



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
      <Navigation />

      <main className={styles.shell}>
        <article className={styles.panel}>
          <div className={styles.topRow}>
            <div className={styles.emojiList}>
              {emojis.map((item) => (
                <button 
                  key={item.id}
                  type="button"
                  className={styles.emojiReactionButton}
                  onClick={()=> handleEmojiSelect(item)}
                  >
                    <Tag emoji={item.emoji} count={item.count}/>
                  </button>
              ))}

              {/* 이모지 목록 오른쪽 추가버튼 열고 닫힘 기능 */}
              <button 
                type="button"
                className={styles.addEmojiButton}
                onClick={()=> setIsEmojiPickerOpen((isOpen)=> !isOpen)}>
                <img src={smileIcon} width={16.125} height={16.125}/>
                <span>추가</span>
                </button>
              
              {isEmojiPickerOpen && (
                <div
                  className={styles.emojiPickerPanel}
                  onKeyDown={(event)=> {
                    if(event.key === 'Escape') {
                      setIsEmojiPickerOpen(false);
                    }
                  }}
                  >
                    <EmojiPicker
                      width={306}
                      height={392}
                      emojiStyle='native' //해볼 것 : apple, google, facebook, twitter, native
                      previewConfig={{showPreview:false}} //해볼 것 : true
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

          <div className={styles.headingRow}>
            <h1>
              {study.nickname}의 {study.name}
            </h1>
            <div className={styles.moveActions}>
              <div
                className={styles.habitButton}
                onClickCapture={(event)=>{event.preventDefault()
                  openPasswordModal('habit')
                }}>
                  {/* 라우트 연결보류 */}
                <MoveButton route="/habit">오늘의 습관</MoveButton>               
              </div>

              <div
                className={styles.focusButton}
                onClickCapture={(event)=>{
                  event.preventDefault()
                  openPasswordModal('focus')
                }}>
                  {/* 라우트 연결보류 */}
                  <MoveButton route="/focus">오늘의 집중</MoveButton> 
                
              </div>
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

          <HabitRecordTable habits={habits} />

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

