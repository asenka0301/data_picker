import styles from "./RelativeDatePicker.module.css";
import { toDuration, type Tense, type Unit } from "../../utils/formatDate";
import { useEffect, useState, type ChangeEvent, type FC } from "react";
import StartDateInput from "../StartDateInput/StartDateInput";
import Input from "../Input.tsx/Input";
import Select from "../Select/Select";
import { add, sub } from "date-fns";
import {
  RELATIVE_UNIT_OPTIONS,
  type RelValue,
} from "../../constants/dateOptions";
import {
  DEFAULT_DURATIN,
  DEFAULT_TENSE,
  DEFAULT_UNIT,
} from "../DatePicker/DatePicker";

type RelativeDatePickerProps = {
  date: string;
  setStartDate: (value: Date) => void;
};

const parseValue = (value: RelValue): [Tense, Unit] =>
  value.split(":") as [Tense, Unit];

const RelativeDatePicker: FC<RelativeDatePickerProps> = ({
  date,
  setStartDate,
}) => {
  const [durationValue, setDurationValue] = useState<number>(DEFAULT_DURATIN);
  const [unitValue, setUnitValue] = useState<Unit>(DEFAULT_UNIT);
  const [tense, setTenseValue] = useState<Tense>(DEFAULT_TENSE);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDurationValue(Number(e.target.value));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [nextTense, nextUnit] = parseValue(e.currentTarget.value as RelValue);
    setTenseValue(nextTense);
    setUnitValue(nextUnit);
  };

  useEffect(() => {
    const now = new Date();
    const duration = toDuration(Math.max(0, durationValue), unitValue);
    const nextDate = tense === "last" ? sub(now, duration) : add(now, duration);
    setStartDate(nextDate);
  }, [durationValue, unitValue, tense, setStartDate]);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <Input
          name="duration"
          id="duration"
          type="number"
          defaultValue={durationValue}
          onChange={handleInputChange}
          min={0}
          className={styles.controlsItem}
        />
        <Select
          name="unit"
          id="unit"
          defaultValue={`${tense}:${unitValue}`}
          onChange={handleSelectChange}
          className={styles.controlsItem}
          options={RELATIVE_UNIT_OPTIONS}
        />
      </div>
      <StartDateInput date={date} setStartDate={setStartDate} />
    </div>
  );
};

export default RelativeDatePicker;
