import { ReactNode, useEffect } from "react";
import { Dialog, Transition, DialogTitle, DialogBackdrop } from "@headlessui/react"; // Use Transition for animations if needed
import { useTheme } from "../../store/ThemeContext";
import { Fragment } from "react"; // Add for Transition

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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-cente    r justify-center min-h-screen">
          {/* <div className="fixed inset-0 bg-black/30" /> */}
          <DialogBackdrop className="fixed inset-0 bg-black/30" /> {/* Use Dialog.Backdrop for accessibility */}

          <div className={`relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-auto my-8  border border-gray-200 ${isDarkMode ? "dark:bg-[#2D2D2D] dark:border-gray-700 dark:text-[#98C1D9]" : ""}`}>
            {title && (
              <DialogTitle className={`text-lg font-bold mb-4 ${isDarkMode ? "dark:text-[#98C1D9]" : "text-[#2D2D2D]"}`}>
                {title}
              </DialogTitle>
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
    </Transition>
  );
};