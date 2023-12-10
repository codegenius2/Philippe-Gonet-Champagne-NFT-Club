// import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import styles from "../styles/index.module.css";
import Navbar from "../component/Navbar/Navbar.js";
import JoinClub from "../component/JoinClub/JoinClub.js";
// import FAQ from "../component/FAQ/FAQ.js";
const Home: NextPage = () => {
  return (
    <>
      <div className={styles.home_circle_background_top}></div>
      <div className={styles.home_circle_background_middle_left}></div>
      <div className={styles.home_circle_background_middle_right}></div>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.wrap}>
          {/* <ConnectButton /> */}
          <JoinClub />
          {/* <FAQ /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
