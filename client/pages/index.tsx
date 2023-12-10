// import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import styles from "../styles/index.module.css";
import Navbar from "../component/Navbar/Navbar.js";
import JoinClub from "../component/JoinClub/JoinClub.js";
import Footer from "../component/Footer/Footer.js";
import FAQ from "../component/FAQ/FAQ.js";
import { motion, useScroll } from "framer-motion";
const Home: NextPage = () => {
  const { scrollYProgress } = useScroll();
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
          <JoinClub />
          <FAQ />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
