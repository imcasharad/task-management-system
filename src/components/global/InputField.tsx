import { ChangeEvent, useState } from "react";
import { useTheme } from "../../store/ThemeContext";

interface InputFieldProps {
  placeholder: string;
  onChange: (value: string) => void; // Ensure onChange accepts a string
  initialValue?: string;
  name?: string;
  required?: boolean;
  className?: string;
  type?: string;
}

export const InputField = ({ placeholder, onChange, initialValue = "", name, required, className = "", type = "text" }: InputFieldProps) => {
  const [value, setValue] = useState<string>(initialValue);
  const { isDarkMode } = useTheme();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue); // Call onChange with the new value
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      name={name}
      required={required}
      className={`w-full p-2 rounded-md border ${isDarkMode ? "dark:border-[#98C1D9] dark:bg-[#2D2D2D] dark:text-white" : "border-[#98C1D9] bg-white text-[#2D2D2D]"} focus:outline-none focus:ring-2 focus:ring-[#EE6C4D] ${className}`}
    />
  );
};