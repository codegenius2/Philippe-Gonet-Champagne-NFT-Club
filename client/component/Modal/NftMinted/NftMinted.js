import React, { useState } from "react";
import styles from "../../../styles/modal-styles/modal-styles-content/nft-minted.module.css";
import Video from "../../Video/Video";
function NftMinted() {
  const [email, setEmail] = useState({
    value: "",
    errorMessage: false,
    sent: false,
    loading: false,
  });
  // const [launchAnimation, setLaunchAnimation] = useState();
  function handleEmailChange(event) {
    const emailValue = event.target.value;
    setEmail({ ...email, value: emailValue });
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    setEmail({
      ...email,
      errorMessage: !emailRegex.test(emailValue)
        ? "Adresse e-mail invalide"
        : "",
    });
  }

  function handleKeyDown(event) {
    // If there is no error message send it to backend
    if (event.key === "Enter" && !email.errorMessage) {
      // verifyFormIsValid();
      console.log("call to database for send the mail ", email.errorMessage);
    }
  }
  return (
    <div className={styles.nft_minted_container}>
      <div className={styles.nft_minted_video_and_validation_message_container}>
        <Video size="small" />
        <div className={styles.nft_minted_validation_message_and_logo}>
          <div className={styles.nft_minted_validation_message_container}>
            <p>Paiement validé !</p>
            <p>Bienvenue parmi nous</p>
          </div>
          <div className={styles.nft_minted_validation_logo_container}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/icon%20_check%20correct_.svg?alt=media&token=7816d92c-4b49-4966-bf66-ece533b7b661"
              alt="Firebase logo"
            />
          </div>
        </div>
      </div>
      <div className={styles.nft_minted_get_acess_discord_description}>
        Pour avoir accès au discord nous avons besoin de votre email{" "}
      </div>
      <div className={styles.nft_minted_get_access_discord_form}>
        <input
          className={styles.nft_minted_get_access_discord_input}
          placeholder="e-mail"
          type="email"
          required
          onKeyDown={handleKeyDown}
          onChange={handleEmailChange}
        />
        <div className={styles.nft_minted_get_access_discord_error_message}>
          {email.errorMessage && <p>{email.errorMessage}</p>}
        </div>
        <button
          className={styles.nft_minted_get_access_discord_send_mail_button}
          style={
            email.errorMessage === false
              ? { opacity: "0.5" }
              : email.errorMessage === "Adresse e-mail invalide"
                ? { opacity: "0.5" }
                : { opacity: "1" }
          }
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/arrow-bottom.svg?alt=media&token=76cef9a9-f215-41f7-9585-b951b6535e6c"
            alt=""
          />
        </button>
      </div>
      <div className={styles.nft_minted_socials_description}>
        Suivez-nous sur nos réseaux sociaux
      </div>
      <div className={styles.nft_minted_socials_logos_container}>
        <a target="_blank" href="https://discord.gg/evb3c6sSh7">
          <img
            style={{ filter: "invert(1)" }}
            src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/discord.svg?alt=media&token=61f2c8e7-320f-4218-9cc5-e25e3c36b00a"
          />
        </a>
        <a
          style={{ filter: "invert(1)" }}
          target="_blank"
          href="https://www.instagram.com/champagnephilippegonet/"
        >
          <img src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/mdi_instagram.svg?alt=media&token=748677d1-c4eb-4d13-aa99-f18af7bd168a" />
        </a>
      </div>
    </div>
  );
}

export default NftMinted;
