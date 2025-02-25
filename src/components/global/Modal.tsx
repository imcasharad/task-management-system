import { ReactNode, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useTheme } from "../../store/ThemeContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const { isDarkMode } = useTheme();

  // Handle closing on Escape key or outside click
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-label={title || "Modal"}
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <div className={`relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-auto my-8 border border-gray-200 ${isDarkMode ? "dark:bg-[#2D2D2D] dark:border-gray-700 dark:text-[#98C1D9]" : ""}`}>
          {title && (
            <Dialog.Title className={`text-lg font-bold mb-4 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>
              {title}
            </Dialog.Title>
          )}
          {children}
          <button
            onClick={onClose}
            className={`absolute top-2 right-2 p-2 rounded-md ${isDarkMode ? "dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-[#98C1D9]" : "bg-gray-200 hover:bg-gray-300 text-gray-600"} focus:outline-none`}
          >
            ✕
          </button>
        </div>
      </div>
    </Dialog>
  );
};