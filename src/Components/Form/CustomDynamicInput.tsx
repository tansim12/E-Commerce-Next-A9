import { useEffect } from "react";
import { Input } from "@nextui-org/input";
import { useFieldArray, Controller } from "react-hook-form";
import "./labelColor.css";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  isLabelColor?: boolean;
  placeholder?: string;
};

const CustomDynamicInput = ({
  type,
  name,
  label,
  isLabelColor,
}: TInputProps) => {
  const { fields, append, remove } = useFieldArray({ name });

  useEffect(() => {
    if (fields.length === 0) {
      append(""); // Append an initial empty object
    }
  }, [fields, append]);

  return (
    <div className={`${isLabelColor ? "custom-label" : ""}`}>
      {fields.map((field, index) => (
        <div key={field.id} className="flex justify-center items-center mb-2 ">
          <Controller
            name={`${name}.${index}`}
            rules={{ required: `${name} is required` }}
            render={({ field, fieldState: { error } }) => (
              <>
                <div className="flex flex-col w-full">
                  <Input
                    {...field}
                    label={`${label} ${index + 1}`}
                    placeholder={`${name} ${index + 1}`}
                    className="w-full"
                    labelPlacement="outside"
                    type={type}
                    size="lg"
                  />
                  {error && (
                    <small style={{ color: "red" }}>{error.message}</small>
                  )}
                </div>
              </>
            )}
          />
          <button onClick={() => remove(index)} className="ml-4 ">
            ✖
          </button>
        </div>
      ))}

      <button onClick={() => append("")}>+ Add</button>
    </div>
  );
};

export default CustomDynamicInput;
