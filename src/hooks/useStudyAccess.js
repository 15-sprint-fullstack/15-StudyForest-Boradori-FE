// 모달 열려야 하는지 닫혀야 하는지
// 로딩 - 인증 관련해서 되는지
// 에러 관련

import { useRef, useState } from 'react';
import { checkAccess, verifyPassword } from '../api/checkAccess';

// 인증 필요한지 여부 판단하고
// 인증 필요하다 하면 모달창 true 하고, 저거 Post 로 하기

export function useStudyAccess(studyId) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccessLoading, setIsAccessLoading] = useState(false);
  const [accessError, setAccessError] = useState('');

  // navigate 같은 경우 인증 성공 여부에 따라서 실행 여부가 달라짐
  // 이를 저장해놓는 형태
  const pendingAction = useRef(null);

  // 인증 필요한지 안 한지
  async function requireAccess(onSuccess) {
    setIsAccessLoading(true);
    setAccessError('');

    try {
      const hasAccess = await checkAccess(studyId);

      // 인증 되어 있다하면 이동하게 하기
      if (hasAccess) {
        await onSuccess();
        return;
      }

      // 차후에 있을 비밀번호 로그인 관련해서 성공하면 pendingAction 실행하게 넣어두기
      pendingAction.current = onSuccess;
      setIsModalOpen(true);
    } catch {
      setAccessError('인증 상태를 확인하지 못했습니다');
    } finally {
      setIsAccessLoading(false);
    }
  }

  // 이후 비밀번호 모달창 뜨면서 비밀번호 인증하기
  async function authPassword(password) {
    setIsAccessLoading(true);
    setAccessError('');

    try {
      await verifyPassword(studyId, password);
      const hasAccess = await checkAccess(studyId);

      if (!hasAccess) {
        setAccessError('세션 확인에 실패했습니다. 다시 시도해 주세요');
        return;
      }

      const action = pendingAction.current;
      closeModal();
      await action?.();
    } catch (error) {
      setAccessError(
        error.response?.data?.message ?? '비밀번호 검증에 실패했습니다',
      );
    } finally {
      setIsAccessLoading(false);
    }
  }

  function closeModal() {
    pendingAction.current = null;
    setIsModalOpen(false);
    setAccessError('');
  }

  return {
    isModalOpen,
    isAccessLoading,
    accessError,
    requireAccess,
    authPassword,
    closeModal,
  };
}
