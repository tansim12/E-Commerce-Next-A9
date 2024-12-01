import { Input } from "@nextui-org/input";
import { Controller } from "react-hook-form";
import "./labelColor.css"; // Ensure this CSS file is imported

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  isLabelColor?: boolean;
  placeholder?: string;
};

const CustomInput = ({
  type,
  name,
  label,
  isLabelColor,
  placeholder,
}: TInputProps) => {
  return (
    <div
      style={{ marginBottom: "10px" }}
      className={isLabelColor ? "custom-label" : ""}
    >
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            {label && (
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                {label}
              </label>
            )}

            <div>
              <Input
                {...field}
                type={type}
                id={name}
                size="lg"
                placeholder={placeholder}
                onChange={(e) => {
                  // Ensure the value is parsed as a number if type is "number"
                  const value =
                    type === "number"
                      ? parseFloat(e.target.value)
                      : e.target.value;
                  field.onChange(value);
                }}
                value={type === "number" ? field.value || 0 : field.value}
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </div>
          </>
        )}
      />
    </div>
  );
};

export default CustomInput;
