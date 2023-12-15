import React, { useState, useEffect } from "react";
import styles from "../../../styles/modal-styles/modal-styles-content/checkout-membership.module.css";
import Button from "../../Button/Button";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import Video from "../../Video/Video";
import { useModalContext } from "../../../contexts/ModalContext";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
  useWalletClient,
} from "wagmi";
import { getAddress, fromHex } from "viem";
import ClubCPG from "@/contracts/ClubCPG.json";
import { useApprove } from "@/hook/useApprove.js";
import { useMint } from "@/hook/useMint.js";
import { MAX_QUANTITY_NFT, PRICE } from "@/utils/constant";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
function CheckoutMembership() {
  const [isPlusToggled, setIsPlusToggled] = useState(false);
  const [isMinusToggled, setIsMinusToggled] = useState(false);
  const [isTimeoutApproveActive, setIsTimeoutApproveActive] = useState(false);
  const [quantityCount, setQuantityCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(PRICE);
  const [isNoWalletButtonClicked, setIsNoWalletButtonClicked] = useState(false);
  const { setMintWithWalletSuccessull } = useModalContext();
  const { address, isConnected } = useAccount();
  const {
    isWaitingApproveUSDCSignatureFromUser,
    isApproveUSDCTxSent,
    approveUSDCMethod,
    approveUSDCReceipt,
    approveUSDCIsError,
    approveUSDCIsLoading,
    approveUSDCError,
  } = useApprove(totalPrice);

  const {
    isWaitingMintSignatureFromUser,
    isMintTxSent,
    mintMethod,
    mintReceipt,
    mintIsError,
    mintIsLoading,
    mintError,
  } = useMint(address, quantityCount);

  useEffect(() => {
    //TODO: condition should be the receipt status
    if (approveUSDCReceipt) {
      setIsTimeoutApproveActive(true);
      setTimeout(() => {
        mintMethod({ from: address });
        setIsTimeoutApproveActive(false);
      }, 10000);
    }
  }, [approveUSDCReceipt]);

  useEffect(() => {
    //TODO: condition should be the receipt status
    if (mintReceipt) {
      setMintWithWalletSuccessull(true);
    }
  }, [mintReceipt]);

  function handleNoWalletButtonClick(e) {
    e.preventDefault();
    setIsNoWalletButtonClicked(true);
  }

  function handleCountPlusMinusClick() {
    if (isPlusToggled) {
      handleCountMinusClick();
      return;
    }
    setQuantityCount(quantityCount + 1);
  }

  function handleCountMinusClick() {
    if (quantityCount > 1) {
      setQuantityCount(quantityCount - 1);
    }
  }

  useEffect(() => {
    if (quantityCount === MAX_QUANTITY_NFT) {
      setIsPlusToggled(true);
    }
    if (isPlusToggled) {
      setIsPlusToggled(false);
    }
    setTotalPrice(PRICE * quantityCount);
  }, [quantityCount]);

  return (
    <>
      {approveUSDCIsLoading ||
      isWaitingMintSignatureFromUser ||
      mintIsLoading ||
      isTimeoutApproveActive ? (
        <>
          <div
            className={
              styles.checkout_membership_payout_loading_mint_wallet_container
            }
          >
            <div
              className={styles.checkout_membership_payout_loading_mint_wallet}
            ></div>
            <div
              className={
                styles.checkout_membership_payout_loading_mint_wallet_image_container
              }
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/metamask.svg?alt=media&token=26bcfafe-a5a8-4f92-a257-3178c76e0256"
                alt=""
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.checkout_membership_container}>
            {isConnected && (
              <>
                <div
                  className={styles.checkout_membership_payout_title_container}
                >
                  <span className={styles.checkout_membership_payout_title}>
                    Paiement
                  </span>
                  <ConnectButton
                    coolMode
                    label="Connect wallet"
                    chainStatus="none"
                    showBalance={false}
                  />
                </div>
              </>
            )}
            <div
              className={
                styles.checkout_membership_video_and_selector_container
              }
            >
              <Video size="small" />
              <div
                className={styles.checkout_membership_selector_bloc_container}
              >
                <div className={styles.checkout_membership_selector_title}>
                  Quantité*
                </div>
                <div
                  className={
                    styles.checkout_membership_selector_counter_container
                  }
                >
                  <div
                    className={
                      styles.checkout_membership_selector_counter_minus
                    }
                    onClick={handleCountMinusClick}
                  >
                    <span
                      style={
                        isMinusToggled ? { transform: "rotate(360deg)" } : {}
                      }
                    ></span>
                  </div>
                  <div
                    className={
                      styles.checkout_membership_selector_counter_quantity
                    }
                    key={quantityCount}
                  >
                    {quantityCount}
                  </div>
                  <div
                    className={styles.checkout_membership_selector_counter_plus}
                    onClick={handleCountPlusMinusClick}
                  >
                    <span
                      style={
                        isPlusToggled ? { transform: "rotate(360deg)" } : {}
                      }
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
                <div
                  className={
                    styles.checkout_membership_selector_text_limitation
                  }
                >
                  *Limité à 2 par personnes maximum
                </div>
              </div>
            </div>
            <div
              style={isConnected ? { marginBottom: "40px" } : {}}
              className={styles.checkout_membership_price_container}
            >
              <div
                className={styles.checkout_membership_price}
                key={totalPrice}
              >
                {totalPrice}
              </div>
              <div className={styles.checkout_membership_price_currency}>
                USDC
              </div>
            </div>
            {!isConnected && (
              <div className={styles.checkout_membership_explanation}>
                <div className={styles.checkout_membership_explanation_title}>
                  Le CLUB
                </div>
                <div
                  className={styles.checkout_membership_explanation_description}
                >
                  Le Club Membre Philippe Gonet propose une expérience exclusive
                  offerte par la maison de champagne
                </div>
              </div>
            )}
            <div className={styles.checkout_membership_buttons_container}>
              {
                // waitingWalletConnection ? (
                //   <>
                //     <div className={styles.checkout_membership_loading_container}>
                //       <LoadingAnimation />
                //     </div>
                //   </>
                // ) :
                isConnected ? (
                  <>
                    <div
                      className={
                        styles.checkout_membership_payout_buttons_container
                      }
                    >
                      <div onClick={approveUSDCMethod}>
                        <Button size="small">
                          <div>Payer avec mon wallet</div>
                          <div
                            className={
                              styles.checkout_membership_payout_wallet_logo_container
                            }
                          >
                            <img
                              src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/metamask.svg?alt=media&token=26bcfafe-a5a8-4f92-a257-3178c76e0256"
                              alt=""
                            />

                            <img
                              src="https://www.rainbowkit.com/rainbow.svg"
                              alt=""
                            />
                          </div>
                        </Button>
                      </div>
                      <Button size="small">
                        {/* <CrossmintPayButton
                          collectionId="ec3020f2-3fb8-40fb-8568-b876dd413e44"
                          projectId="d49cba9a-f3f0-43d3-b626-cd21119dda5a"
                          mintConfig={{
                            // type: "erc-721",
                            totalPrice: `${1}`,
                            _to: "0xd423DCBd697164e282717009044312fDBC6C04f0",
                            _quantity: `${quantityCount ? quantityCount : 0}`,
                          }}
                          environment="staging"
                          mintTo="0xd423DCBd697164e282717009044312fDBC6C04f0"
                          successCallbackURL="http://localhost:3000/crossmintpayload"
                        /> */}
                        <CrossmintPayButton
                          collectionId="5486dc96-3dbb-4adc-94b6-88b12a143075"
                          projectId="e9f5a913-7846-42d4-ae39-9a31875b9dca"
                          mintConfig={{
                            totalPrice: `${totalPrice}`,
                            _quantity: `${quantityCount}`,
                          }}
                          environment="staging"
                          mintTo={`${address}`}
                          successCallbackURL="http://localhost:3000/crossmintpayload"
                        />
                        {/* <div>Payer par carte bancaire</div>
                        <div>
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/crossmint.svg?alt=media&token=2383cc02-1f5c-43ff-8964-7a86ca450e0a"
                            alt=""
                          />
                        </div> */}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {isNoWalletButtonClicked ? (
                      <Button size="medium">
                        <CrossmintPayButton
                          collectionId="5486dc96-3dbb-4adc-94b6-88b12a143075"
                          projectId="e9f5a913-7846-42d4-ae39-9a31875b9dca"
                          mintConfig={{
                            totalPrice: `${totalPrice}`,
                            _quantity: `${quantityCount}`,
                          }}
                          environment="staging"
                          successCallbackURL="http://localhost:3000/crossmintpayload"
                        />
                      </Button>
                    ) : (
                      <>
                        <Button size="small">
                          <ConnectButton
                            coolMode
                            label="Connect wallet"
                            chainStatus="none"
                            showBalance={false}
                          />
                        </Button>
                        <div onClick={handleNoWalletButtonClick}>
                          <Button size="small">Je n'ai pas de wallet</Button>
                        </div>
                      </>
                    )}
                  </>
                )
              }
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CheckoutMembership;
