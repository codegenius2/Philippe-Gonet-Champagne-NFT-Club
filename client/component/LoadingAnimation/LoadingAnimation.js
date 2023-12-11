import React from "react";
import styles from "../../styles/loading-animation.module.css";
function LoadingAnimation() {
  return (
    <>
      <div className={styles.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}

export default LoadingAnimation;
