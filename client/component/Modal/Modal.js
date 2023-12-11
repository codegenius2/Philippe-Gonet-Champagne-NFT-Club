import React from "react";
import styles from "../../styles/modal-styles/modal.module.css";
function Modal({ children }) {
  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_wrap}>{children}</div>
    </div>
  );
}

export default Modal;
