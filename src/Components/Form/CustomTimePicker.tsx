import { Controller, useFormContext, useWatch } from "react-hook-form";

type TTimePickerProps = {
  name: string;
  label?: string;
};

const CustomTimePicker = ({ name, label }: TTimePickerProps) => {
  const { control } = useFormContext();

  return (
    <div style={{ marginBottom: "20px" }}>
      {label && <label className="block  font-semibold mb-2">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              type="time"
              {...field}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </>
        )}
      />
    </div>
  );
};

export default CustomTimePicker;
