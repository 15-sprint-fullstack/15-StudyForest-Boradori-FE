import { useState, useEffect } from 'react';
import { POINT_TARGET_DURATION } from '../constants/AttentionTimer';
import { getStudy } from '../api/studies';

export function usePoint(studyId) {
  const [point, setPoint] = useState(0);
  const [gainPoint, setGainPoint] = useState(0);
  const [showGainPoint, setShowGainPoint] = useState(false);

  const awardPoint = (finalAccumlated) => {
    const gained = 3 + Math.floor(finalAccumlated / POINT_TARGET_DURATION);
    setGainPoint(gained);
    setPoint((prev) => prev + gained);
    setShowGainPoint(true);
  };

  useEffect(() => {
    if (!showGainPoint) return;
    const timer = setTimeout(() => setShowGainPoint(false), 3000);
    return () => clearTimeout(timer);
  }, [showGainPoint]);

  return { point, awardPoint, gainPoint, showGainPoint };
}
