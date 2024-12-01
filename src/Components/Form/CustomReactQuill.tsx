"use client"

import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import React Quill styles
import "./labelColor.css"; // Ensure this CSS file is imported
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
type TInputProps = {
  name: string;
  label?: string;
  isLabelColor?: boolean;
  placeholder?: string;
};

const CustomReactQuill = ({
  name,
  label,
  isLabelColor,
  placeholder,
}: TInputProps) => {
  const toolbarOptions = [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"], // Remove formatting button
  ];

  return (
    <div
      style={{ marginBottom: "10px" }}
      className={`${isLabelColor && "custom-label"}`}
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
              <ReactQuill
                {...field}
                onChange={(content: any) => field.onChange(content)} // Handle change via field's onChange
                value={field.value || ""} // Ensure value is managed properly
                placeholder={placeholder}
                className="h-56 mb-10"
                modules={{
                  toolbar: toolbarOptions, // Custom toolbar options
                }}
                theme="snow" // React Quill theme (can be customized)
              />
              {error && <small style={{ color: "red" }}>{error.message}</small>}
            </div>
          </>
        )}
      />
    </div>
  );
};

export default CustomReactQuill;
