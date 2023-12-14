import React, { useState, useEffect } from "react";
import styles from "../../styles/join-club.module.css";
import Video from "../Video/Video";
function JoinClub({ handleMintButtonClick }) {
  const [windowWidth, setWindowWidth] = useState();
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.join_club_container}>
      <div className={styles.join_club_title_and_mint_button_container}>
        <div className={styles.join_club_title_container}>
          REJOIGNEZ LE CLUB CHAMPAGNE PHILIPPE GONET
        </div>
        <div onClick={handleMintButtonClick}>
          <button className={styles.join_club_mint_button_container}>
            Mint NOW
          </button>
        </div>
      </div>
      <div className={styles.join_club_video_and_description}>
        <Video
          size={
            windowWidth < 950 ? "small" : windowWidth < 1450 ? "medium" : ""
          }
        />
        <div className={styles.join_club_title_and_description_container}>
          <div className={styles.join_club_title_club_container}>Le CLUB</div>
          <div className={styles.join_club_description_container}>
            Le Club Membre Philippe Gonet propose une expérience exclusive
            offerte par la maison de champagne Philippe Gonet, réputée pour son
            engagement en faveur de l'excellence et de l'authenticité. Les
            membres bénéficient d'une collaboration privilégiée avec quatre
            chefs de renom, leur ouvrant la porte à des expériences
            gastronomiques exceptionnelles. Ils jouissent également d'un accès à
            une cave dédiée, permettant la conservation de leurs propres
            bouteilles avec l'option de personnaliser le dégorgement selon leurs
            préférences. D'autres avantages exclusifs sont à découvrir sur
            le site officiel.
          </div>
          <a
            target="_blank"
            href="https://www.champagne-philippe-gonet.com/club/"
            className={styles.join_club_know_more_container}
          >
            <div className={styles.join_club_know_more}>En savoir plus</div>
            <div className={styles.join_club_know_more_champagne_logo}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/champagne-bottle.svg?alt=media&token=4029a756-d719-486d-94c9-2fcaed9e96ff"
                alt="champagne bouteille logo"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
    // <Modal>
    // </Modal>
  );
}

export default JoinClub;
