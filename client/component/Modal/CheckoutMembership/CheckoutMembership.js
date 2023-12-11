import React, { useState } from "react";
import styles from "../../../styles/modal-styles/modal-styles-content/checkout-membership.module.css";
function CheckoutMembership() {
  const [isPlusToggled, setIsPlusToggled] = useState(false);
  const [isMinusToggled, setIsMinusToggled] = useState(false);
  const [quantityCount, setQuantityCount] = useState(1);

  function handleVideoEnd(e) {
    e.target.play();
  }
  function togglePlusMinus() {
    setIsPlusToggled(!isPlusToggled);
    handleCountClick();
  }
  function handleCountClick() {
    if (quantityCount === 1) {
      setQuantityCount(2);
    } else {
      setQuantityCount(1);
    }
  }
  function handleCountMinusClick() {
    if (quantityCount === 2) {
      setQuantityCount(1);
      setIsPlusToggled(!isPlusToggled);
      setIsMinusToggled(!isMinusToggled);
    }
  }
  return (
    <div className={styles.checkout_membership_container}>
      <div className={styles.checkout_membership_video_and_selector_container}>
        <div className={styles.checkout_membership_video_container}>
          <video
            autoPlay
            // controls
            muted
            onEnded={handleVideoEnd}
            // crossOrigin="anonymous"
            src="https://firebasestorage.googleapis.com/v0 /b/philippe-gonet.appspot.com/o/V06_CPG_nft_1080x1080.mp4?alt=media&token=c988d654-d8ba-4bdd-ba51-c108986b0fa6"
            // src="/videos/V06_CPG_nft_1080x1080.mp4"
          ></video>
        </div>
        <div className={styles.checkout_membership_selector_bloc_container}>
          <div className={styles.checkout_membership_selector_title}>
            Quantité*
          </div>
          <div
            className={styles.checkout_membership_selector_counter_container}
          >
            <div
              className={styles.checkout_membership_selector_counter_minus}
              onClick={handleCountMinusClick}
            >
              <span
                style={isMinusToggled ? { transform: "rotate(360deg)" } : {}}
              ></span>
            </div>
            <div
              className={styles.checkout_membership_selector_counter_quantity}
              key={quantityCount}
            >
              {quantityCount}
            </div>
            <div
              className={styles.checkout_membership_selector_counter_plus}
              onClick={togglePlusMinus}
            >
              <span
                style={isPlusToggled ? { transform: "rotate(360deg)" } : {}}
              ></span>
              <span
                style={
                  isPlusToggled
                    ? { transform: "translateX(-50%) rotate(270deg)" }
                    : {}
                }
              ></span>
            </div>
          </div>
          <div className={styles.checkout_membership_selector_text_limitation}>
            *Limité à 2 par personnes maximum
          </div>
        </div>
      </div>
      <div className={styles.checkout_membership_price_container}>
        <div>250</div>
        <div className={styles.checkout_membership_price_currency}>USDC</div>
      </div>
      <div className={styles.checkout_membership_explanation}>
        <div className={styles.checkout_membership_explanation_title}>
          Le CLUB
        </div>
        <div className={styles.checkout_membership_explanation_description}>
          Le Club Membre Philippe Gonet propose une expérience exclusive offerte
          par la maison de champagne
        </div>
      </div>
    </div>
  );
}

export default CheckoutMembership;
