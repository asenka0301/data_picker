import type { ChangeEvent, FC } from "react";
import type { Option } from "../../constants/dateOptions";

type SelectProps = {
  name: string;
  id: string;
  defaultValue: string;
  options: Array<Option>;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

const SelectProps: FC<SelectProps> = ({
  name,
  id,
  defaultValue,
  options,
  onChange,
  className,
}) => {
  return (
    <select
      name={name}
      id={id}
      defaultValue={defaultValue}
      onChange={onChange}
      className={className}
    >
      {options.map(({ value, label }) => {
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

export default SelectProps;
