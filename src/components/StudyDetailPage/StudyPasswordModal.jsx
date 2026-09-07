import { useState } from 'react';
import { Modal } from '../public/Modal.jsx';

export function StudyPasswordModal({ isOpen, study, actionType, onClose }) {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const buttonText = {
    edit: '수정하러 가기',
    delete: '삭제하기',
    habit: '오늘의 습관으로 가기',
    focus: '오늘의 집중으로 가기',
  };

return (
  <Modal isOpen={isOpen}>
    <div>
      <h2>
        {study.nickname}의 {study.name}
      </h2>
      <button type="button" onClick={onClose}>
        나가기
      </button>
    </div>

    <p>권한이 필요해요!</p>

    <div>
      <label htmlFor="study-password">비밀번호</label>
      <div>
        <input
          id="study-password"
          type={isPasswordVisible ? 'text' : 'password'}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="비밀번호를 입력해 주세요"
        />
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보이기'}
        </button>
      </div>
    </div>

    <button type="button">{buttonText[actionType]}</button>
  </Modal>
);
}
