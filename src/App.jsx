import { Routes, Route } from 'react-router-dom';
import { AttentionPage } from './pages/AttentionPage/AttentionPage';
import { Navigation } from '#publicComponents';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/studies/:studyId/attention" element={<AttentionPage />} />
      </Routes>
    </div>
  );
}

export default App;
