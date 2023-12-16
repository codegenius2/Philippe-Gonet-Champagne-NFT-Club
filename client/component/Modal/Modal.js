import React, { useRef } from "react";
import styles from "../../styles/modal-styles/modal.module.css";
import { useModalContext } from "@/contexts/ModalContext";
function Modal({ children, setState }) {
  const { windowWidth, mintWithWalletSuccessFull } = useModalContext();
  const modalContainerRef = useRef(null);
  function handleClickOutsideModal(e) {
    if (e.target === modalContainerRef.current) {
      setState(false);
    }
  }
  return (
    <>
      {mintWithWalletSuccessFull ? (
        <>
          <div
            className={
              windowWidth < 950
                ? styles.modal_container_nft_minted_tablet
                : styles.modal_container
            }
          >
            <div
              className={
                windowWidth < 950
                  ? styles.modal_wrap_nft_minted_tablet
                  : styles.modal_wrap
              }
            >
              {children}
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={
              windowWidth < 950
                ? styles.modal_container_tablet
                : styles.modal_container
            }
            ref={modalContainerRef}
            onMouseDown={handleClickOutsideModal}
          >
            <div
              className={
                windowWidth < 950 ? styles.modal_wrap_tablet : styles.modal_wrap
              }
            >
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Modal;
