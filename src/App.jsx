import { Routes, Route } from 'react-router-dom';
import { Navigation } from '#publicComponents';
import { AttentionPage } from './pages/AttentionPage/AttentionPage';
import { StudyDetailPage } from './pages/StudyDetailPage/StudyDetailPage';
import { TestPage } from './pages/TestPage';
import { TodayHabitPage } from './pages/TodayHabitPage/TodayHabitPage';

import Home from './pages/StudiesPage/Home';
import New from './pages/StudiesPage/New';
import Edit from './pages/StudiesPage/Edit';
import { useReducer, useRef, createContext } from 'react';

// 테스트만 하고 삭제할 MOCK_STUDIES 입니다.
const MOCK_STUDIES = [
  {
    id: 1,
    nickname: '이유디',
    name: 'UX 스터디',
    description: 'Slow And Steady Wins The Race!',
    point: 310,
    background: 4,
    createdAt: '2026-07-09T09:00:00.000Z',
    emojis: [
      { emojiType: '👍', count: 37 },
      { emojiType: '🔥', count: 26 },
      { emojiType: '❤️', count: 14 },
    ],
  },
  {
    id: 2,
    nickname: 'K.K.',
    name: 'UX 스터디',
    description: '나비보벳따우',
    point: 310,
    background: 1,
    createdAt: '2026-07-09T09:00:00.000Z',
    emojis: [
      { emojiType: '👍', count: 37 },
      { emojiType: '🔥', count: 26 },
      { emojiType: '❤️', count: 14 },
    ],
  },
  {
    id: 3,
    nickname: '연우',
    name: '개발공장',
    description: 'Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)',
    point: 50,
    background: 2,
    createdAt: '2026-08-30T09:00:00.000Z',
    emojis: [
      { emojiType: '💬', count: 12 },
      { emojiType: '👍', count: 11 },
      { emojiType: '😎', count: 9 },
    ],
  },
  {
    id: 4,
    nickname: '다운',
    name: '눈 보호하기 운동',
    description: '비주얼 스튜디오를 끄면 눈이 보호가 됩니다.',
    point: 180,
    background: 3,
    createdAt: '2026-06-15T09:00:00.000Z',
    emojis: [
      { emojiType: '☀️', count: 21 },
      { emojiType: '💪', count: 17 },
      { emojiType: '👏', count: 8 },
    ],
  },
  {
    id: 5,
    nickname: '권다운',
    name: '배가 고픈데 자고 싶어요',
    description: '사람은 왜 자면서 밥을 먹을 수 없는 걸까요?',
    point: 420,
    background: 5,
    createdAt: '2026-04-01T09:00:00.000Z',
    emojis: [
      { emojiType: '🧠', count: 33 },
      { emojiType: '🔥', count: 29 },
      { emojiType: '✅', count: 24 },
    ],
  },
  {
    id: 6,
    nickname: '다운권',
    name: '요즘 날씨가 많이 추워졌어요',
    description: '다들 감기 조심하세요. 잠도 자고 밥도 먹고',
    point: 90,
    background: 6,
    createdAt: '2026-08-01T09:00:00.000Z',
    emojis: [
      { emojiType: '🗣️', count: 14 },
      { emojiType: '📖', count: 10 },
      { emojiType: '❤️', count: 6 },
    ],
  },
  {
    id: 7,
    nickname: '4조 다운',
    name: '개발자들의 몸 관리하기',
    description: '관리를 위해서 운동을 시작해볼까요',
    point: 260,
    background: 7,
    createdAt: '2026-05-20T09:00:00.000Z',
    emojis: [
      { emojiType: '🏃', count: 19 },
      { emojiType: '🔥', count: 15 },
      { emojiType: '👍', count: 12 },
    ],
  },
  {
    id: 8,
    nickname: '4조 권다운',
    name: '타이틀 테스트',
    description: '테스트 타이틀을 위한 테스트 설명',
    point: 130,
    background: 8,
    createdAt: '2026-07-25T09:00:00.000Z',
    emojis: [
      { emojiType: '📚', count: 22 },
      { emojiType: '☕', count: 13 },
      { emojiType: '😌', count: 7 },
    ],
  },
  {
    id: 9,
    nickname: '2파트 다운',
    name: '양꼬치 10인분 도전하기',
    description: '일단 저는 안돼요. 저 대신 도전하실분',
    point: 350,
    background: 3,
    createdAt: '2026-03-10T09:00:00.000Z',
    emojis: [
      { emojiType: '💻', count: 28 },
      { emojiType: '📝', count: 20 },
      { emojiType: '🔥', count: 16 },
    ],
  },
  {
    id: 10,
    nickname: '소재고갈',
    name: '이제 아이디어가 없어요',
    description: '진짜 없어요 너무 없어요 매우 없어요 아무튼 없어요',
    point: 70,
    background: 5,
    createdAt: '2026-08-05T09:00:00.000Z',
    emojis: [
      { emojiType: '💧', count: 15 },
      { emojiType: '🌱', count: 9 },
      { emojiType: '👍', count: 5 },
    ],
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item,
      );
    case 'DELETE':
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const StudyStateContext = createContext();
export const StudyDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, MOCK_STUDIES);
  const idRef = useRef(11);
  // 새로운 스터디 추가
  const onCreate = ({
    nickname,
    name,
    description,
    point,
    background,
    createdAt,
    password,
  }) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        nickname,
        name,
        description,
        point,
        background,
        createdAt,
        password,
      },
    });
  };

  // 기존 스터디 수정
  const onUpdate = (
    id,
    nickname,
    name,
    description,
    point,
    background,
    createdAt,
  ) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        nickname,
        name,
        description,
        point,
        background,
        createdAt,
      },
    });
  };

  // 기존 스터디 삭제
  const onDelete = (id) => {
    dispatch({
      type: 'DELETE',
      id,
    });
  };

  return (
    <div>
      <StudyStateContext.Provider value={data}>
        <StudyDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/makestudy" element={<New />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/studies/:studyId" element={<StudyDetailPage />} />
            <Route
              path="/studies/:studyId/habits"
              element={<TodayHabitPage />}
            />
            <Route path="/studies/:studyId/focus" element={<AttentionPage />} />
            <Route path="*" element={<p>페이지를 찾을 수 없습니다.</p>} />
          </Routes>
        </StudyDispatchContext.Provider>
      </StudyStateContext.Provider>
    </div>
  );
}

export default App;
