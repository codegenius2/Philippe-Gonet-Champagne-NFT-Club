// import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import styles from "../styles/index.module.css";
import Navbar from "../component/Navbar/Navbar.js";
import JoinClub from "../component/JoinClub/JoinClub.js";
import Footer from "../component/Footer/Footer.js";
import FAQ from "../component/FAQ/FAQ.js";
import Modal from "../component/Modal/Modal.js";
import CheckoutMembership from "../component/Modal/CheckoutMembership/CheckoutMembership.js";
import NftMinted from "../component/Modal/NftMinted/NftMinted.js";
import { motion, useScroll } from "framer-motion";
import { useModalContext } from "@/contexts/ModalContext";
const Home: NextPage = () => {
  const [isMintButtonClicked, setIsMintButtonClicked] =
    useState<boolean>(false);
  const { scrollYProgress } = useScroll();
  function handleMintButtonClick() {
    setIsMintButtonClicked(true);
  }
  const { mintWithWalletSuccessFull, setMintWithWalletSuccessull } =
    useModalContext();
  const [crossmintPayLoadLocalStorage, setCrossmintPayLoadLocalStorage] =
    useState(null);

  useEffect(() => {
    if (
      crossmintPayLoadLocalStorage != null &&
      //@ts-ignore
      crossmintPayLoadLocalStorage.status === "success"
    ) {
      setMintWithWalletSuccessull(true);
      return;
    }
    // Display error
  }, [crossmintPayLoadLocalStorage]);

  useEffect(() => {
    window.addEventListener(
      "storage",
      () => {
        const storedPayload = localStorage.getItem("crossmintPayload");
        if (storedPayload) {
          setCrossmintPayLoadLocalStorage(JSON.parse(storedPayload));
        }
      },
      false
    );
  }, []);
  return (
    <>
      <div className={styles.home_circle_background_top}></div>
      <div className={styles.home_circle_background_middle_left}></div>
      <div className={styles.home_circle_background_middle_right}></div>
      <div className={styles.home_philippe_gonet_logo}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/philippe-gonnet-white-logo.svg?alt=media&token=905d7718-274e-484d-907f-5670534b4c1f"
          alt=""
        />
      </div>
      <div className={styles.container}>
        <Navbar />
        <motion.div
          className="progress-bar"
          style={{
            scaleX: scrollYProgress,
          }}
        />
        <div className={styles.wrap}>
          {/* <ConnectButton /> */}
          <JoinClub handleMintButtonClick={handleMintButtonClick} />
          <FAQ />
        </div>
        {isMintButtonClicked && (
          <Modal setState={setIsMintButtonClicked}>
            {!mintWithWalletSuccessFull ? (
              <NftMinted />
            ) : (
              <CheckoutMembership />
            )}
          </Modal>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
