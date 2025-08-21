import styles from "./DatePicker.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { formatDate, toDuration } from "../../utils/formatDate";
import DatePicker from "react-datepicker";
import { sub } from "date-fns";
import { enUS } from "date-fns/locale";
import QuickSelectIcon from "../QuickSelect/QuickSelectIcon/QuickSelectIcon";
import Popover from "../Popover/Popover";
import TabList from "../Tabs/TabList";
import TabItem from "../Tabs/TabItem";
import { roundToMinutes } from "../../utils/roundToMinutes";
import StartDateInput from "../StartDateInput/StartDateInput";
import RelativeDatePicker from "../RelativeDatePicker/RelativeDatePicker";
import QuickSelect from "../QuickSelect/QuickSelect";

export const DEFAULT_TENSE = "last";
export const DEFAULT_UNIT = "m";
export const DEFAULT_DURATIN = 30;

const DatePickerComponent = () => {
  const [start, setStart] = useState<Date>(() =>
    sub(new Date(), toDuration(DEFAULT_DURATIN, DEFAULT_UNIT))
  );
  const [endDate, setEnd] = useState<Date>(() => new Date());

  return (
    <div className={styles.container}>
      <Popover
        title={<QuickSelectIcon />}
        btnClassName={styles.quickSelectBtn}
        positionClass="quick"
      >
        <QuickSelect setStart={setStart} setEnd={setEnd} />
      </Popover>
      <Popover title={formatDate(start)} positionClass="start">
        <TabList defaultActive="rel">
          <TabItem label="Absolute" id="abs">
            <DatePicker
              selected={roundToMinutes(start)}
              onChange={(d) => d && setStart(roundToMinutes(d as Date, 30))}
              inline
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="dd.MM.yyyy, HH:mm"
              calendarStartDay={1}
              locale={enUS}
            />
            <StartDateInput date={formatDate(start)} setStartDate={setStart} />
          </TabItem>
          <TabItem label="Relative" id="rel">
            <RelativeDatePicker
              date={formatDate(start)}
              setStartDate={setStart}
            />
          </TabItem>
          <TabItem label="Now" id="now">
            <p>Tab #3.</p>
          </TabItem>
        </TabList>
      </Popover>
      <span className={styles.arrow}></span>
      <Popover title={formatDate(endDate)} positionClass="end">
        <TabList defaultActive="rel">
          <TabItem label="Relative" id="rel">
            <p>This is Tab #1</p>
          </TabItem>
          <TabItem label="Absolute" id="abs">
            <p>Tab #2.</p>
          </TabItem>
          <TabItem label="Now" id="now">
            <p>Tab #3.</p>
          </TabItem>
        </TabList>
      </Popover>
    </div>
  );
};

export default DatePickerComponent;
