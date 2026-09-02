import { createPortal } from "react-dom";
import styles from "../styles/Modal.module.css";

function Modal({variant, isOpen, onClose, children}) {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${styles[variant]}`}>
        <button onClick={onClose}>닫기</button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}

export default Modal;

// 실제 사용하실 때에는 아래거 붙여넣기 하셔서 모달 내의 요소들(text, input, button 등) 넣으시고 사용하시면 됩니다!

// 숙연님께.
// 컴포넌트 본문에는 const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false); 추가
// 모달을 열게 만들 요소에는 onClick={() => setIsPasswordModalOpen(true)}} 속성 추가
// return 부분 원하시는 위치에(위치상관x) 아래 모달 추가 후 태그 사이에 각 요소 배치
// <Modal variant="password"
//        isOpen={isPasswordModalOpen}
//        onClose={() => setIsPasswordModalOpen(false)}>
// </Modal>

// 이건 제가 쓸 거.
// const [isHabitEditModalOpen, setIsHabitEditModalOpen] = useState(false);
// <Modal variant="habitEdit"
//        isOpen={isHabitEditModalOpen}
//        onClose={() => setIsHabitEditModalOpen(false)}>
// </Modal>

