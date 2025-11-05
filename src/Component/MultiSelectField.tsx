import React, { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectFieldProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  options,
  selectedValues,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const toggleSelect = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="mb-4 relative">

      <div
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer bg-white flex flex-wrap gap-1"
      >
        {selectedValues.length === 0 ? (
          <span className="text-gray-400 text-sm">Select options...</span>
        ) : (
          selectedValues.map((value) => (
            <span
              key={value}
              className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full"
            >
              {options.find((opt) => opt.value === value)?.label}
            </span>
          ))
        )}
      </div>

      {open && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => toggleSelect(option.value)}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                selectedValues.includes(option.value)
                  ? "bg-blue-100 text-blue-700"
                  : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectField;
