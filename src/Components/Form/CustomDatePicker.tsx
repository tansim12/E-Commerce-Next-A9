/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, DateRangePicker } from "@nextui-org/react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";

type TDatePickerProps = {
  name: string;
  label?: string;
  isLabelColor?: boolean; // For conditional styling
};

const CustomDatePicker = ({
  name,
  label,
  isLabelColor = false, // Default value as false
}: TDatePickerProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });

  return (
    <div
      className={`custom-date-picker ${isLabelColor ? "custom-label" : ""}`}
      style={{ marginBottom: "20px" }}
    >
      {label && <label className="block  font-semibold mb-2">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <DatePicker
              {...field}
              className="w-full md:max-w-[284px]"
              onChange={(value) => field.onChange(value)}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </>
        )}
      />
    </div>
  );
};

export default CustomDatePicker;
