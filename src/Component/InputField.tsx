import React from "react";

interface InputFieldProps {
  type?: string;
  name?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  required = false,
  error,
}) => {
  return (
    <div className="mb-4">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
