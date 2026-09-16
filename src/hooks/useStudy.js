import { useState, useEffect } from 'react';
import { getStudy } from '../api/studies.js';
import { addRecentStudyId } from '../utils/recent-studies.js';

export function useStudy(studyId) {
  const [study, setStudy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studyId) return;

    let ignore = false;

    const fetchStudy = async () => {
      setIsLoading(true);
      setError(null);
      setStudy(null);

      try {
        const result = await getStudy(studyId);

        if (!ignore) {
          setStudy(result);
          addRecentStudyId(studyId);
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

  return {
    study: studyId ? study : null,
    isLoading: studyId ? isLoading : false,
    error: studyId ? error : null,
  };
}
