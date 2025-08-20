import styles from "./DatePicker.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import DatePicker from "react-datepicker";
import { sub } from "date-fns";
import { enUS } from "date-fns/locale";
import QuickSelectIcon from "../QuickSelect/QuickSelectIcon/QuickSelectIcon";
import Popover from "../Popover/Popover";
import TabList from "../Tabs/TabList";
import TabItem from "../Tabs/TabItem";
import { roundToMinutes } from "../../utils/roundToMinutes";
import StartDateInput from "../StartDateInput/StartDateInput";

const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState<Date>(() =>
    sub(new Date(), { minutes: 30 })
  );
  const [endDate] = useState<Date>(() => new Date());
  const selected = roundToMinutes(startDate ?? new Date(), 30);

  return (
    <div className={styles.container}>
      <QuickSelectIcon />
      <Popover title={formatDate(startDate)}>
        <TabList defaultActive="rel">
          <TabItem label="Absolute" id="abs">
            <DatePicker
              selected={selected}
              onChange={(d) => d && setStartDate(roundToMinutes(d as Date, 30))}
              inline
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="dd.MM.yyyy, HH:mm"
              calendarStartDay={1}
              locale={enUS}
            />
            <StartDateInput
              date={formatDate(startDate)}
              setStartDate={setStartDate}
            />
          </TabItem>
          <TabItem label="Relative" id="rel">
            <p>Tab #2.</p>
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
