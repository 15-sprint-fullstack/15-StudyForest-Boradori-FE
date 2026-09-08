import { useState, useEffect } from 'react';
import { getStudy } from '../api/studies';

export function useStudy(studyId) {
  const [studyData, setStudyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studyId) return;

    let ignore = false;
    const fetchStudy = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getStudy(studyId);
        if (!ignore) setStudyData(result.data);
      } catch (error) {
        if (!ignore) setError(error);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchStudy();
    return () => {
      ignore = true;
    };
  }, [studyId]);

  return { studyData, isLoading, error };
}
