import { useEffect } from 'react';

export function PauseWarning({ show, onHide }) {
  // 필요한 거
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(onHide, 3000);
    return () => clearTimeout(timer);
  }, [show, onHide]);

  return <p>집중이 중단되었습니다.</p>;
}
