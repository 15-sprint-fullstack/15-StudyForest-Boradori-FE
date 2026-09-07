import { createPortal } from "react-dom";
import styles from "#styles/Modal.module.css";

<<<<<<< HEAD:src/components/Modal.jsx
function Modal({ isOpen, children, modalClassName = '' }) {
=======
export function Modal({variant, isOpen, onClose, children}) {
>>>>>>> origin/develop:src/components/public/Modal.jsx
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.overlay}>
<<<<<<< HEAD:src/components/Modal.jsx
      <div className={`${styles.modal} ${modalClassName ?? ''}`}>
        {/* //modalClassName은 각자 정하고 담당 컴포넌트 css파일에서 스타일 주기. */}
=======
      <div className={`${styles.modal} `}>
        //modalClassName은 각자 정하고 담당 컴포넌트 css파일에서 스타일 주기.
>>>>>>> origin/develop:src/components/public/Modal.jsx
        {children}
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
}

// 실제 사용하실 때에는 아래거 붙여넣기 하셔서 모달 내의 요소들(text, input, button 등) 넣으시고 사용하시면 됩니다!
//
// 컴포넌트 본문에는 const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); 추가
// 모달을 열게 만들 요소에는 onClick={() => setIsPasswordModalOpen(true)}} 속성 추가
// return 부분 원하시는 위치에(위치상관x) 아래 모달 추가 후 {children} 부분에 각 요소 배치
//
// <Modal isOpen={isPasswordModalOpen}>
// {children}
// </Modal>

// 이건 제가 쓸 거.
// const [isHabitEditModalOpen, setIsHabitEditModalOpen] = useState(false);
// <Modal isOpen={isHabitEditModalOpen}>
// {children}
// </Modal>
