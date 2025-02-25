import { ReactNode } from "react";
import { useTheme } from "../../store/ThemeContext";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md ${isDarkMode ? "dark:bg-[#2D2D2D] dark:border-gray-700 dark:text-[#98C1D9]" : ""} ${className}`}
    >
      {children}
    </div>
  );
};