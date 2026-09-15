import { Routes, Route } from 'react-router-dom';
import { AttentionPage } from './pages/AttentionPage/AttentionPage';
import { StudyDetailPage } from './pages/StudyDetailPage/StudyDetailPage';
import { TestPage } from './pages/TestPage';
import { TodayHabitPage } from './pages/TodayHabitPage/TodayHabitPage';

import Home from './pages/StudiesPage/Home';
import New from './pages/StudiesPage/New';
import Edit from './pages/StudiesPage/Edit';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/makestudy" element={<New />} />
        <Route path="/studies/:id/edit" element={<Edit />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/studies/:studyId" element={<StudyDetailPage />} />
        <Route path="/studies/:studyId/habits" element={<TodayHabitPage />} />
        <Route path="/studies/:studyId/focus" element={<AttentionPage />} />
        <Route path="*" element={<p>페이지를 찾을 수 없습니다.</p>} />
      </Routes>
    </div>
  );
}

export default App;
