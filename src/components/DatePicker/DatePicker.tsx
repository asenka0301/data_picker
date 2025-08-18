import styles from "./DatePicker.module.css";
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { sub } from "date-fns";
import QuickSelectIcon from "../QuickSelect/QuickSelectIcon/QuickSelectIcon";
import Popover from "../Popover/Popover";
import TabList from "../Tabs/TabList";
import TabItem from "../Tabs/TabItem";

const DatePicker = () => {
  const [startDate] = useState<Date>(() => sub(new Date(), { minutes: 30 }));
  const [endDate] = useState<Date>(() => new Date());
  return (
    <div className={styles.container}>
      <QuickSelectIcon />
      <Popover title={formatDate(startDate)}>
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

export default DatePicker;
