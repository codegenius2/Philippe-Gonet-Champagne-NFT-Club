// "use client"
import React, { useEffect, useState } from "react";
import styles from "../../styles/navbar.module.css";
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // store the pixed scrolled for getting the navbar background black if the user refresh after a scroll
  useEffect(() => {
    const storedScrollY = localStorage.getItem("scrollY");
    if (storedScrollY && parseInt(storedScrollY, 10) > 20) {
      setIsScrolled(true);
    }
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      localStorage.setItem("scrollY", scrollY.toString());
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={styles.navbar_container}
      style={{
        backgroundColor: isScrolled ? "black" : "transparent",
        transition: "background-color 300ms",
      }}
    >
      <div className={styles.navbar_wrap}>
        <div className={styles.navbar_logo_container}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/philippe-gonnet-white-logo.svg?alt=media&token=905d7718-274e-484d-907f-5670534b4c1f"
            alt="Philippe Gonet Logo"
          />
        </div>
        <div className={styles.navbar_menu_container}>
          <div className={styles.navbar_menu_our_history}>Notre histoire</div>
          <div className={styles.navbar_menu_vintage}>Nos cuvées</div>
          <div className={styles.navbar_menu_club}>Le club</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
