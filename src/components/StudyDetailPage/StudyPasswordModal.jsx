import { useState } from 'react';
import { Modal } from '../public/Modal.jsx';
import { useNavigate, useParams } from 'react-router-dom';

export function StudyPasswordModal({ isOpen, study, actionType, onClose }) {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const { studyId } = useParams();
  //비밀번호 인증성공 후 페이지 이동 임시테스트.
  function handleTestMove() {
    if (password.trim() === '') {
      alert('비밀번호를 입력해 주세요');
      return;
    }
    // 차후 비밀번호 검증함수 완성시 해당 비동기함수 활성화
    // async function handlePasswordSubmit() {
    //   const isValid = await verifyStudyPassword(studyId, password)

    //   if(!isValid) {
    //     alert('비밀번호가 일치하지 않습니다.');
    //     return
    //   }
    // }
    if (actionType === 'habit') {
      onClose();
      navigate(`/studies/${studyId}/habits`); //임시습관화면으로 이동. 추후 변경
    } else if (actionType === 'focus') {
      onClose();
      navigate(`/studies/${studyId}/focus`); //임시집중화면으로 이동. 추후 변경
    } else if (actionType === 'edit') {
      onClose();
      navigate(`/studies/${studyId}/habits/:habitId`); //임시수정화면으로 이동. 추후 변경
    } else if (actionType === 'delete') {
      //삭제되고 홈으로 이동
      alert('삭제 버튼 동작 테스트입니다. 실제로 삭제되지는 않습니다.');
      onClose();
      navigate('/');
    }
  }

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
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleTestMove(); //확인버튼에 연결된 함수를 실행 추후 변경
              }
            }}
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

      {/* {handleTestMove}임시테스트  추후함수 변경필 */}
      <button type="button" onClick={handleTestMove}>
        {buttonText[actionType]}
      </button>
    </Modal>
  );
}
