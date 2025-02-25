import { ChangeEvent, useState } from "react";
import { useTheme } from "../../store/ThemeContext";

interface InputFieldProps {
  placeholder: string;
  onChange: (value: string) => void;
  initialValue?: string;
  type?: string;
  className?: string;
}

export const InputField = ({ placeholder, onChange, initialValue = "", type = "text", className = "" }: InputFieldProps) => {
  const [value, setValue] = useState<string>(initialValue);
  const { isDarkMode } = useTheme();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={`w-full p-2 rounded-md border ${isDarkMode ? "border-[#98C1D9] bg-[#2D2D2D] text-white" : "border-[#98C1D9] bg-white text-[#2D2D2D]"} focus:outline-none focus:ring-2 focus:ring-[#EE6C4D] ${className}`}
    />
  );
};