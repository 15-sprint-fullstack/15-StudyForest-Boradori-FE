import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudyDetailPage from './pages/StudyDetailPage/StudyDetailPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/studies/:studyId" element={<StudyDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
