import { Routes, Route } from 'react-router-dom';
import { AttentionPage } from './pages/AttentionPage/AttentionPage';
import { StudyDetailPage } from './pages/StudyDetailPage/StudyDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>홈페이지 예시</div>} />
      <Route path="/studies/:studyId" element={<StudyDetailPage />} />
      <Route path="/studies/:studyId/focus" element={<AttentionPage />} />
      <Route path="*" element={<p>페이지를 찾을 수 없습니다.</p>} />
    </Routes>
  );
}

export default App;
