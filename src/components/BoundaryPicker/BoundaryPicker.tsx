import { useState, type FC } from "react";
import { formatDate, type Tense, type Unit } from "../../utils/formatDate";
import {
  DEFAULT_DURATION,
  DEFAULT_TENSE,
  DEFAULT_UNIT,
  STEP_MINUTES,
} from "../DatePicker/DatePicker";
import { enUS } from "date-fns/locale";
import { roundToMinutes } from "../../utils/roundToMinutes";
import Popover from "../Popover/Popover";
import TabList from "../Tabs/TabList";
import TabItem from "../Tabs/TabItem";
import StartDateInput from "../DateTimeField/DateTimeField";
import RelativeDatePicker from "../RelativeDatePicker/RelativeDatePicker";
import DatePicker from "react-datepicker";

type BoundaryPickerProps = {
  positionClass: string;
  date: Date;
  setDate: (d: Date) => void;
  isRangeInvalid: boolean;
};

const BoundaryPicker: FC<BoundaryPickerProps> = ({
  positionClass,
  date,
  setDate,
  isRangeInvalid,
}) => {
  const [unit, setUnit] = useState<Unit>(DEFAULT_UNIT);
  const [duration, setDuration] = useState<number>(DEFAULT_DURATION);
  const [tense, setTense] = useState<Tense>(DEFAULT_TENSE);

  return (
    <Popover
      title={formatDate(date)}
      positionClass={positionClass}
      isRangeInvalid={isRangeInvalid}
    >
      <TabList defaultActive="rel">
        <TabItem label="Absolute" id="abs">
          <DatePicker
            selected={roundToMinutes(date)}
            onChange={(d) => d && setDate(roundToMinutes(d as Date, 30))}
            inline
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={STEP_MINUTES}
            timeCaption="Time"
            dateFormat="dd.MM.yyyy, HH:mm"
            calendarStartDay={1}
            locale={enUS}
          />
          <StartDateInput date={formatDate(date)} setDate={setDate} />
        </TabItem>
        <TabItem label="Relative" id="rel">
          <RelativeDatePicker
            date={formatDate(date)}
            setDate={setDate}
            unit={unit}
            setUnit={setUnit}
            duration={duration}
            setDuration={setDuration}
            tense={tense}
            setTense={setTense}
          />
        </TabItem>
        <TabItem label="Now" id="now">
          <p>Tab #3.</p>
        </TabItem>
      </TabList>
    </Popover>
  );
};

export default BoundaryPicker;
