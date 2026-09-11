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
      (record) => record.habitId === habit.id,
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

  const deletedRows = deletedNames.map((habitName) => {
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
        ...matchedRecords.map((record) => new Date(record.createdAt).getTime()),
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
