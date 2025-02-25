import { ReactNode, ButtonHTMLAttributes } from "react";
import { useTheme } from "../../store/ThemeContext";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className = "", ...props }: ButtonProps) => {
  const { isDarkMode } = useTheme();

  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${isDarkMode ? "bg-[#3D5A80] text-white hover:bg-[#4A6D8E] dark:focus:ring-offset-[#2D2D2D]" : "bg-[#3D5A80] text-white hover:bg-[#4A6D8E] focus:ring-offset-white"} ${className}`}
    >
      {children}
    </button>
  );
};