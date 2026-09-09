import { createStudies, updateStudies, deleteStudies } from '../api/studies';
import { useStudies } from '../hooks/useStudies';

export function TestPage() {
  const { studiesData, isLoading, error, refetch } = useStudies({
    keyword: '테',
  });

  const studies = studiesData?.data ?? [];
  const studyId = studies[0]?.id ?? '';

  const handleTestCreate = async () => {
    try {
      const result = await createStudies({
        name: '테스트 스터디',
        nickname: '이름',
        description: '설명입니다',
        password: '1234',
      });
      console.log('성공!', result);
      refetch();
    } catch (error) {
      console.error('실패:', error);
      console.log('원본 에러 응답:', error.cause?.response?.data);
      console.log('상태 코드:', error.cause?.response?.status);
    }
  };

  const handleUpdateStudies = async () => {
    try {
      const result = await updateStudies(studyId, {
        name: '테스트_수정',
      });
      console.log('성공', result);
      refetch();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteStudy = async (studyId) => {
    try {
      const result = await deleteStudies(studyId);
      console.log('성공', result);
      refetch();
    } catch (error) {
      alert(error.message);
    }
  };

  if (isLoading) return <p>불러오는 중...</p>;
  if (error) return <p>스터디 목록을 불러오지 못했습니다.</p>;

  return (
    <div>
      <button onClick={() => handleTestCreate()}>스터디 생성 테스트</button>
      <button onClick={() => handleUpdateStudies()}>스터디 수정 테스트</button>
      <button onClick={() => handleDeleteStudy(studyId)}>
        스터디 삭제 테스트
      </button>

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
