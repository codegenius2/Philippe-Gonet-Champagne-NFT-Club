import React from "react";
import styles from "../../styles/button.module.css";
function Button({ handleClick, children, size, connectWalletButton }) {
  return (
    <>
      {connectWalletButton ? (
        <>
          <div className={styles.button_container_small_connect_wallet}>{children}</div>
        </>
      ) : (
        <>
          <div
            onClick={() => handleClick}
            className={
              size === "xtra-small"
                ? styles.button_container_xtra_small
                : size === "small"
                  ? styles.button_container_small
                  : size === "medium"
                    ? styles.button_container_medium
                    : styles.button_container_large
            }
          >
            {children}
          </div>
        </>
      )}
    </>
  );
}

export default Button;
