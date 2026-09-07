import { Routes, Route } from 'react-router-dom';
import { MoveButton, Navigation, NomalButton, SearchButton } from '#publicComponents';

function App() {
  const handleChildClick = () => {
    console.log('버튼클릭');
  };
  return (
    <div>
      <Navigation />
      <MoveButton route={'/'}>홈</MoveButton>
      <MoveButton route={'/focus'}>오늘의 집중</MoveButton>
      <SearchButton/>
      <NomalButton isClick={handleChildClick}>만들기</NomalButton>
    </div>
  );
}

export default App;
