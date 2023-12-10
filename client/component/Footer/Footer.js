import React from "react";
import style from "../../styles/footer.module.css";
function Footer() {
  return (
    <footer className={style.footer_container}>
      <div className={style.footer_wrap}>
        <div className={style.footer_philippe_gonnet_logo_container}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/philippe-gonet-logo-noir.svg?alt=media&token=ca770cba-35dd-465a-bcc6-e13279a0957d"
            alt=""
          />
        </div>
        <div className={style.footer_menu_container}>
          <a
            href="https://www.champagne-philippe-gonet.com/mentions-legales/"
            target="_blank"
            className={style.footer_legals}
          >
            Mentions légales
          </a>
          <a
            href="https://www.champagne-philippe-gonet.com/actualites/"
            target="_blank"
            className={style.footer_press}
          >
            Revue de presse
          </a>
          <a
            href="https://www.champagne-philippe-gonet.com/ou-nous-trouver/"
            target="_blank"
            className={style.footer_find_us}
          >
            Où nous trouver
          </a>
          <a
            href="https://www.champagne-philippe-gonet.com/contact/ "
            target="_blank"
            className={style.footer_contact}
          >
            Contact
          </a>
        </div>
        <div className={style.footer_socials_menu_container}>
          <a target="_blank" href="https://discord.gg/QFUcrcgD">
            <img src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/discord.svg?alt=media&token=61f2c8e7-320f-4218-9cc5-e25e3c36b00a" />
          </a>
          <a target="_blank" href="https://wa.me/message/WZZB6ATQWIKPN1">
            <img src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/whatsapp.svg?alt=media&token=65a78b7c-a90e-444f-a6bc-0e7d7154edda" />
          </a>
          {/* <a
            target="_blank"
            href="https://www.facebook.com/ChampagnePhilippeGonet"
          >
            <img src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/ic_baseline-facebook.svg?alt=media&token=55c1d993-3a69-49e1-aab1-1918a7e8d598" />
          </a> */}
          <a
            target="_blank"
            href="https://www.instagram.com/champagnephilippegonet/"
          >
            <img src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/mdi_instagram.svg?alt=media&token=748677d1-c4eb-4d13-aa99-f18af7bd168a" />
          </a>
          <a
            target="_blank"
            href="https://www.youtube.com/@champagnephilippegonet1589"
          >
            <img src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/ri_youtube-fill.svg?alt=media&token=ab4a7da6-5107-4566-88a5-4f57b7dcecba" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
