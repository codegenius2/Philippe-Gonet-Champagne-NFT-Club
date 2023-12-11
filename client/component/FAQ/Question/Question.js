import React, { useState } from "react";
import styles from "../../../styles/faq.module.css";
function Question({ question, answer }) {
  const [isToggled, setIsToggled] = useState(false);
  function togglePlusMinus() {
    setIsToggled(!isToggled);
  }
  return (
    <div
      className={styles.faq_questions_list_container}
      onClick={togglePlusMinus}
    >
      <div
        className={styles.faq_question_and_plus_button}
        style={isToggled ? { marginBottom: "18px" } : {}}
      >
        <div className={styles.faq_question}>
          {/* QUAND ET OÙ AURA LIEU LA VENTE ? */}
          {question}
        </div>
        <div className={styles.faq_question_plus_button}>
          <div
            className={styles.faq_question_vertical_line}
            style={
              isToggled ? { transform: "translateX(-50%) rotate(270deg)" } : {}
            }
          ></div>
          <div
            className={styles.faq_question_horizontal_line}
            style={isToggled ? { transform: "rotate(360deg)" } : {}}
          ></div>
        </div>
      </div>

      <div
        className={styles.faq_answer}
        style={{
          maxHeight: isToggled ? "500px" : "0",
          // ,marginTop: isToggled ? "18px" : "",
        }}
      >
        {answer}
      </div>
    </div>
  );
}

export default Question;
