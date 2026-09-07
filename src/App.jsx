import { Routes, Route } from 'react-router-dom';
import { SearchButton } from './components/HomePage/SearchButton';
import { MoveButton, Navigation, NomalButton } from '#publicComponents';
import StudyDetailPage from './pages/StudyDetailPage/StudyDetailPage.jsx'; 


function App() {
  return (
    <div>
      <Navigation />
      <MoveButton route={'/'}>홈</MoveButton>
      <MoveButton route={'/focus'}>오늘의 집중</MoveButton>
      <SearchButton />
      <NomalButton isClick={handleChildClick}>만들기</NomalButton>
      
    </div>
  );
}

export default App;
