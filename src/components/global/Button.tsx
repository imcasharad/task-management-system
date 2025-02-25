import { ReactNode, MouseEvent } from "react";
import { useTheme } from "../../store/ThemeContext"; // Import useTheme

interface ButtonProps {
  children: ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const Button = ({ children, onClick, className = "" }: ButtonProps) => {
  const { isDarkMode } = useTheme();

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-md ${isDarkMode ? "bg-[#3D5A80] text-white hover:bg-[#305179]" : "bg-[#3D5A80] text-white hover:bg-[#305179]"} ${className} focus:outline-none`}
    >
      {children}
    </button>
  );
};