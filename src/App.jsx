import { Routes, Route } from 'react-router-dom';
import { SearchButton } from './components/HomePage/SearchButton';
import { AttentionPage } from './pages/AttentionPage/AttentionPage';
import { StudyDetailPage } from './pages/StudyDetailPage/StudyDetailPage';
import {
  InputContainer,
  MoveButton,
  Navigation,
  NormalButton,
  Tag,
  AlertBox,
} from '#publicComponents';

function App() {
  return (
    <div>
      <Navigation />
      <MoveButton route={'/'}>홈</MoveButton>
      <MoveButton route={'/focus'}>오늘의 집중</MoveButton>
      <SearchButton />
      <NormalButton isClick={handleChildClick}>만들기</NormalButton>

      <InputContainer
        label="닉네임"
        type="text"
        value={nickname}
        onChange={handleChange}
        placeholder="닉네임을 입력해주세요"
        error="에러메시지"
      />

      <InputContainer
        label="소개"

        value={description}
        onChange={handletextAreaChange}
        placeholder="소개 멘트를 작성해 주세요"
        multiline={true}
        error="에러메시지"
      />

      <Tag emoji={'😃'} count={20} />
      <AlertBox alertText={'🚨 집중이 중단되었습니다.'} />
    </div>
  );
}

export default App;
