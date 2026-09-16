import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { checkAccess } from '../../api/checkAccess.js';

export function StudyAccessGuard() {
  const { studyId } = useParams();
  const location = useLocation();

  return <AccessCheck key={`${studyId}:${location.key}`} studyId={studyId} />;
}

function AccessCheck({ studyId }) {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    async function verifyAccess() {
      try {
        const hasAccess = await checkAccess(studyId);
        if (!cancelled) setStatus(hasAccess ? 'allowed' : 'denied');
      } catch {
        if (!cancelled) setStatus('error');
      }
    }

    verifyAccess();
    return () => {
      cancelled = true;
    };
  }, [studyId]);

  if (status === 'loading') {
    return <p role="status">접근 권한을 확인하고 있어요.</p>;
  }

  if (status === 'denied') {
    alert('접근 권한이 없습니다.');
    return <Navigate to={`/studies/${studyId}`} replace />;
  }

  if (status === 'error') {
    alert('서버와 연결이 원활하지 않습니다. 다시 시도해주세요.');
    return <Navigate to={`/studies/${studyId}`} replace />;
  }

  return <Outlet />;
}
