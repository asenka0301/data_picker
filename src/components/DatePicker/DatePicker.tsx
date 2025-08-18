import styles from "./DatePicker.module.css";
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { sub } from "date-fns";
import QuickSelectIcon from "../QuickSelect/QuickSelectIcon/QuickSelectIcon";
import Popover from "../Popover/Popover";

const DatePicker = () => {
  const [startDate] = useState<Date>(() => sub(new Date(), { minutes: 30 }));
  const [endDate] = useState<Date>(() => new Date());
  return (
    <div className={styles.container}>
      <QuickSelectIcon />
      <Popover title={formatDate(startDate)}>
        <div>Data</div>
      </Popover>
      <span className={styles.arrow}></span>
      <Popover title={formatDate(endDate)}>
        <div>Data</div>
      </Popover>
    </div>
  );
};

export default DatePicker;
