import { useState } from 'react';
import { POINT_TARGET_DURATION } from '../constants/AttentionTimer/AttentionTimer';

export function usePoint() {
  const [point, setPoint] = useState(0);

  const awardPoint = (finalAccumlated) => {
    setPoint(
      (prev) => prev + 3 + Math.floor(finalAccumlated / POINT_TARGET_DURATION),
    );
  };
  return { point, awardPoint };
}
