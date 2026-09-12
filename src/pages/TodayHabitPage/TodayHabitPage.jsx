import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '#publicComponents';
import { habitApi } from '../../api/habitApi.js';
import { habitRecordApi } from '../../api/habitRecordApi.js';
import trashIcon from '../../assets/btn_determinate.png';
import styles from './TodayHabitPage.module.css';

// 오늘의 습관 목록을 보여주는 컴포넌트
function HabitItem({ studyId, today, habit, habitRecords }) {
  const checkedHabitIds = habitRecords.map((habitRecord) => {
    return habitRecord.habitId;
  });

  const [isChecked, setIsChecked] = useState(
    checkedHabitIds.includes(habit.id),
  );
  const [isCreatingHabitRecord, setIsCreatingHabitRecord] = useState(false);

  const toggleIsChecked = async (targetHabit) => {
    if (isCreatingHabitRecord) return;
    setIsCreatingHabitRecord(true);
    try {
      if (isChecked) {
        console.log(`완료한 습관목록에 "${targetHabit.name}"이(가) 있습니다.`);
        await habitRecordApi.deleteHabitRecord(studyId, habit.id, today, today);
        setIsChecked(false);
        console.log(
          `완료한 습관목록에서 "${targetHabit.name}"을(를) 제거하였습니다.`,
        );
        return;
      }

      if (!isChecked) {
        console.log(`완료한 습관목록에 "${targetHabit.name}"이(가) 없습니다.`);
        await habitRecordApi.createHabitRecord(studyId, habit.id);
        setIsChecked(true);
        console.log(
          `완료한 습관목록에 "${targetHabit.name}"을(를) 추가하였습니다.`,
        );
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingHabitRecord(false);
    }
  };

  return (
    <li
      className={isChecked ? styles.isChecked : undefined}
      onClick={() => toggleIsChecked(habit)}
    >
      {habit.name}
    </li>
  );
}

// 습관 목록 수정 화면에서 임시 습관 목록을 보여주는 컴포넌트
function DraftHabitItem({ habit, setDraft }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event, targetHabit) => {
    if (event.key === 'Enter') {
      setDraft((prev) =>
        prev.map((habit) =>
          habit.id === targetHabit.id
            ? { ...habit, name: event.target.value }
            : habit,
        ),
      );
      setIsEditing(false);
    }
  };
  const handleInputBlur = (targetHabit) => {
    setDraft((prev) =>
      prev.map((habit) =>
        habit.id === targetHabit.id ? { ...habit, name: inputValue } : habit,
      ),
    );
    setIsEditing(false);
  };
  const handleDelete = (targetHabit) => {
    setDraft((prev) => prev.filter((habit) => habit.id !== targetHabit.id));
  };

  const handleSpanClick = () => {
    setIsEditing(true);
    setInputValue(habit.name);
  };
  return (
    <li key={habit.id}>
      {isEditing ? (
        <>
          <input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(event) => handleInputKeyDown(event, habit)}
            onBlur={() => handleInputBlur(habit)}
          />
          <img src={trashIcon} onClick={() => handleDelete(habit)} alt="삭제" />
        </>
      ) : (
        <>
          <span onClick={handleSpanClick}>{habit.name}</span>
          <img src={trashIcon} onClick={() => handleDelete(habit)} alt="삭제" />
        </>
      )}
    </li>
  );
}

// 습관 수정 모달 내부
function ModalContent({ draft, setDraft, onClose, onSave }) {
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (newHabit) => {
    setDraft((prev) => [...prev, { id: nanoid(), name: newHabit }]);
    setInputValue('');
  };
  const handleInputBlur = () => {
    handleAdd(inputValue);
    setIsAdding(false);
  };
  const handleInputChange = (event) => {
    const text = event.target.value;
    setInputValue(text);
  };
  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAdd(inputValue);
      setIsAdding(false);
    }
  };

  return (
    <>
      <ul>
        {draft.map((habit) => {
          return (
            <DraftHabitItem key={habit.id} habit={habit} setDraft={setDraft} />
          );
        })}
      </ul>
      {isAdding ? (
        <input
          value={inputValue}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsAdding(true);
          }}
        >
          +
        </button>
      )}

      <button onClick={onClose}>취소</button>
      <button onClick={onSave}>수정 완료</button>
    </>
  );
}

// 최상위 컴포넌트
export function TodayHabitPage() {
  const [habits, setHabits] = useState([]);
  const [habitRecords, setHabitRecords] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [now, setNow] = useState(new Date());
  const [today, setToday] = useState(new Date().toLocaleDateString('en-CA'));
  const [isHabitEditModalOpen, setIsHabitEditModalOpen] = useState(false);
  const [draft, setDraft] = useState([]);
  const { studyId } = useParams();

  // 수정 완료 버튼 누르면 API 요청을 보내는 함수
  const handleSubmitEdit = async (draft) => {
    try {
      const existingIds = habits.map((habit) => habit.id);
      for (const tempHabit of draft) {
        // 임시 목록의 아이디가 기존 목록에 없으면 => 습관 생성
        if (!existingIds.includes(tempHabit.id)) {
          await habitApi.createHabit(studyId, {
            name: tempHabit.name,
          });
        }
        // 임시 목록의 아이디가 기존 목록에 있지만 습관명이 다르면 => 습관명 수정, 습관 기록명도 수정
        const matchingHabit = habits.find((habit) => habit.id === tempHabit.id);
        if (
          existingIds.includes(tempHabit.id) &&
          matchingHabit.name !== tempHabit.name
        ) {
          await habitApi.updateHabit(studyId, matchingHabit.id, {
            name: tempHabit.name,
          });
          await habitRecordApi.updateHabitRecord(matchingHabit.id, {
            name: tempHabit.name,
          });
        }
      }

      // 기존 목록에는 아이디가 있지만 수정 목록에 없으면 => 습관 삭제
      const draftIds = draft.map((tempHabit) => tempHabit.id);
      for (const habit of habits) {
        if (!draftIds.includes(habit.id)) {
          await habitApi.deleteHabit(studyId, habit.id);
        }
      }

      // 제출 완료 후 새로운 습관 목록을 받아 표시, 수정 목록은 빈 배열로 초기화
      const newData = await habitApi.getHabits(studyId);
      const newHabits = newData.data.list;
      setHabits(newHabits);
      setDraft([]);
      setIsHabitEditModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // 타이머 상태관리 함수(초 단위 감지) -> 리팩토링시 분리 예정
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 자정이 넘어가면 habitRecord 다시 불러오기(분 단위 감지) -> 리팩토링시 분리 예정
  useEffect(() => {
    const dateChecker = setInterval(() => {
      setToday(new Date().toLocaleDateString('en-CA'));
    }, 1000 * 60);
    return () => {
      clearInterval(dateChecker);
    };
  }, []);

  // 스터디 암호 입력시 습관 목록 불러오는 함수
  useEffect(() => {
    const loadHabits = async () => {
      try {
        const habitData = await habitApi.getHabits(studyId);
        const initialHabits = habitData.data.list;
        console.log('initialHabits', initialHabits);
        setHabits(initialHabits);
      } catch (error) {
        console.error(error);
      }
    };
    const loadHabitRecords = async () => {
      try {
        const habitRecordData = await habitRecordApi.getHabitRecords(
          studyId,
          today,
          today,
        );
        const initialHabitRecords = habitRecordData.data;
        console.log('initialHabitRecords', initialHabitRecords);
        setHabitRecords(initialHabitRecords);
      } catch (error) {
        console.error(error);
      }
    };
    const loadAll = async () => {
      setIsLoaded(false);
      await Promise.all([loadHabits(), loadHabitRecords()]);
      setIsLoaded(true);
    };
    loadAll();
  }, [studyId, today]);

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <article className={styles.panel}>
          <div className={styles.headingRow}>
            <h1>연우의 개발공장</h1>
            <div className={styles.actions}>
              <button type="button">오늘의 집중</button>
              <button type="button">홈</button>
            </div>
          </div>

          <div className={styles.timeWrap}>
            <span className={styles.timeLabel}>현재 시간</span>
            <span className={styles.timeBadge}>{now.toLocaleString()}</span>
          </div>

          <section>
            <div className={styles.habitList}>
              <div className={styles.listHeadingRow}>
                <h2>오늘의 습관</h2>
                <button
                  type="button"
                  onClick={() => {
                    setIsHabitEditModalOpen(true);
                    setDraft(habits);
                  }}
                >
                  목록 수정
                </button>
              </div>

              {!isLoaded ? (
                <p>불러오는 중...</p>
              ) : habits.length === 0 ? (
                <p>
                  아직 습관이 없어요 <br /> 목록 수정을 눌러 습관을 생성해보세요
                </p>
              ) : (
                <ul>
                  {habits.map((habit) => {
                    return (
                      <HabitItem
                        key={`${habit.id}@${today}`} // 키 값으로 `@${today}`를 추가한 이유: 자정이 지나면 key값이 바뀌면 isChecked 상태를 초기화시키는 간단한 방법(Claude 아이디어)
                        today={today}
                        habit={habit}
                        habitRecords={habitRecords}
                        studyId={studyId}
                      />
                    );
                  })}
                </ul>
              )}
            </div>
          </section>
        </article>
      </main>
      <Modal
        isOpen={isHabitEditModalOpen}
        onClose={() => {
          setIsHabitEditModalOpen(false);
        }}
      >
        <h3>습관 목록</h3>
        <ModalContent
          draft={draft}
          setDraft={setDraft}
          onClose={() => setIsHabitEditModalOpen(false)}
          onSave={() => handleSubmitEdit(draft)}
        />
      </Modal>
    </div>
  );
}
