import styles from "./QuickSelectIcon.module.css";
import type { ReactElement } from "react";

const QuickSelectIcon = (): ReactElement => {
  return (
    <span className={styles.iconContainer}>
      <span className={styles.popoverTriggerIcon}></span>
      <span className={styles.popoverTriggerChevron}></span>
    </span>
  );
};

export default QuickSelectIcon;
