//임시 훅 입니다.
import { useState, useEffect } from 'react';
import { getStudy } from '../api/study1.js'

export function useStudy(studyId) {
  const [study, setStudy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchStudy = async () => {
      setIsLoading(true);
      setError(null);
      setStudy(null);

      try {
        const result = await getStudy(studyId);

        if (!ignore) {
          setStudy(result);
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
    };

    fetchStudy();

    return () => {
      ignore = true;
    };
  }, [studyId]);

  return { study, isLoading, error };
}
