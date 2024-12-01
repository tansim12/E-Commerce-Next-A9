import { Controller } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/select";
import "./labelColor.css";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  customStyle?: string;
  disabled?: boolean;
  mode?: "multiple" | undefined; // multiple selection mode
  isLabelColor?: boolean;
  placeholder?: string;
  defaultValue?: string | string[]; // Allow default value to be a string or array
};

const CustomSelect = ({
  label,
  name,
  options = [], // Default to an empty array
  disabled,
  mode,
  isLabelColor,
  placeholder,
  defaultValue,
}: TPHSelectProps) => {
  return (
    <div className={`${isLabelColor ? "custom-label" : ""}`}>
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

            <Select
              selectionMode={mode}
              disallowEmptySelection
              aria-label={label}
              size="lg"
              disabled={disabled}
              defaultSelectedKeys={defaultValue} // Set default selected keys here
              placeholder={placeholder}
              {...field}
              className={isLabelColor ? "custom-dropdown" : ""}
              onSelectionChange={(selected: any) => {
                if (mode === "multiple") {
                  const selectedArray = Array.from(selected) as string[];
                  field.onChange(selectedArray); // Return an array of strings
                } else {
                  field.onChange(selected);
                }
              }}
            >
              {/* Render the Select items */}
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>

            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </>
        )}
      />
    </div>
  );
};

export default CustomSelect;
