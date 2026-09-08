import { useState, useEffect } from 'react';
import { getStudies } from '../api/studies';

export function useStudies({
  page = 1,
  limit = 6,
  sort = 'asc',
  sortBy = 'point',
  keyword = '',
}) {
  const [studiesData, setStudiesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudies = async () => {
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
    };

    fetchStudies();
  }, [keyword, limit, page, sort, sortBy]);

  return { studiesData, isLoading, error };
}
