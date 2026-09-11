import { getKoreaDate } from './habitRecordUtils.js';

export function buildHabitRows(habits, habitRecords, dates) {
  const sortedHabits = [...habits].sort((a, b) => {
    const timeDifference = new Date(a.createdAt) - new Date(b.createdAt);
    return timeDifference || a.id.localeCompare(b.id);
  });

  return sortedHabits.map((habit) => {
    const completedDates = habitRecords
      .filter((record) => record.habitId === habit.id)
      .map((record) => getKoreaDate(record.createdAt));

    return {
      rowKey: habit.id,
      name: habit.name,
      records: dates.map((date) => completedDates.includes(date)),
    };
  });
}
