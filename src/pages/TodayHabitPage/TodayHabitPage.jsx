import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { habitApi } from '../../api/habitApi.js';
import { habitRecordApi } from '../../api/habitRecordApi.js';
import trashIcon from '../../assets/btn_determinate.png';
import styles from './TodayHabitPage.module.css';
import { Modal } from '#publicComponents';
import { Navigation } from '#publicComponents'

function HabitItem({ habit, setDraft }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event, targetHabit) => {
    if (event.key === 'Enter') {
      setDraft((prev) =>
        prev.map((habit) =>
          habit.id === targetHabit.id ? { ...habit, name: inputValue } : habit,
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
          return <HabitItem key={habit.id} habit={habit} setDraft={setDraft} />;
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

export function TodayHabitPage() {
  const [habits, setHabits] = useState([]);
  const [draft, setDraft] = useState([]);
  const [now, setNow] = useState(new Date());
  const [isHabitEditModalOpen, setIsHabitEditModalOpen] = useState(false);
  let { studyId } = useParams(); // const로 변경
  studyId = "fd1cd21e-c0c5-470f-bbbf-848a2ca2ca19"

  const toggleIsDone = (targetHabit) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === targetHabit.id
          ? { ...habit, isDone: !habit.isDone }
          : habit,
      ),
    );
  };
  // 모달 내에서 습관 추가, 수정, 삭제 및 수정 완료 버튼으로 제출하는 함수
  const handleSubmitEdit = async (draft) => {
    const existingIds = habits.map((habit) => habit.id);
    for (const tempHabit of draft) {
      if (!existingIds.includes(tempHabit.id)) {
        await habitApi.createHabit(studyId, {
          name: tempHabit.name,
        });
      }

      const matchingHabit = habits.find((habit) => habit.id === tempHabit.id);
      if (
        existingIds.includes(tempHabit.id) &&
        matchingHabit.name !== tempHabit.name
      ) {
        await habitApi.updateHabit(studyId, matchingHabit.id, {
          name: tempHabit.name,
        });
      }
    }

    const draftIds = draft.map((tempHabit) => tempHabit.id);
    for (const habit of habits) {
      if (!draftIds.includes(habit.id)) {
        await habitApi.deleteHabit(studyId, habit.id);
      }
    }

    const newData = await habitApi.getHabits(studyId);
    const newHabits = newData.data.list.map((habit) => {
      return { ...habit, isDone: false };
    });
    setHabits(newHabits);
    setDraft([]);
  };

  // 타이머 상태관리 함수
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 스터디 암호 입력시 습관 목록 불러오는 함수
  useEffect(() => {
    const loadHabits = async () => {
      try {
        const habitData = await habitApi.getHabits(studyId);
        const initialHabits = habitData.data.list.map((habits) => {
          return { ...habits, isDone: false };
        });
        setHabits(initialHabits);
      } catch (error) {
        console.error(error);
      }
    };
    loadHabits();
  }, [studyId]);

  return (
    <div className={styles.page}>
      <Navigation />

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

              {habits.length === 0 ? (
                <p>
                  아직 습관이 없어요 <br /> 목록 수정을 눌러 습관을 생성해보세요
                </p>
              ) : (
                <ul>
                  {habits.map((habit) => {
                    return (
                      <li
                        key={habit.id}
                        className={habit.isDone ? styles.isDone : styles['']}
                        onClick={() => toggleIsDone(habit)}
                      >
                        {habit.name}
                      </li>
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
