import { useState } from 'react';
import { NormalButton, Toast, InputContainer } from '#publicComponents';
import { Modal } from '../public/Modal.jsx';
import styles from './StudyPasswordModal.module.css';

export function StudyPasswordModal({
  isOpen,
  study,
  actionType,
  onClose,
  onSubmit,
  isLoading,
  error,
}) {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  async function handleSubmit() {
    if (isLoading) return;
    if (password.trim() === '') {
      setAlertMessage('🚨 비밀번호를 입력해 주세요');
      return;
    }
    setAlertMessage('');
    await onSubmit(password);
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
            disabled={isLoading}
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
            onChange={(event) => {
              setPassword(event.target.value);
              setAlertMessage('');
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <div className={styles.submitArea}>
          {' '}
          {/* 입력창 아래 간격과 버튼 너비를 정해요. */}
          <NormalButton isClick={handleSubmit}>
            {' '}
            {/* 기존 실행 함수를 공용 버튼에 연결해요. */}
            {isLoading ? '인증 중...' : buttonText[actionType]}{' '}
            {/* 모달 목적에 맞는 문구를 표시해요. */}
          </NormalButton>
        </div>
        {/* 모바일에서는 확인 버튼 아래에 나가기 표시 */}
        <button
          type="button"
          className={styles.mobileCloseButton}
          onClick={onClose}
          disabled={isLoading}
        >
          나가기
        </button>
      </div>
      {(alertMessage || error) && (
        <div className={styles.toastPosition}>
          <Toast className={styles.errorToast}>{alertMessage || error}</Toast>
        </div>
      )}
    </Modal>
  );
}
