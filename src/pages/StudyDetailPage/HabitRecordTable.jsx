import emptyIcon from '../../assets/stickers/sticker-inactive.svg';
import completeIcon from '../../assets/stickers/sticker-light-green-100-03.svg';
import styles from './HabitRecordTable.module.css'; // 습관 기록표 전용 스타일을 불러와요.

export function HabitRecordTable({ habits }) {
  return (
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
                <th scope="col" aria-label="습관 이름"></th>
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
                    <td key={dayIndex}>
                      <img
                        className={styles.recordIcon}
                        src={isCompleted ? completeIcon : emptyIcon}
                        width={36}
                        height={36}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
