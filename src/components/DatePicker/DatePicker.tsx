import styles from "./DatePicker.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { toDuration } from "../../utils/formatDate";
import { sub } from "date-fns";
import BoundaryPicker from "../BoundaryPicker/BoundaryPicker";
import QuickRangePicker from "../QuickRangePicker/QuickRangePicker";

export const DEFAULT_TENSE = "last";
export const DEFAULT_UNIT = "m";
export const DEFAULT_DURATION = 30;
export const STEP_MINUTES = 30;

const DatePicker = () => {
  const [start, setStart] = useState<Date>(() =>
    sub(new Date(), toDuration(DEFAULT_DURATION, DEFAULT_UNIT))
  );
  const [end, setEnd] = useState<Date>(() => new Date());

  return (
    <div className={styles.container}>
      <QuickRangePicker
        btnClassName={styles.quickSelectBtn}
        positionClass="quick"
        setStart={setStart}
        setEnd={setEnd}
      />
      <BoundaryPicker date={start} setDate={setStart} positionClass="start" />
      <span className={styles.arrow}></span>
      <BoundaryPicker date={end} setDate={setEnd} positionClass="end" />
    </div>
  );
};

export default DatePicker;
