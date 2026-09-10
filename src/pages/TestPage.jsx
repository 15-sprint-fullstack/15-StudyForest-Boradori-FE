import { useState } from 'react';
import {
  createStudy,
  updateStudy,
  deleteStudy,
  getStudies,
} from '../api/studies';
import { useStudies } from '../hooks/useStudies';

export function TestPage() {
  const [page, setPage] = useState(1);
  const [additionalStudies, setAdditionalStudies] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const limit = 6;

  // 최초 6개만 담당
  const { studiesData, isLoading, error, refetch } = useStudies({
    page: 1,
    limit,
  });

  const initialStudies = studiesData?.data ?? [];

  // 최초 데이터 + 더보기 데이터
  const studies = [...initialStudies, ...additionalStudies];

  const handleLoadMore = async () => {
    if (isLoadingMore) return;

    const nextPage = page + 1;

    setIsLoadingMore(true);

    try {
      const result = await getStudies({
        page: nextPage,
        limit,
      });

      setAdditionalStudies((previousStudies) => [
        ...previousStudies,
        ...(result.data ?? []),
      ]);

      setPage(nextPage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleTestCreate = async () => {
    try {
      const result = await createStudy({
        name: '테스트 스터디',
        nickname: '이름',
        description: '설명입니다',
        password: '1234',
        background: 'ivory',
      });
      console.log('성공!', result);
      refetch();
    } catch (error) {
      console.error('실패:', error);
      console.log('원본 에러 응답:', error.cause?.response?.data);
      console.log('상태 코드:', error.cause?.response?.status);
    }
  };

  // const handleUpdateStudies = async () => {
  //   try {
  //     const result = await updateStudy(studyId, {
  //       name: '테스트_수정',
  //     });
  //     console.log('성공', result);
  //     refetch();
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  // const handleDeleteStudy = async (studyId) => {
  //   try {
  //     const result = await deleteStudy(studyId);
  //     console.log('성공', result);
  //     refetch();
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  if (isLoading) {
    return <p>처음 6개 불러오는 중...</p>;
  }

  if (error) {
    return <p>스터디 목록을 불러오지 못했습니다.</p>;
  }

  return (
    <div>
      <button onClick={() => handleTestCreate()}>스터디 생성 테스트</button>
      {/* <button onClick={() => handleUpdateStudies()}>스터디 수정 테스트</button>
      <button onClick={() => handleDeleteStudy(studyId)}>
        스터디 삭제 테스트
      </button> */}

      <div>
        <ul>
          {studies.map((study) => (
            <li key={study.id}>{study.name}</li>
          ))}
        </ul>

        {isLoadingMore && <p>더보기 불러오는 중...</p>}
        {!isLoadingMore && (
          <button type="button" onClick={handleLoadMore}>
            더보기
          </button>
        )}
      </div>
    </div>
  );
}
