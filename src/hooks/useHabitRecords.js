import { useEffect, useState } from 'react';
import { habitApi } from '../api/habitApi.js';
import { habitRecordApi } from '../api/habitRecordApi.js';
import { buildHabitRows } from '../utils/buildHabitRows.js';
import { getCurrentWeek } from '../utils/habitRecordUtils.js';

/**
 * 1. 이번주 날짜 계산
 * 2. 습관 목록과 완료 기록 조회
 * 3. 두 응답을 합쳐 표의 행으로 저장
 */

// 스터디별 기록표 조회 관리
export function useHabitRecords(studyId) {
  const [habits, setHabits] = useState([]); //가공된 표의 행을 보관
  const [isLoading, setIsLoading] = useState(true); // 조회 중 인지 보관
  const [error, setError] = useState(null); // 조회 오류를 보관

  useEffect(() => {
    let ignore = false;

    async function fetchHabitRows() {
      setIsLoading(true);
      setError(null);
      setHabits([]);

      try {
        const week = getCurrentWeek(); //조회할 월~일 날짜를 만든다

        const [habitResult, recordResult] = await Promise.all([
          habitApi.getHabits(studyId),
          habitRecordApi.getHabitRecords(studyId, week.startDate, week.endDate),
        ]);

        const rows = buildHabitRows(
          habitResult.data.list,
          recordResult.data,
          week.dates,
        );

        if (!ignore) {
          setHabits(rows);
        }
      } catch (error) {
        if (!ignore) {
          setError(error);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchHabitRows();

    return () => {
      ignore = true;
    };
  }, [studyId]);

  return { habits, isLoading, error };
}
