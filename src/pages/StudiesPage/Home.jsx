import { useState, useContext } from 'react';
import { StudyStateContext } from '../../App';

import { Navigation } from '#publicComponents';
import StudyList from '../../components/HomePage/StudyList';

const Home = () => {
  const data = useContext(StudyStateContext);

  return (
    <div>
      <Navigation />
      <StudyList data={data} />
    </div>
  );
};

export default Home;
