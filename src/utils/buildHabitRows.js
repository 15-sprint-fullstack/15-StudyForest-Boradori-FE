import { getKoreaDate } from './habitRecordUtils.js';

function makeWeeklyRecords(records, dates, lastDate = null) {
  const completedDates = records.map((record) =>
    getKoreaDate(record.createdAt),
  );

  return dates.map((date) => {
    if (lastDate && date > lastDate) return null;
    return completedDates.includes(date);
  });
}

export function buildHabitRows(habits, habitRecords, dates) {
  const sortedHabits = [...habits].sort((a, b) => {
    const timeDifference = new Date(a.createdAt) - new Date(b.createdAt);
    return timeDifference || a.id.localeCompare(b.id);
  });

  const activeRows = sortedHabits.map((habit) => {
    const matchedRecords = habitRecords.filter(
      (record) =>
        record.habitId === habit.id || // 현재 습관의 기록을 가져와요.
        (record.habitId === null && record.habitName === habit.name), // 같은 이름의 삭제된 기록도 합쳐요.
    );

    return {
      rowKey: habit.id,
      name: habit.name,
      sortDate: habit.createdAt,
      records: makeWeeklyRecords(matchedRecords, dates),
    };
  });

  const deletedRecords = habitRecords.filter(
    (record) => record.habitId === null,
  );

  const deletedNames = [
    ...new Set(
      deletedRecords.map((record) => record.habitName).filter(Boolean),
    ),
  ];

  const deletedRows = deletedNames
    .filter((habitName) => !habits.some((habit) => habit.name === habitName)) // 현재 습관과 같은 이름은 별도 행으로 만들지 않아요.
    .map((habitName) => {
      const matchedRecords = deletedRecords.filter(
        (record) => record.habitName === habitName,
      );

      const completedDates = matchedRecords.map((record) =>
        getKoreaDate(record.createdAt),
      );

      const lastCheckedDate = [...completedDates].sort().at(-1);

      return {
        rowKey: `deleted-${habitName}`,
        name: habitName,
        sortDate: Math.min(
          ...matchedRecords.map((record) =>
            new Date(record.createdAt).getTime(),
          ),
        ),
        records: makeWeeklyRecords(matchedRecords, dates, lastCheckedDate),
      };
    });

  return [...activeRows, ...deletedRows].sort((a, b) => {
    const difference =
      new Date(a.sortDate).getTime() - new Date(b.sortDate).getTime();
    return difference || a.rowKey.localeCompare(b.rowKey);
  });
}
