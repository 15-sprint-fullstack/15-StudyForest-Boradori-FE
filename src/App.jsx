import { Routes, Route } from 'react-router-dom';
import { SearchButton } from './components/HomePage/SearchButton';
import { StudyDetailPage } from './pages/StudyDetailPage/StudyDetailPage.jsx';
import { MoveButton, Navigation, NomalButton } from '#publicComponents';

function App() {
  const handleChildClick = () => {
    console.log('버튼클릭');
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Navigation />
            <MoveButton route={'/'}>홈</MoveButton>
            <MoveButton route={'/focus'}>오늘의 집중</MoveButton>
            <SearchButton />
            <NomalButton isClick={handleChildClick}>만들기</NomalButton>
          </div>
        }
      />
      <Route path="/study/:studyId" element={<StudyDetailPage />} />
      <Route path="*" element={<p>페이지를 찾을 수 없습니다.</p>} />
    </Routes>
  );
}

export default App;
