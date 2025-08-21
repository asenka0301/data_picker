import type { FC } from "react";
import Popover from "../Popover/Popover";
import QuickSelectIcon from "./QuickSelectIcon/QuickSelectIcon";
import QuickSelect from "./QuickSelect/QuickSelect";

type QuickRangePickerProps = {
  btnClassName?: string;
  positionClass?: string;
  setStart: (date: Date) => void;
  setEnd: (date: Date) => void;
};

const QuickRangePicker: FC<QuickRangePickerProps> = ({
  btnClassName,
  positionClass,
  setStart,
  setEnd,
}) => (
  <Popover
    title={<QuickSelectIcon />}
    btnClassName={btnClassName}
    positionClass={positionClass}
  >
    <QuickSelect setStart={setStart} setEnd={setEnd} />
  </Popover>
);

export default QuickRangePicker;
