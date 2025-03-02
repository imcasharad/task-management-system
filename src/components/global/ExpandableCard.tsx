import { useState } from "react";
import { useTheme } from "../../store/ThemeContext";
import { Switch } from "@headlessui/react";

interface ExpandableCardProps {
  title: string;
  isMandatory: boolean;
  onToggleMandatory: (isMandatory: boolean) => void;
  onExpand: () => void;
  isExpanded: boolean;
  children?: React.ReactNode;
}

export const ExpandableCard = ({ title, isMandatory, onToggleMandatory, onExpand, isExpanded, children }: ExpandableCardProps) => {
  const { isDarkMode } = useTheme();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    if (isToggling) return;
    setIsToggling(true);
    try {
      await onToggleMandatory(!isMandatory);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className={`rounded-md border ${isDarkMode ? "dark:border-[#98C1D9] dark:bg-[#2D2D2D]" : "border-[#98C1D9] bg-white"} mb-4`}>
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={onExpand}>
        <div>
          <h5 className={`text-base font-medium ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>{title}</h5>
        </div>
        <div className="space-x-2 flex items-center">
          <Switch
            checked={isMandatory}
            onChange={handleToggle}
            disabled={isToggling}
            className={`${isMandatory ? (isDarkMode ? "bg-[#EE6C4D]" : "bg-[#EE6C4D]") : (isDarkMode ? "bg-gray-600" : "bg-gray-200")}
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 ${isDarkMode ? "dark:focus:ring-offset-[#2D2D2D]" : "focus:ring-offset-white"}`}
          >
            <span
              className={`${isMandatory ? "translate-x-6" : "translate-x-1"}
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
          <span className={isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}>Mandatory</span>
        </div>
      </div>
      {isExpanded && (
        <div className={`p-4 border-t ${isDarkMode ? "dark:border-[#98C1D9]" : "border-[#98C1D9]"}`}>
          {children}
        </div>
      )}
    </div>
  );
};