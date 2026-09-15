import { useEffect, useState } from 'react';
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { checkAccess } from '../api/checkAccess.js';

export function StudyAccessGuard() {
  const { studyId } = useParams();
  const location = useLocation();

  return <AccessCheck key={`${studyId}:${location.key}`} studyId={studyId} />;
}

function AccessCheck({ studyId }) {
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);

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
  }, [studyId, attempt]);

  if (status === 'loading') {
    return <p role="status">접근 권한을 확인하고 있어요.</p>;
  }

  if (status === 'denied') {
    alert('접근 권한이 없습니다.');
    return <Navigate to={`/studies/${studyId}`} replace />;
  }

  if (status === 'error') {
    return (
      <div>
        <p role="alert">접근 권한을 확인하지 못했습니다. 다시 시도해 주세요.</p>
        <button
          type="button"
          onClick={() => {
            setStatus('loading');
            setAttempt((current) => current + 1);
          }}
        >
          다시 시도
        </button>
        <Link to={`/studies/${studyId}`}>스터디로 돌아가기</Link>
      </div>
    );
  }

  return <Outlet />;
}
