import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NormalButton, Toast, InputContainer  } from '#publicComponents';
import { deleteStudies } from '../../api/studies.js';
import visibilityOff from '../../assets/btn_visibility_off_24px.svg';
import visibilityOn from '../../assets/btn_visibility_on_24px.svg';
import { Modal } from '../public/Modal.jsx';
import styles from './StudyPasswordModal.module.css';


export function StudyPasswordModal({ isOpen, study, actionType, onClose }) {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const navigate = useNavigate();
  const { studyId } = useParams();
  //비밀번호 인증성공 후 페이지 이동 임시테스트.
  async function handleTestMove() {
    if (password.trim() === '') {
      setAlertMessage('🚨 비밀번호를 입력해 주세요');
      return;
    }

    const isValid = password === study.password; //삭제예정
    // API 연결 시 위 두 줄을 아래 코드로 교체 및 추가 작성 예정
    // const isValid = await verifyStudyPassword(studyId, password);

    if (!isValid) {
      setAlertMessage('🚨 비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      return;
    }

    setAlertMessage('');

    if (actionType === 'habit') {
      onClose();
      navigate(`/studies/${studyId}/habits`); //임시습관화면으로 이동. 추후 변경
    } else if (actionType === 'focus') {
      onClose();
      navigate(`/studies/${studyId}/focus`); //임시집중화면으로 이동. 추후 변경
    } else if (actionType === 'edit') {
      onClose();
      navigate(`/studies/${studyId}/edit`); //임시수정화면으로 이동. 추후 변경
    } else if (actionType === 'delete') {
      await deleteStudies(studyId);
      onClose();
      navigate('/', { replace: true });
      //삭제되고 홈으로 이동
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
      <div className={styles.modalContent}>
        <div className={styles.heading}>
          {' '}
          <h2 className={styles.title}>
            {' '}
            {study.nickname}의 {study.name}
          </h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            {' '}
            나가기
          </button>
        </div>
        <p className={styles.description}>권한이 필요해요!</p>{' '}
        <div className={styles.passwordField}>
          <InputContainer 
            label="비밀번호"
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            onChange={(event)=> {
              setPassword(event.target.value)
              setAlertMessage('')
            }}
            onKeyDown={(event)=>{
              if(event.key === 'Enter') {
                event.preventDefault()
                handleTestMove()
              }
            }}
            placeholder="비밀번호를 입력해주세요"
          />
          <button
            type='button'
            className={styles.visibilityButton}
            onClick={()=> setIsPasswordVisible(!isPasswordVisible)}>
            <img
              src={isPasswordVisible ? visibilityOn : visibilityOff}
              width={24} height={24}
            />
          </button>
        </div>
        {/* {handleTestMove}임시테스트  추후함수 변경필 */}
        <div className={styles.submitArea}>
          {' '}
          {/* 입력창 아래 간격과 버튼 너비를 정해요. */}
          <NormalButton isClick={handleTestMove}>
            {' '}
            {/* 기존 실행 함수를 공용 버튼에 연결해요. */}
            {buttonText[actionType]} {/* 모달 목적에 맞는 문구를 표시해요. */}
          </NormalButton>
        </div>
        {/* 모바일에서는 확인 버튼 아래에 나가기 표시 */}
        <button
          type="button"
          className={styles.mobileCloseButton}
          onClick={onClose}
        >
          나가기
        </button>
      </div>
      {alertMessage && (
        <div className={styles.toastPosition}>
          <Toast className={styles.errorToast}>{alertMessage}</Toast>
        </div>
      )}
    </Modal>
  );
}
