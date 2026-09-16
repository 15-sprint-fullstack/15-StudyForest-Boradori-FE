import { useEffect, useState } from 'react';
import arrowIcon from '../../assets/ic_arrow_right.svg';
import searchIcon from '../../assets/ic_search.svg';
import { useStudies } from '../../hooks/useStudies';
import StudyCard from './StudyCard';
import style from './StudyList.module.css';

const SORT_OPTIONS = [
  { value: 'latest', label: '최근 순', sort: 'desc', sortBy: 'createdAt' },
  { value: 'oldest', label: '오래된 순', sort: 'asc', sortBy: 'createdAt' },
  {
    value: 'pointHigh',
    label: '많은 포인트 순',
    sort: 'desc',
    sortBy: 'point',
  },
  { value: 'pointLow', label: '적은 포인트 순', sort: 'asc', sortBy: 'point' },
];

const StudyList = () => {
  const [sortType, setSortType] = useState('latest');
  const [searchInput, setSearchInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [allStudies, setAllStudies] = useState([]);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const onSelectSort = (value) => {
    setSortType(value);
    setPage(1);
    setAllStudies([]);
    setIsSortOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword((prevKeyword) => {
        if (prevKeyword === searchInput) return prevKeyword;
        setPage(1);
        setAllStudies([]);
        return searchInput;
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const currentSort = SORT_OPTIONS.find((option) => option.value === sortType);

  const { studiesData, isLoading, error } = useStudies({
    page,
    limit: 6,
    sort: currentSort.sort,
    sortBy: currentSort.sortBy,
    keyword,
  });

  const currentSortLabel = SORT_OPTIONS.find(
    (option) => option.value === sortType,
  )?.label;

  const [renderedStudiesData, setRenderedStudiesData] = useState(studiesData);
  if (studiesData !== renderedStudiesData) {
    setRenderedStudiesData(studiesData);
    if (studiesData) {
      setAllStudies((prev) =>
        page === 1 ? studiesData.data : [...prev, ...studiesData.data],
      );
    }
  }

  const hasMore = studiesData ? page < studiesData.totalPages : false;

  return (
    <section className={style.section}>
      <h3 className={style.title}>스터디 둘러보기</h3>

      <div className={style.toolbar}>
        <div className={style.searchBox}>
          <img src={searchIcon} width={18} height={18} />
          <input
            className={style.searchInput}
            type="text"
            placeholder="검색"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className={style.sortWrap}>
          <button
            type="button"
            className={style.sortButton}
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            {currentSortLabel}
            <img
              src={arrowIcon}
              className={`${style.sortArrow} ${isSortOpen ? style.sortArrowOpen : ''}`}
            />
          </button>

          {isSortOpen && (
            <>
              <div
                className={style.sortOverlay}
                onClick={() => setIsSortOpen(false)}
              />
              <div className={style.sortMenu}>
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`${style.sortMenuItem} ${option.value === sortType ? style.sortMenuItemActive : ''}`}
                    onClick={() => onSelectSort(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {error && <p className={style.empty}>목록을 불러오지 못했어요</p>}

      {!error && !isLoading && allStudies.length === 0 ? (
        <p className={style.empty}>아직 둘러 볼 스터디가 없어요</p>
      ) : (
        <>
          <div className={style.list}>
            {allStudies.map((item) => (
              <StudyCard key={item.id} {...item} />
            ))}
          </div>
          {hasMore && (
            <button
              type="button"
              className={style.moreButton}
              onClick={() => setPage(page + 1)}
              disabled={isLoading}
            >
              더보기
            </button>
          )}
        </>
      )}
    </section>
  );
};

export default StudyList;
