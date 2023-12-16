import React, { useState, useEffect } from "react";
import styles from "../../../styles/modal-styles/modal-styles-content/checkout-membership.module.css";
import Button from "../../Button/Button";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import Video from "../../Video/Video";
import { useModalContext } from "../../../contexts/ModalContext";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
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
  const { setMintWithWalletSuccessull, windowWidth } = useModalContext();
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
  const { openConnectModal } = useConnectModal();
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
                alt="Metmask logo"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={
              windowWidth < 950
                ? styles.checkout_membership_container_tablet
                : styles.checkout_membership_container
            }
          >
            <div
              className={
                windowWidth < 950
                  ? styles.checkoutmembership_payout_title_and_show_address_tablet
                  : ""
              }
            >
              {isConnected && (
                <>
                  <div
                    className={
                      styles.checkout_membership_payout_title_container
                    }
                  >
                    <span
                      className={
                        windowWidth < 950
                          ? styles.checkout_membership_payout_title_tablet
                          : styles.checkout_membership_payout_title
                      }
                    >
                      Paiement
                    </span>
                    <div
                      className={
                        windowWidth < 950
                          ? styles.checkout_membership_payout_show_address_container
                          : ""
                      }
                    >
                      <ConnectButton
                        coolMode
                        label="Connect wallet"
                        chainStatus="none"
                        showBalance={false}
                      />
                    </div>
                  </div>
                </>
              )}

              <div
                className={
                  windowWidth < 950
                    ? styles.checkout_membership_video_and_selector_and_price_container_tablet
                    : ""
                }
              >
                <div
                  className={
                    windowWidth < 950
                      ? styles.checkout_membership_video_and_selector_container_tablet
                      : styles.checkout_membership_video_and_selector_container
                  }
                >
                  <Video size="xtra-small" />
                  <div
                    className={
                      windowWidth < 950
                        ? styles.checkout_membership_selector_bloc_container_tablet
                        : styles.checkout_membership_selector_bloc_container
                    }
                  >
                    <div className={styles.checkout_membership_selector_title}>
                      Quantité*
                    </div>
                    <div
                      className={
                        isConnected
                          ? styles.checkout_membership_selector_counter_container_tablet
                          : styles.checkout_membership_selector_counter_container
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
                            isMinusToggled
                              ? { transform: "rotate(360deg)" }
                              : {}
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
                        className={
                          styles.checkout_membership_selector_counter_plus
                        }
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
                        windowWidth < 950
                          ? styles.checkout_membership_selector_text_limitation_tablet
                          : styles.checkout_membership_selector_text_limitation
                      }
                    >
                      *Limité à 2 par personnes maximum
                    </div>
                  </div>
                </div>
                <div
                  style={isConnected ? { marginBottom: "40px" } : {}}
                  className={
                    windowWidth < 950
                      ? styles.checkout_membership_price_container_tablet
                      : styles.checkout_membership_price_container
                  }
                >
                  <div
                    className={
                      windowWidth < 950
                        ? styles.checkout_membership_price_tablet
                        : styles.checkout_membership_price
                    }
                    key={totalPrice}
                  >
                    {totalPrice}
                  </div>
                  <div className={styles.checkout_membership_price_currency}>
                    USDC
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                windowWidth < 950
                  ? styles.checkout_membership_explanation_and_buttons_container_tablet
                  : ""
              }
            >
              {!isConnected && (
                <div
                  className={
                    windowWidth < 950
                      ? styles.checkout_membership_explanation_tablet
                      : styles.checkout_membership_explanation
                  }
                >
                  <div className={styles.checkout_membership_explanation_title}>
                    Le CLUB
                  </div>
                  <div
                    className={
                      windowWidth < 950
                        ? styles.checkout_membership_explanation_description_tablet
                        : styles.checkout_membership_explanation_description
                    }
                  >
                    {windowWidth < 950 ? (
                      <>
                        Le Club Membre Philippe Gonet propose une expérience
                        exclusive offerte par la maison de champagne Philippe
                        Gonet, réputée pour son engagement en faveur de
                        l'excellence et de l'authenticité. Les membres
                        bénéficient d'une collaboration privilégiée avec quatre
                        chefs de renom, leur ouvrant la porte à des expériences
                        gastronomiques exceptionnelles.
                      </>
                    ) : (
                      <>
                        Le Club Membre Philippe Gonet propose une expérience
                        exclusive offerte par la maison de champagne
                      </>
                    )}
                  </div>
                </div>
              )}
              <div
                className={
                  windowWidth
                    ? styles.checkout_membership_buttons_container_tablet
                    : styles.checkout_membership_buttons_container
                }
              >
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
                          windowWidth < 950
                            ? styles.checkout_membership_payout_buttons_and_description_container_tablet
                            : styles.checkout_membership_payout_buttons_and_description_container
                        }
                      >
                        {windowWidth < 950 && (
                          <>
                            <div
                              className={
                                styles.checkout_membership_payout_explanation_title_and_description_tablet
                              }
                            >
                              <div
                                className={
                                  styles.checkout_membership_payout_explanation_title_tablet
                                }
                              >
                                Le CLUB
                              </div>
                              <div
                                className={
                                  styles.checkout_membership_explanation_description_tablet
                                }
                              >
                                Le Club Membre Philippe Gonet propose une
                                expérience exclusive offerte par la maison de
                                champagne Philippe Gonet, réputée pour son
                                engagement en faveur de l'excellence et de
                                l'authenticité. Les membres bénéficient d'une
                                collaboration privilégiée avec quatre chefs de
                                renom, leur ouvrant la porte à des expériences
                                gastronomiques exceptionnelles.
                              </div>
                            </div>
                          </>
                        )}
                        <div
                          className={
                            windowWidth < 950
                              ? styles.checkout_membership_payout_buttons_container_tablet
                              : styles.checkout_membership_payout_buttons_container
                          }
                        >
                          <div onClick={approveUSDCMethod}>
                            <Button
                              size={windowWidth < 700 ? "xtra-small" : "small"}
                            >
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
                          {/* <Button size="small"> */}
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
                            getButtonText={(connecting) =>
                              connecting
                                ? "Chargement..."
                                : `Payer par carte bancaire`
                            }
                          />
                          {/* <div>Payer par carte bancaire</div>
                        <div>
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/crossmint.svg?alt=media&token=2383cc02-1f5c-43ff-8964-7a86ca450e0a"
                            alt=""
                          />
                        </div> */}
                          {/* </Button> */}
                        </div>
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
                            getButtonText={(connecting) =>
                              connecting
                                ? "Connecting"
                                : `Payer par corte bancaire`
                            }
                          />
                        </Button>
                      ) : (
                        <>
                          <Button
                            connectWalletButton={true}
                            size={windowWidth < 950 ? "xtra-small" : "small"}
                          >
                            <div onClick={openConnectModal}>J'ai un wallet</div>
                          </Button>
                          <div onClick={handleNoWalletButtonClick}>
                            <Button
                              size={windowWidth < 950 ? "xtra-small" : "small"}
                            >
                              Je n'ai pas de wallet
                            </Button>
                          </div>
                        </>
                      )}
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CheckoutMembership;
