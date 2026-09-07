import { Routes, Route } from 'react-router-dom';
import { SearchButton } from './components/HomePage/SearchButton';
import {
  InputContainer,
  MoveButton,
  Navigation,
  NormalButton,
  Tag,
} from '#publicComponents';
import { useEffect, useState } from 'react';

function App() {
  const handleChildClick = () => {
    console.log('버튼클릭');
  };

  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    console.log(nickname);
    console.log(description);
  }, [nickname, description]);

  const handleChange = (event) => {
    setNickname(event.target.value);
  };

  const handletextAreaChange = (event) => {
    setDescription(event.target.value);
  };
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
    </div>
  );
}

export default App;
