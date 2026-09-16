import { useEffect, useState } from 'react';
import { getStudy } from '../../api/studies';
import { getRecentStudyIds } from '../../utils/recent-studies';
import style from './RecentStudyList.module.css';
import StudyCard from './StudyCard';

const DISPLAY_COUNT = 3;

const RecentStudyList = () => {
  const [recentStudies, setRecentStudies] = useState([]);
  const [isLoading, setIsLoading] = useState(
    () => getRecentStudyIds().length > 0,
  );

  useEffect(() => {
    const recentIds = getRecentStudyIds();
    if (recentIds.length === 0) {
      return;
    }

    /* Promise.allSettled
    Promise.all()같은 경우엔 하나라도 실패하면 전체가 즉시 거부가 되어서 다른 성공 결과까지 놓치게 되는데
    Promise.allSettled은 하나가 실패해도 전체가 멈추지 않고 나머지는 보여준다고 합니다.

    ex:) 조회한 스터디중 그 하나를 삭제했을때 Promise.all을 사용하면 id 하나 때문에 섹션 자체가 텅 비어지는 상황이 일어남
    */
    const fetchRecentStudies = async () => {
      const results = await Promise.allSettled(
        recentIds.map((id) => getStudy(id)),
      );
      const studies = results
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value)
        .slice(0, DISPLAY_COUNT);
      setRecentStudies(studies);
      setIsLoading(false);
    };

    fetchRecentStudies();
  }, []);

  if (isLoading) {
    return null; // 원하면 로딩 UI로 교체
  }

  return (
    <section className={style.section}>
      <h3 className={style.title}>최근 조회한 스터디</h3>
      {recentStudies.length === 0 ? (
        <p className={style.empty}>아직 조회한 스터디가 없어요</p>
      ) : (
        <div className={style.list}>
          {recentStudies.map((item) => (
            <StudyCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentStudyList;
