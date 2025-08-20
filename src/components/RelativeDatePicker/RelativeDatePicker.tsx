import styles from "./RelativeDatePicker.module.css";
import type { Unit } from "../../utils/formatDate";
import { useState, type ChangeEvent, type FC } from "react";
import StartDateInput from "../StartDateInput/StartDateInput";

type RelativeDatePickerProps = {
  unit: Unit;
  setUnit: (unit: Unit) => void;
  duration: number;
  setDuration: (duration: number) => void;
  date: string;
  setStartDate: (value: Date) => void;
};

const RelativeDatePicker: FC<RelativeDatePickerProps> = ({
  unit,
  setUnit,
  duration,
  setDuration,
  date,
  setStartDate,
}) => {
  const [durationValue, setDurationValue] = useState<number>(duration);
  const [unitValue, setUnitValue] = useState<Unit>(unit);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setDurationValue(newValue);
    setDuration(newValue);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value as Unit;
    setUnitValue(newValue);
    setUnit(newValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <input
          name="duration"
          id="duration"
          type="number"
          value={durationValue}
          onChange={handleInputChange}
          min={0}
          className={styles.controlsItem}
        />
        <select
          name="unit"
          id="unit"
          value={unitValue}
          onChange={handleSelectChange}
          className={styles.controlsItem}
        >
          <option value="s">Seconds</option>
          <option value="m">Minutes</option>
          <option value="h">Hours</option>
          <option value="d">Days</option>
          <option value="w">Weeks</option>
          <option value="M">Months</option>
          <option value="y">Years</option>
        </select>
      </div>
      <StartDateInput date={date} setStartDate={setStartDate} />
    </div>
  );
};

export default RelativeDatePicker;
