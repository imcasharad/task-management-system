import { ReactNode } from "react";
import { useTheme } from "../../store/ThemeContext";

interface FormCardProps {
  children: ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent) => void;
}

export const FormCard = ({ children, className = "", onSubmit }: FormCardProps) => {
  const { isDarkMode } = useTheme();

  return (
    <form onSubmit={onSubmit} className={`w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md ${isDarkMode ? "dark:bg-[#2D2D2D] dark:border-gray-700 dark:text-[#98C1D9]" : ""} ${className}`}>
      {children}
    </form>
  );
};