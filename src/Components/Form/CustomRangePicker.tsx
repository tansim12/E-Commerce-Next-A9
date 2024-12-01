/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateRangePicker } from "@nextui-org/react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";

type TDatePickerProps = {
  name: string;
  label?: string;
  isLabelColor?: boolean; // For conditional styling
  changeOnValue?: any;
};

const CustomRangePicker = ({
  name,
  label,
  isLabelColor = false, // Default value as false
  changeOnValue,
}: TDatePickerProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    changeOnValue(inputValue);
  }, [inputValue, changeOnValue]);

  return (
    <div
      className={`custom-date-picker ${isLabelColor ? "custom-label" : ""}`}
      style={{ marginBottom: "20px" }}
    >
      {label && (
        <label className="block  font-semibold mb-2">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <DateRangePicker
              {...field}
              calendarProps={{
                classNames: {
                  base: "bg-background",
                  headerWrapper: "pt-4 bg-background",
                  prevButton: "border-1 border-default-200 rounded-small",
                  nextButton: "border-1 border-default-200 rounded-small",
                  gridHeader:
                    "bg-background shadow-none border-b-1 border-default-100",
                  cellButton: [
                    "data-[today=true]:bg-default-100 data-[selected=true]:bg-transparent rounded-small",
                    "data-[range-start=true]:before:rounded-l-small",
                    "data-[selection-start=true]:before:rounded-l-small",
                    "data-[range-end=true]:before:rounded-r-small",
                    "data-[selection-end=true]:before:rounded-r-small",
                    "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:rounded-small",
                    "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:rounded-small",
                  ],
                },
              }}
              className="max-w-xs"
              variant="bordered"
              onChange={(value) => field.onChange(value)} // Update form state with selected dates
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </>
        )}
      />
    </div>
  );
};

export default CustomRangePicker;
