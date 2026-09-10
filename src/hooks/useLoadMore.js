import { useState } from 'react';

export function useLoadMore({ initialData = [], totalPages = 1, requestPage }) {
  const [page, setPage] = useState(1);
  const [additionalData, setAdditionalData] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const data = Array.from(
    new Map(
      [...initialData, ...additionalData].map((study) => [study.id, study]),
    ).values(),
  );

  // load 하는 거
  const loadMore = async () => {
    if (isLoadingMore) return;
    const nextPage = page + 1;
    if (nextPage > totalPages) return;
    setIsLoadingMore(true);
    // 값 불러오기
    try {
      const newData = await requestPage(nextPage); // getStudies 겠죠
      console.log(newData);
      setAdditionalData((prev) => [...prev, ...newData]);
      setPage(nextPage);
    } catch (error) {
      console.log(error);
      alert('추가 스터디 조회에 실패하였습니다');
    } finally {
      setIsLoadingMore(false);
    }
  };

  return {
    data,
    page,
    isLoadingMore,
    hasMore: page < totalPages,
    loadMore,
  };
}
