import { useState, useEffect } from 'react';
import { updateStudy } from '../api/studies';
import { POINT_TARGET_DURATION } from '../constants/AttentionTimer';

export function usePoint(studyId, currentPoint, onPointChange) {
  const [gainPoint, setGainPoint] = useState(0);
  const [showGainPoint, setShowGainPoint] = useState(false);

  const awardPoint = async (finalAccumlated) => {
    if (finalAccumlated < 1 * 60 * 1000) {
      console.log('시간 안지남');
      return;
    }
    const gained = 3 + Math.floor(finalAccumlated / POINT_TARGET_DURATION);
    const newPoint = currentPoint + gained;

    try {
      await updateStudy(studyId, { point: newPoint });
      onPointChange(newPoint);
      setGainPoint(gained);
      setShowGainPoint(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!showGainPoint) return;
    const timer = setTimeout(() => setShowGainPoint(false), 3000);
    return () => clearTimeout(timer);
  }, [showGainPoint]);

  return { awardPoint, gainPoint, showGainPoint };
}
