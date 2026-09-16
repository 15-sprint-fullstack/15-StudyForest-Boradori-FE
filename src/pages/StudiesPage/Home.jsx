import RecentStudyList from '../../components/HomePage/RecentStudyList';
import StudyList from '../../components/HomePage/StudyList';
import style from './Home.module.css';

const Home = () => {
  return (
    <div>
      <div className={style.page}>
        <RecentStudyList />
        <StudyList />
      </div>
    </div>
  );
};

export default Home;
