import { useEffect, useRef, useState, type FC } from "react";
import styles from "./StartDateInput.module.css";
import { validateDate } from "../../utils/dateValidation";

type StartDateInputProps = {
  date: string;
  setStartDate: (value: Date) => void;
};

const StartDateInput: FC<StartDateInputProps> = ({ date, setStartDate }) => {
  const [value, setValue] = useState(date);
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [validationError, setValidationError] = useState<boolean>(false);

  const handleSave = () => {
    const res = validateDate(value);
    if (!res.ok) {
      inputRef.current?.focus();
      setValidationError(true);
      return;
    }
    setStartDate(res.date);
    setValidationError(false);
    setTouched(false);
  };

  useEffect(() => {
    setValue(date);
    setTouched(false);
    setValidationError(false);
  }, [date]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>Start Date</div>
        <input
          ref={inputRef}
          type="text"
          className={`${styles.input} ${
            validationError ? styles.inputInvalid : ""
          }`.trim()}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (!touched) setTouched(true);
          }}
        />
        {touched && (
          <button type="button" className={styles.btn} onClick={handleSave}>
            <span className={styles.btnIcon}></span>
          </button>
        )}
      </div>
      {touched && (
        <div
          className={`${styles.infoText} ${
            validationError ? styles.textRed : ""
          }`.trim()}
        >
          Allowed format: <span>MMM D, YYYY @ HH:mm:ss.SSS</span>.
        </div>
      )}
    </>
  );
};

export default StartDateInput;
