/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@nextui-org/button";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useState, useRef } from "react";

type TFileUploadProps = {
  name: string;
  label?: string;
  type?: string;
  changeOnValue: any;
};

const CustomFileUpload = ({
  name,
  label,
  type = "file",
  changeOnValue,
}: TFileUploadProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });

  const [fileList, setFileList] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the input

  // Handle file selection
  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setFileList((prevFiles) => [...prevFiles, ...newFiles]);
      changeOnValue([...fileList, ...newFiles]); // Notify parent of the updated list
    }
  };

  // Handle file removal
  const handleRemove = (index: number) => {
    const updatedFileList = fileList.filter((_, i) => i !== index);
    setFileList(updatedFileList); // Update file list

    // Update parent with the updated file list
    changeOnValue(updatedFileList);

    // Clear the file input value to allow re-selecting the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ...field }, fieldState: { error } }) => (
          <>
            {/* Label */}
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

            {/* Input for file upload */}
            <input
              {...field}
              type={type}
              multiple
              ref={fileInputRef} // Attach ref to clear the input
              onChange={(e) => handleFileChange(e.target.files)} // Handle file selection
              style={{ display: "block", marginBottom: "8px" }}
            />

            {/* Display error message if validation fails */}
            {error && (
              <small style={{ color: "red" }}>{error?.message}</small>
            )}

            {/* Preview selected files with remove button */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px",marginTop:"20px" }}>
              {fileList.map((file, index) => (
                <div
                  key={index}
                  style={{ textAlign: "center", position: "relative" }}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <p style={{ fontSize: "12px" }}>{file.name}</p>
                  <Button
                    onClick={() => handleRemove(index)}
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      borderRadius: "50%",
                    }}
                  >
                    ✖
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      />
    </div>
  );
};

export default CustomFileUpload;
