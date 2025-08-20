import styles from "./DatePicker.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { formatDate, toDuration, type Unit } from "../../utils/formatDate";
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

const DatePickerComponent = () => {
  const [duration, setDuration] = useState<number>(30);
  const [unit, setUnit] = useState<Unit>("m");
  const [start, setStart] = useState<Date>(() =>
    sub(new Date(), toDuration(duration, unit))
  );
  const [endDate] = useState<Date>(() => new Date());

  useEffect(() => {
    const next = sub(new Date(), toDuration(duration, unit));
    setStart(next);
  }, [duration, unit]);

  return (
    <div className={styles.container}>
      <QuickSelectIcon />
      <Popover title={formatDate(start)}>
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
              unit={unit}
              duration={duration}
              setUnit={setUnit}
              setDuration={setDuration}
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
      <Popover title={formatDate(endDate)}>
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
