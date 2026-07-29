import type { InputHTMLAttributes } from "react";

type TextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function TextField({
  label,
  value,
  onChange,
  className,
  ...inputProps
}: TextFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm">{label}</span>
      <input
        {...inputProps}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-[#232323] rounded-md p-2 w-full text-sm ${className ?? ""}`}
      />
    </label>
  );
}