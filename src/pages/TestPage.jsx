import { useState, useEffect } from 'react';
import {
  getStudies,
  createStudies,
  updateStudies,
  deleteStudies,
} from '../api/studies';
export function TestPage() {
  const [studiesData, setStudiesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleTestCreate = async () => {
    try {
      const result = await createStudies({
        name: '테스트 스터디',
        nickname: '이름',
        description: '설명입니다',
        password: '1234',
        // 실제 API가 요구하는 필드에 맞게 수정 (nickname, content 등)
      });
      console.log('성공!', result);
    } catch (error) {
      console.error('실패:', error);
      console.log('원본 에러 응답:', error.cause?.response?.data);
      console.log('상태 코드:', error.cause?.response?.status);
    }
  };

  const handleUpdateStudies = async () => {
    const result = await updateStudies(studyId, {
      name: '테스트_수정',
    });
    console.log('성공', result);
  };

  const handleDeleteStudy = async () => {
    try {
      const result = await deleteStudies('0');
      console.log('성공', result);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const result = await getStudies({
          page: 1,
          limit: 10,
          sort: 'asc',
          sortBy: 'point',
          keyword: '테',
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
  }, []);

  if (isLoading) return <p>불러오는 중...</p>;
  if (error) return <p>스터디 목록을 불러오지 못했습니다.</p>;
  const studies = studiesData?.data ?? [];
  const studyId = studies[0]?.id ?? '';
  return (
    <div>
      <button onClick={handleTestCreate}>스터디 생성 테스트</button>
      <button onClick={handleUpdateStudies}>스터디 수정 테스트</button>
      <button onClick={handleDeleteStudy}>스터디 삭제 테스트</button>

      <div>
        <ul>
          {studies.map((study) => (
            <li key={study.id}>{study.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
