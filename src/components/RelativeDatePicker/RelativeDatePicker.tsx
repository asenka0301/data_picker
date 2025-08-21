import styles from "./RelativeDatePicker.module.css";
import { toDuration, type Tense, type Unit } from "../../utils/formatDate";
import { useState, type ChangeEvent, type FC } from "react";
import Select from "../Select/Select";
import { add, sub } from "date-fns";
import {
  RELATIVE_UNIT_OPTIONS,
  type RelValue,
} from "../../constants/dateOptions";
import DateTimeField from "../DateTimeField/DateTimeField";
import Input from "../Input.tsx/Input";

type RelativeDatePickerProps = {
  date: string;
  setDate: (value: Date) => void;
  unit: Unit;
  setUnit: (value: Unit) => void;
  duration: number;
  setDuration: (value: number) => void;
  tense: Tense;
  setTense: (value: Tense) => void;
};

const parseValue = (value: RelValue): [Tense, Unit] =>
  value.split(":") as [Tense, Unit];

const RelativeDatePicker: FC<RelativeDatePickerProps> = ({
  date,
  setDate,
  duration,
  setDuration,
  unit,
  setUnit,
  tense,
  setTense,
}) => {
  const [durationValue, setDurationvalue] = useState<number>(duration);
  const [unitValue, setUnitValue] = useState<Unit>(unit);
  const [tenseValue, setTenseValue] = useState<Tense>(tense);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextAmount = Number(e.target.value);
    setDurationvalue(nextAmount);
    setDuration(nextAmount);

    const now = new Date();
    const dur = toDuration(Math.max(0, nextAmount), unitValue);
    const nextDate = tense === "last" ? sub(now, dur) : add(now, dur);
    setDate(nextDate);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value as RelValue;
    const [nextTense, nextUnit] = parseValue(value);
    setTenseValue(nextTense);
    setTense(nextTense);
    setUnitValue(nextUnit);
    setUnit(nextUnit);

    const now = new Date();
    const dur = toDuration(Math.max(0, durationValue), nextUnit);
    const nextDate = nextTense === "last" ? sub(now, dur) : add(now, dur);
    setDate(nextDate);
  };

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
          defaultValue={`${tenseValue}:${unitValue}`}
          onChange={handleSelectChange}
          className={styles.controlsItem}
          options={RELATIVE_UNIT_OPTIONS}
        />
      </div>
      <DateTimeField date={date} setDate={setDate} />
    </div>
  );
};

export default RelativeDatePicker;
