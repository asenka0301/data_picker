import type { FC } from "react";
import styles from "./NowDateTimePicker.module.css";
import type { Range } from "../BoundaryPicker/BoundaryPicker";

type NowDateTimePickerProps = {
  setDate: (d: Date) => void;
  range: Range;
};

const NowDateTimePicker: FC<NowDateTimePickerProps> = ({ setDate, range }) => {
  const handleClick = () => {
    setDate(new Date());
  };
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        Setting the time to "now" means that on every refresh this time will be
        set to the time of the refresh.
      </div>
      <button
        type="button"
        className={styles.btn}
        onClick={handleClick}
      >{`Set ${range} date and time to now`}</button>
    </div>
  );
};

export default NowDateTimePicker;
