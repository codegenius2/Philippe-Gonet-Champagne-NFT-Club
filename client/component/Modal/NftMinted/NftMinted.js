import React from "react";
import styles from "../../../styles/modal-styles/modal-styles-content/nft-minted.module.css";
import Video from "../../Video/Video";
function NftMinted() {
  return (
    <div className={styles.nft_minted_container}>
      <div className={styles.nft_minted_video_and_validation_message}>
        <Video size="small" />
        <div className={styles.nft_minted_validation_message_container}>
          <p>Paiement validé !</p>
          <p>Bienvenue parmi nous</p>
        </div>
      </div>
    </div>
  );
}

export default NftMinted;
