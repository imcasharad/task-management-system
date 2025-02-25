import { ChangeEvent, useState } from "react";
import { useTheme } from "../../store/ThemeContext";

interface CheckboxProps {
  label: string;
  onChange: (checked: boolean) => void;
  initialChecked?: boolean;
  className?: string;
}

export const Checkbox = ({ label, onChange, initialChecked = false, className = "" }: CheckboxProps) => {
  const [checked, setChecked] = useState<boolean>(initialChecked);
  const { isDarkMode } = useTheme();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <label className={`flex items-center space-x-2 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"} ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className={`w-4 h-4 ${isDarkMode ? "dark:bg-[#2D2D2D] dark:border-[#98C1D9] dark:checked:bg-[#EE6C4D]" : "bg-white border-[#98C1D9] checked:bg-[#EE6C4D]"} focus:outline-none focus:ring-2 focus:ring-[#EE6C4D] rounded`}
      />
      <span>{label}</span>
    </label>
  );
};