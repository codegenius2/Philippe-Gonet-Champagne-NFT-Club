import React, { useRef } from "react";
import styles from "../../styles/modal-styles/modal.module.css";
import { cp } from "fs";
function Modal({ children, setState }) {
  const modalContainerRef = useRef(null);
  function handleClickOutsideModal(e) {
    if (e.target === modalContainerRef.current) {
      setState(false);
    }
  }
  return (
    <div
      className={styles.modal_container}
      ref={modalContainerRef}
      onMouseDown={handleClickOutsideModal}
    >
      <div className={styles.modal_wrap}>{children}</div>
    </div>
  );
}

export default Modal;
