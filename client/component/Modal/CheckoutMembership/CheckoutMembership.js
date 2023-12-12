import React, { useState, useEffect } from "react";
import styles from "../../../styles/modal-styles/modal-styles-content/checkout-membership.module.css";
import Button from "../../Button/Button";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
function CheckoutMembership() {
  const [isPlusToggled, setIsPlusToggled] = useState(false);
  const [isMinusToggled, setIsMinusToggled] = useState(false);
  const [quantityCount, setQuantityCount] = useState(1);
  const [price, setPrice] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isWalletConnected, setIsWalletConnected] = useState(false);

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
  function handleClickHaveWallet() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsWalletConnected(true);
    }, 500);
  }
  useEffect(() => {
    if (quantityCount === 1) {
      setPrice(315);
    } else {
      setPrice(630);
    }
  }, [quantityCount]);
  return (
    <div className={styles.checkout_membership_container}>
      {isWalletConnected && (
        <div className={styles.checkout_membership_payout_title}>Paiement</div>
      )}
      <div className={styles.checkout_membership_video_and_selector_container}>
        <div className={styles.checkout_membership_video_container}>
          <video
            autoPlay
            // controls
            muted
            onEnded={handleVideoEnd}
            // crossOrigin="anonymous"
            src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/V06_CPG_nft_1080x1080.mp4?alt=media&token=c988d654-d8ba-4bdd-ba51-c108986b0fa6"
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
      <div
        style={isWalletConnected ? { marginBottom: "40px" } : {}}
        className={styles.checkout_membership_price_container}
      >
        <div className={styles.checkout_membership_price} key={price}>
          {price}
        </div>
        <div className={styles.checkout_membership_price_currency}>USDC</div>
      </div>
      {!isWalletConnected && (
        <div className={styles.checkout_membership_explanation}>
          <div className={styles.checkout_membership_explanation_title}>
            Le CLUB
          </div>
          <div className={styles.checkout_membership_explanation_description}>
            Le Club Membre Philippe Gonet propose une expérience exclusive
            offerte par la maison de champagne
          </div>
        </div>
      )}
      <div className={styles.checkout_membership_buttons_container}>
        {isLoading ? (
          <>
            <div className={styles.checkout_membership_loading_container}>
              <LoadingAnimation />
            </div>
          </>
        ) : isWalletConnected ? (
          <>
            <div
              className={styles.checkout_membership_payout_buttons_container}
            >
              <Button size="small">
                <div>Payer avec mon wallet</div>
                <div className={styles.checkout_membership_payout_wallet_logo_container}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/metamask.svg?alt=media&token=8fb27e37-8682-492a-b7c6-07f6fc4689b7"
                    alt=""
                  />
                  
                  <img src="https://www.rainbowkit.com/rainbow.svg" alt="" />
                </div>
              </Button>
              <Button size="small">
                <div>Payer par carte bancaire</div>
                <div>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/crossmint.svg?alt=media&token=2383cc02-1f5c-43ff-8964-7a86ca450e0a"
                    alt=""
                  />
                </div>
              </Button>
            </div>
          </>
        ) : (
          <>
            <Button handleClick={handleClickHaveWallet} size="small">
              J'ai un wallet
            </Button>
            <Button size="small">Je n'ai pas de wallet</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default CheckoutMembership;
