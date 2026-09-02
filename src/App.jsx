import { MoveButton } from './components/publicComponents/MoveButton';
import { Navigation } from './components/publicComponents/Navigation';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navigation />
      <MoveButton type={'home'} />
      <MoveButton type={'habit'} />
      <MoveButton type={'focus'} />
      <h1>안녕하세요! 4팀 공부의 숲에 오신것을 환영합니다!</h1>
    </div>
  );
}

export default App;
