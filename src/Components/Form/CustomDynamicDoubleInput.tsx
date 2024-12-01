import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useFieldArray, Controller, useFormContext } from "react-hook-form";
import "./labelColor.css";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  isLabelColor?: boolean;
  placeholder?: string;
  option: string[];
};

const CustomDynamicDoubleInput = ({
  type,
  name,
  label,
  isLabelColor,
  option,
}: TInputProps) => {
  const { control } = useFormContext(); // Use useFormContext to access the form context

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });


    if (fields.length === 0) {
      const appendOptions = option.reduce((acc, item) => {
        acc[item] = ""; // Initialize each key with an empty string
        return acc;
      }, {} as { [key: string]: string }); // Define the accumulator type
      append(appendOptions); // Append an initial empty field
    }
 
  return (
    <div className={`${isLabelColor ? "custom-label" : ""}`}>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center mb-3">
          <div className="flex flex-col w-full">
            {option?.map((item,i) => (
              <Controller
              key={i}
                name={`${name}.${index}.${item}`}
                control={control}
                rules={{ required: `${item} is required` }}
                render={({ field, fieldState: { error } }) => (
                  <form
                    className="w-full my-3"
                  >
                    <Input
                      {...field}
                      placeholder={`Enter ${item} ${index + 1}`}
                      type={type}
                      size="md"
                      label={`${label} ${item} ${index + 1}`}
                      labelPlacement="outside"
                    />
                    {error && (
                    <small style={{ color: "red" }}>{error.message}</small>
                  )}
                  </form>
                )}
              />
            ))}

          
          </div>
          <Button    
            onClick={() => remove(index)}
            style={{ marginLeft: "10px" }}
          >
            ✖
          </Button>
        </div>
      ))}

      <Button  onClick={() => append({ question: "", answer: "" })} className="-mt-32">
        + Add {name}
      </Button>
    </div>
  );
};

export default CustomDynamicDoubleInput;
