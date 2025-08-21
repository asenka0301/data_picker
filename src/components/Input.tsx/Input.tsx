import type { ChangeEvent, FC } from "react";

type InputProps = {
  name: string;
  id: string;
  type: string;
  defaultValue: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: number;
};

const Input: FC<InputProps> = ({
  name,
  id,
  type,
  defaultValue,
  onChange,
  min,
  className,
}) => {
  return (
    <input
      name={name}
      id={id}
      type={type}
      defaultValue={defaultValue}
      onChange={onChange}
      min={min}
      className={className}
    />
  );
};

export default Input;
