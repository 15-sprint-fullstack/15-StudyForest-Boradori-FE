import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, MoveButton, NormalButton } from '#publicComponents';
import { InputContainer } from '#publicComponents';
import { Toast } from '#publicComponents';
import { habitApi } from '../../api/habitApi.js';
import { habitRecordApi } from '../../api/habitRecordApi.js';
import { getStudy } from '../../api/studies.js';
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
      aria-pressed={isChecked}
      role="button"
    >
      {habit.name}
    </li>
  );
}

// 습관 목록 수정 화면에서 임시 습관 목록을 보여주는 컴포넌트
function DraftHabitItem({
  habit,
  draft,
  setDraft,
  isSubmitting,
  editingId,
  setEditingId,
  disabled,
}) {
  const isEditing = editingId === habit.id;
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const validateAndEdit = (inputValue, targetHabit) => {
    if (isSubmitting) return;
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setErrorMessage('습관명을 입력해주세요.');
      return;
    }
    if (trimmed.length > 20) {
      setErrorMessage('습관명은 최대 20자로 입력해주세요.');
      return;
    }
    const isDuplicate = draft
      .filter((habit) => habit.id !== targetHabit.id)
      .map((habit) => habit.name)
      .includes(trimmed);
    if (isDuplicate) {
      setErrorMessage('이미 있는 습관명입니다.');
      return;
    }
    setDraft((prev) =>
      prev.map((habit) =>
        habit.id === targetHabit.id ? { ...habit, name: trimmed } : habit,
      ),
    );
    setErrorMessage('');
    setEditingId(null);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event, targetHabit) => {
    if (event.key === 'Escape') {
      setErrorMessage('');
      setInputValue('');
      setEditingId(null);
      return;
    }
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      validateAndEdit(inputValue, targetHabit);
    }
  };
  const handleInputBlur = (targetHabit) => {
    validateAndEdit(inputValue, targetHabit);
  };
  const handleDelete = (targetHabit) => {
    if (isSubmitting) return;
    setDraft((prev) => prev.filter((habit) => habit.id !== targetHabit.id));
  };

  const handleSpanClick = () => {
    if (disabled) return;
    setEditingId(habit.id);
    setInputValue(habit.name);
  };
  return (
    <li key={habit.id}>
      {isEditing ? (
        <>
          <InputContainer
            value={inputValue}
            className={styles.editInput}
            onChange={handleInputChange}
            onKeyDown={(event) => handleInputKeyDown(event, habit)}
            onBlur={() => handleInputBlur(habit)}
            disabled={isSubmitting}
            aria-label={`${habit.name} 습관명 수정하기`}
          />
          {errorMessage && (
            <Toast className={styles.errorText}>{errorMessage}</Toast>
          )}
          <img
            src={trashIcon}
            onClick={() => handleDelete(habit)}
            alt={`${habit.name} 삭제하기`}
          />
        </>
      ) : (
        <>
          <span
            className={styles.draftSpan}
            onClick={handleSpanClick}
            aria-label="눌러서 수정하기"
          >
            {habit.name}
          </span>
          <img
            src={trashIcon}
            onClick={() => handleDelete(habit)}
            alt={`${habit.name} 삭제하기`}
          />
        </>
      )}
    </li>
  );
}

// 습관 수정 모달 내부
function ModalContent({ draft, setDraft, onClose, onSave, isSubmitting }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const MAX_HABITS = 18;
  const isFull = draft.length >= MAX_HABITS;

  const handleAdd = (newHabit) => {
    setDraft((prev) => [...prev, { id: nanoid(), name: newHabit }]);
    setInputValue('');
  };
  const validateAndAdd = (inputValue) => {
    if (isSubmitting) return;

    const trimmed = inputValue.trim();
    if (!trimmed) {
      setErrorMessage('습관명을 입력해주세요.');
      return;
    }
    if (trimmed.length > 20) {
      setErrorMessage('습관명은 최대 20자로 입력해주세요.');
      return;
    }
    const isDuplicate = draft.map((habit) => habit.name).includes(trimmed);
    if (isDuplicate) {
      setErrorMessage('이미 있는 습관명입니다.');
      return;
    }
    handleAdd(trimmed);
    setIsAdding(false);
  };
  const handleInputChange = (event) => {
    setErrorMessage('');
    setInputValue(event.target.value);
  };
  const handleInputKeyDown = (event) => {
    if (event.key === 'Escape') {
      setErrorMessage('');
      setInputValue('');
      setIsAdding(false);
      return;
    }
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      validateAndAdd(inputValue);
    }
  };
  const handleInputBlur = () => {
    validateAndAdd(inputValue);
  };

  return (
    <div
      className={`${styles.habitEditModal} ${isSubmitting ? styles.disabled : ''}`}
    >
      {draft.length === 0 ? (
        <p className={styles.editInfo}>
          (+) 버튼을 눌러 습관을 추가해보세요!
          <br />
          습관을 모두 수정했다면 수정완료를 눌러 제출해주세요.
        </p>
      ) : (
        <ul className={styles.draftList}>
          {draft.map((habit) => {
            return (
              <DraftHabitItem
                key={habit.id}
                habit={habit}
                draft={draft}
                setDraft={setDraft}
                isSubmitting={isSubmitting}
                editingId={editingId}
                setEditingId={setEditingId}
                disabled={
                  isSubmitting ||
                  isAdding ||
                  (editingId !== null && editingId !== habit.id)
                }
              />
            );
          })}
        </ul>
      )}

      {isAdding ? (
        <>
          <InputContainer
            placeholder={'여기에 추가할 습관을 입력하세요.(입력 후 엔터)'}
            value={inputValue}
            onBlur={handleInputBlur}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            disabled={isSubmitting}
            aria-label="새 습관 이름 입력"
          />
          {errorMessage && (
            <Toast className={styles.errorText}>{errorMessage}</Toast>
          )}
        </>
      ) : (
        <>
          <button
            className={styles.addButton}
            type="button"
            aria-label="습관 추가하기"
            disabled={isFull || isSubmitting || editingId !== null}
            onClick={() => {
              setIsAdding(true);
            }}
          >
            +
          </button>
          {isFull ? (
            <Toast className={styles.noticeText}>습관이 가득 찼습니다!</Toast>
          ) : null}
        </>
      )}

      <NormalButton
        className={styles.cancelButton}
        isClick={onClose}
        disabled={isSubmitting}
      >
        취소
      </NormalButton>
      <NormalButton
        className={styles.submitButton}
        isClick={onSave}
        disabled={isSubmitting}
      >
        수정 완료
      </NormalButton>
    </div>
  );
}

// 최상위 컴포넌트
export function TodayHabitPage() {
  const { studyId } = useParams();
  const [study, setStudy] = useState(null);
  const [habits, setHabits] = useState([]);
  const [habitRecords, setHabitRecords] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [now, setNow] = useState(new Date());
  const [today, setToday] = useState(new Date().toLocaleDateString('en-CA'));
  const [isHabitEditModalOpen, setIsHabitEditModalOpen] = useState(false);
  const [draft, setDraft] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 수정 완료 버튼 누르면 API 요청을 보내는 함수
  const handleSubmitEdit = async (draft) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const existingIds = habits.map((habit) => habit.id);
      // 기존 목록에는 아이디가 있지만 수정 목록에 없으면 => 습관 삭제
      const draftIds = draft.map((tempHabit) => tempHabit.id);
      for (const habit of habits) {
        if (!draftIds.includes(habit.id)) {
          await habitApi.deleteHabit(studyId, habit.id);
        }
      }

      for (const tempHabit of draft) {
        // 임시 목록의 아이디가 기존 목록에 있지만 습관명이 다르면 => 습관명 수정, 습관 기록명도 수정
        const matchingHabit = habits.find((habit) => habit.id === tempHabit.id);
        if (
          existingIds.includes(tempHabit.id) &&
          matchingHabit.name !== tempHabit.name
        ) {
          await Promise.all([
            habitApi.updateHabit(studyId, matchingHabit.id, {
              name: tempHabit.name,
            }),
            habitRecordApi.updateHabitRecord(matchingHabit.id, {
              name: tempHabit.name,
            }),
          ]);
        }
        // 임시 목록의 아이디가 기존 목록에 없으면 => 습관 생성
        if (!existingIds.includes(tempHabit.id)) {
          await habitApi.createHabit(studyId, {
            name: tempHabit.name,
          });
        }
      }

      // 제출 완료 후 새로운 습관 목록을 받아 표시, 수정 목록은 빈 배열로 초기화
      const newData = await habitApi.getHabits(studyId);
      const newHabits = newData.data.list;
      const sortedNewHabits = newHabits.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );
      setHabits(sortedNewHabits);
      setDraft([]);
      setIsHabitEditModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
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
    const loadStudy = async () => {
      try {
        const study = await getStudy(studyId);
        setStudy(study);
        console.log('닉네임:', study.nickname, '스터디명:', study.name);
      } catch (error) {
        console.error(error);
      }
    };
    const loadHabits = async () => {
      try {
        const habitData = await habitApi.getHabits(studyId);
        const initialHabits = habitData.data.list;
        const sortedHabits = initialHabits.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
        console.log('습관 목록:', sortedHabits);
        setHabits(sortedHabits);
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
        setHabitRecords(initialHabitRecords);
      } catch (error) {
        console.error(error);
      }
    };
    const loadAll = async () => {
      setIsLoaded(false);
      await Promise.all([loadStudy(), loadHabits(), loadHabitRecords()]);
      setIsLoaded(true);
    };
    loadAll();
  }, [studyId, today]);

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <article className={styles.panel}>
          <div className={styles.headingRow}>
            {isLoaded ? (
              <h1>
                {study
                  ? `${study.nickname}의 ${study.name}`
                  : '해당하는 스터디가 없습니다. 💦'}
              </h1>
            ) : (
              <p>불러오는 중...</p>
            )}
            <div className={styles.actions}>
              <MoveButton route={`/studies/${studyId}/focus`} type="button">
                오늘의 집중
              </MoveButton>
              <MoveButton route={'/'} type="button">
                홈
              </MoveButton>
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
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
}
