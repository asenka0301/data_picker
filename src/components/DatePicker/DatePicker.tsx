import styles from "./DatePicker.module.css";
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { sub } from "date-fns";
import QuickSelectIcon from "../QuickSelect/QuickSelectIcon/QuickSelectIcon";

const DatePicker = () => {
  const [startDate] = useState<Date>(() => sub(new Date(), { minutes: 30 }));
  const [endDate] = useState<Date>(() => new Date());
  return (
    <div className={styles.container}>
      <QuickSelectIcon />
      <div>{formatDate(startDate)}</div>
      <span className={styles.arrow}></span>
      <div>{formatDate(endDate)}</div>
    </div>
  );
};

export default DatePicker;
