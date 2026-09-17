import { Routes, Route } from 'react-router-dom';
import { Navigation } from '#publicComponents';
import { StudyAccessGuard } from './components/Access/StudyAccessGuard.jsx';
import { AttentionPage } from './pages/AttentionPage/AttentionPage';
import Edit from './pages/StudiesPage/Edit';
import Home from './pages/StudiesPage/Home';
import New from './pages/StudiesPage/New';
import { StudyDetailPage } from './pages/StudyDetailPage/StudyDetailPage';
import { TestPage } from './pages/TestPage';
import { TodayHabitPage } from './pages/TodayHabitPage/TodayHabitPage';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/makestudy" element={<New />} />

        <Route path="/test" element={<TestPage />} />
        <Route path="/studies/:studyId" element={<StudyDetailPage />} />

        {/* 해당 부분은 인증 가능한 쪽만 들어갈 수 있기 때문에 인증 파트  */}
        <Route element={<StudyAccessGuard />}>
          <Route path="/studies/:studyId/edit" element={<Edit />} />
          <Route path="/studies/:studyId/habits" element={<TodayHabitPage />} />
          <Route path="/studies/:studyId/focus" element={<AttentionPage />} />
        </Route>
        <Route path="*" element={<p>페이지를 찾을 수 없습니다.</p>} />
      </Routes>
    </div>
  );
}

export default App;
