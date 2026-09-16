import { useEffect, useState } from 'react';
import { isStudyAccessRequired, reportStudyActivity } from '../api/checkAccess';

export function useStudyActivity(studyId, isRunning) {
  const [activityError, setActivityError] = useState('');

  useEffect(() => {
    if (!isRunning) return;
    let cancelled = false;
    let inFlight = false;
    let expired = false;

    async function report() {
      if (cancelled || inFlight || expired) return;
      inFlight = true;
      try {
        await reportStudyActivity(studyId);
        if (!cancelled) setActivityError('');
      } catch (error) {
        if (cancelled) return;
        expired = isStudyAccessRequired(error);
        setActivityError(
          expired
            ? '인증이 만료됐어요. 스터디 상세 페이지에서 다시 인증해 주세요.'
            : '서버에 연결하지 못했어요. 타이머는 계속 진행됩니다.',
        );
      } finally {
        inFlight = false;
      }
    }

    report();
    const interval = setInterval(report, 5 * 60 * 1000);
    const onVisible = () => {
      if (document.visibilityState === 'visible') report();
    };
    window.addEventListener('online', report);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      cancelled = true;
      clearInterval(interval);
      window.removeEventListener('online', report);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [studyId, isRunning]);

  return activityError;
}
