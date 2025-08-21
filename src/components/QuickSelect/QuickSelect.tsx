import styles from "./QuickSelect.module.css";
import { useState, type ChangeEvent, type FC } from "react";
import { add, sub } from "date-fns";
import { toDuration, type Tense, type Unit } from "../../utils/formatDate";
import Select from "../Select/Select";
import Input from "../Input.tsx/Input";
import {
  RANGE_PRESETS,
  TENSE_OPTIONS,
  UNIT_OPTIONS,
} from "../../constants/dateOptions";
import { getRange } from "../../utils/dateRanges";
import {
  DEFAULT_DURATIN,
  DEFAULT_TENSE,
  DEFAULT_UNIT,
} from "../DatePicker/DatePicker";

type QuickSelectProps = {
  setStart: (start: Date) => void;
  setEnd: (end: Date) => void;
};

const QuickSelect: FC<QuickSelectProps> = ({ setStart, setEnd }) => {
  const [tenseValue, setTenseValue] = useState<Tense>(DEFAULT_TENSE);
  const [unitValue, setUnitValue] = useState<Unit>(DEFAULT_UNIT);
  const [durationValue, setDurationValue] = useState<number>(DEFAULT_DURATIN);

  const handleQuickClick = (id: string) => {
    const { start, end } = getRange(id);
    setStart(start);
    setEnd(end);
  };

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (name === "tense") setTenseValue(value as Tense);
    else if (name === "unit") setUnitValue(value as Unit);
    else if (name === "duration") setDurationValue(Number(value));
  };

  const handleApply = () => {
    const now = new Date();
    const duration = toDuration(Math.max(0, durationValue), unitValue);

    if (tenseValue === "last") {
      setStart(sub(now, duration));
      setEnd(now);
    } else {
      setStart(now);
      setEnd(add(now, duration));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Quick select</div>
      <div className={styles.controls}>
        <Select
          name="tense"
          id="tense"
          defaultValue={tenseValue}
          options={TENSE_OPTIONS}
          onChange={handleChange}
        />
        <Input
          name="duration"
          id="duration"
          type="number"
          defaultValue={durationValue}
          onChange={handleChange}
          min={0}
        />
        <Select
          name="unit"
          id="unit"
          defaultValue={unitValue}
          options={UNIT_OPTIONS}
          onChange={handleChange}
        />
        <button type="button" onClick={handleApply}>
          Apply
        </button>
      </div>
      <div className={styles.title}>Commonly used</div>
      <ul className={styles.lists}>
        {RANGE_PRESETS.map(({ label, id }) => {
          return (
            <li key={label}>
              <button
                type="button"
                className={styles.btn}
                onClick={() => handleQuickClick(id)}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuickSelect;
