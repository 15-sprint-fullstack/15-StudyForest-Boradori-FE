import { useState } from 'react';
import { createStudy, getStudies } from '../api/studies';
import { Modal } from '../components/public/Modal.jsx';
import { useLoadMore } from '../hooks/useLoadMore';
import { useStudies } from '../hooks/useStudies';
import { checkAccess, verifyPassword } from '../api/checkAccess.js';

export function TestPage() {
  const limit = 6;
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedStudyId, setSelectedStudyId] = useState(null);
  const [password, setPassword] = useState('');

  async function handleCheckAccess(studyId) {
    try {
      const hasAccess = await checkAccess(studyId);

      if (!hasAccess) {
        openPasswordModal(studyId);
        return;
      }

      // 이미 인증되어 있으면 모달 없이 진행
      alert('인증이 유효합니다. 바로 입장할 수 있어요.');
      // 실제 연결 시 여기서 navigate(...) 실행
    } catch (error) {
      console.error(error);
      alert('인증 상태를 확인하지 못했습니다.');
    }
  }
  function openPasswordModal(studyId) {
    setSelectedStudyId(studyId);
    setPassword('');
    setIsPasswordModalOpen(true);
  }

  function closePasswordModal() {
    setIsPasswordModalOpen(false);
    setSelectedStudyId(null);
    setPassword('');
  }

  // 초기 studies 불러오기
  const { studiesData, isLoading, error, refetch } = useStudies({
    page: 1,
    limit,
  });

  // 초기값과 총 페이지 수 받아오기
  const initialStudies = studiesData?.data ?? [];
  const totalPages = studiesData?.totalPages ?? 1;

  // 여기서 더보기 버튼 눌렀을 때 가져올 것들과 가져와야 하는 것들 정리
  // data / isLoadingMore, hasMore, loadMore
  const {
    data: studies, // 데이터 값 뒤에 추가로 계속 붙음
    isLoadingMore, // spinner 돌아가야 하는 것
    hasMore, // 더보기 버튼 가능한지 안한다 (페이지 초과 방지)
    loadMore, // 로드 함수
  } = useLoadMore({
    initialData: initialStudies,
    totalPages,

    requestPage: async (page) => {
      const result = await getStudies({
        page,
        limit,
      });

      return result.data ?? [];
    },
  });

  const handleTestCreate = async () => {
    try {
      await createStudy({
        name: '테스트 스터디',
        nickname: '이름',
        description: '설명입니다',
        password: '1234',
        background: 'ivory',
      });

      await refetch();
    } catch (error) {
      console.error('생성 실패:', error);
    }
  };

  if (isLoading && studies.length === 0) {
    return <p>처음 6개 불러오는 중...</p>;
  }

  if (error && studies.length === 0) {
    return <p>스터디 목록을 불러오지 못했습니다.</p>;
  }
  async function handleAuthenticate() {
    try {
      await verifyPassword(selectedStudyId, password);

      closePasswordModal();
    } catch (error) {
      const message = error.response?.data?.message;
      alert(message ?? '비밀번호 인증에 실패했습니다.');
    }
  }

  console.log(studies);

  return (
    <div>
      <button type="button" onClick={handleTestCreate}>
        스터디 생성 테스트
      </button>

      <ul>
        {studies.map((study) => (
          <li key={study.id}>
            {study.name}
            <button type="button" onClick={() => handleCheckAccess(study.id)}>
              비밀번호 인증 테스트
            </button>
          </li>
        ))}
      </ul>

      {isLoadingMore && <p>더보기 불러오는 중...</p>}

      {!isLoadingMore && hasMore && (
        <button type="button" onClick={loadMore}>
          더보기
        </button>
      )}

      <Modal isOpen={isPasswordModalOpen}>
        <h2>비밀번호 인증</h2>
        <p>선택한 스터디: {selectedStudyId}</p>
        <label htmlFor="test-study-password">비밀번호</label>
        <input
          id="test-study-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="button" onClick={handleAuthenticate}>
          인증하기
        </button>
        <button type="button" onClick={closePasswordModal}>
          닫기
        </button>
      </Modal>
    </div>
  );
}
