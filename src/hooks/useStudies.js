import { useState, useEffect, useCallback } from 'react';
import { getStudies } from '../api/studies';

export function useStudies({
  page = 1,
  limit = 6,
  sort = 'desc',
  sortBy = 'point',
  keyword = '',
}) {
  const [studiesData, setStudiesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getStudies({
        page,
        limit,
        sort,
        sortBy,
        keyword,
      });
      setStudiesData(result);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [keyword, limit, page, sort, sortBy]);

  useEffect(() => {
    // eslint-disable-next-line
    fetchStudies();
  }, [fetchStudies]);

  return { studiesData, isLoading, error, refetch: fetchStudies };
}
