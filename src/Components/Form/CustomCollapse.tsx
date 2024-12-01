/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion, AccordionItem,RadioGroup, Radio } from "@nextui-org/react";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type CustomCollapseProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  customStyle?: string;
  disabled?: boolean;
  changeOnValue: (value: any) => void;
};

const CustomCollapse: React.FC<CustomCollapseProps> = ({
  label,
  name,
  options,
  customStyle,
  disabled,
  changeOnValue,
}) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    changeOnValue(inputValue);
  }, [inputValue, changeOnValue]);

  return (
    <div className={customStyle}>
      <Accordion isCompact={false} variant="bordered" >
        <AccordionItem title={label} key={name} aria-label={label} >
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                // disabled={disabled}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {options?.map((item) => (
                  <Radio
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                    style={{ color: "#ffb84b" }} // Gold color for radio labels
                  >
                    {item.label}
                  </Radio>
                ))}
              </RadioGroup>
            )}
          />
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CustomCollapse;
