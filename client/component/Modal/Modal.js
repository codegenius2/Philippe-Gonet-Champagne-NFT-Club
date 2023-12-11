import React from "react";
import styles from "../../styles/modal.module.css";
function Modal({ children }) {
//   useEffect(() => {
//     console.log(dynamicPositionPopUpMargin);
//   }, [dynamicPositionPopUpMargin]);
  return (
    <div
      className={styles.modal_container}
      //   style={{ marginTop: dynamicPositionPopUpMargin }}
    >
      <div className={styles.modal_wrap}>{children}</div>
    </div>
  );
}

export default Modal;
