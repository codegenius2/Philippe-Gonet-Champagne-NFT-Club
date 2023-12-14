import React from "react";
import styles from "../../styles/video.module.css";
function Video({ size }) {
  const handleVideoEnd = (e) => {
    e.target.play();
  };
  return (
    <div
      className={
        size === "xtra-small"
          ? styles.video_container_xtra_small
          : size === "small"
            ? styles.video_container_small
            : size === "medium"
              ? styles.video_container_medium
              : styles.video_container
      }
    >
      <video
        autoPlay
        // controls
        muted
        onEnded={handleVideoEnd}
        // crossOrigin="anonymous"
        src="https://firebasestorage.googleapis.com/v0/b/philippe-gonet.appspot.com/o/V06_CPG_nft_1080x1080.mp4?alt=media&token=c988d654-d8ba-4bdd-ba51-c108986b0fa6"
        // src="/videos/V06_CPG_nft_1080x1080.mp4"
      ></video>
    </div>
  );
}

export default Video;
