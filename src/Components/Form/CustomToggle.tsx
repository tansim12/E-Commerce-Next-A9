/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";
import { Switch } from "@nextui-org/switch";

type TCustomToggleProps = {
  name: string;
  label: string;
  defaultValue?: boolean;
};

const CustomToggle = ({
  name,
  label,
  defaultValue = false,
}: TCustomToggleProps) => {
  return (
    <div className="mb-4">
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
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Switch
            checked={field.value}
            isSelected={field.value}
            onChange={(e:any) => field.onChange(e.target.checked)}
          >
         
          </Switch>
        )}
      />
    </div>
  );
};

export default CustomToggle;
