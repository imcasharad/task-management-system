import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export const Footer = () => {
  const currentYear = new Date().getFullYear(); // 2025

  return (
    <footer className="bg-[#2D2D2D] text-white p-2 text-center shadow-inner w-full">
      <div className="flex justify-center space-x-2 mb-1">
        <button className="p-1 rounded-md hover:bg-[#1D1D1D] focus:outline-none">
          <ArrowLeftIcon className="h-4 w-4 text-[#EE6C4D]" /> Back
        </button>
        <button className="p-1 rounded-md hover:bg-[#1D1D1D] focus:outline-none">
          Next <ArrowRightIcon className="h-4 w-4 text-[#EE6C4D]" />
        </button>
      </div>
      <p className="text-xs md:text-sm">© {currentYear} Task Management System. All rights reserved.</p>
    </footer>
  );
};