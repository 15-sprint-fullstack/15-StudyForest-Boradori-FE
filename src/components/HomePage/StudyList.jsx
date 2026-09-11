import StudyCard from './StudyCard';
import style from './StudyList.module.css';
import { useState } from 'react';

const StudyList = ({ data }) => {
  const [sortType, setSortType] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  const getSortedDate = () => {
    return data.toSorted((a, b) => {
      if (sortType === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      if (sortType === 'pointHigh') {
        return Number(b.point) - Number(a.point);
      }

      if (sortType === 'pointLow') {
        return Number(a.point) - Number(b.point);
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const sortedData = getSortedDate();

  const filteredData = sortedData.filter((item) =>
    item.name?.includes(searchTerm),
  );

  return (
    <div className={style.List}>
      <div className={style.menu_bar}>
        <select value={sortType} onChange={onChangeSortType}>
          <option value="latest">최근 순</option>
          <option value="oldest">오래된 순</option>
          <option value="pointHigh">많은 포인트 순</option>
          <option value="pointLow">적은 포인트 순</option>
        </select>
        <input
          className={style.serachInput}
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="list_wrapper">
        {filteredData.map((item) => (
          <StudyCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default StudyList;
