"use client";

import React, { useState, useRef, useEffect } from "react";

interface Option {
  id: number;
  name: string;
}

interface CustomDropdownProps {
  options: Option[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selectedId,
  onSelect,
  placeholder = "Select...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.id === selectedId);

  const toggleOpen = () => setIsOpen((open) => !open);

  const handleSelect = (id: number | null) => {
    onSelect(id);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative w-full cursor-pointer select-none"
    >
      <div
        onClick={toggleOpen}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-snow px-4 py-3 rounded-lg shadow-md flex justify-between items-center"
      >
        <span>{selectedOption ? selectedOption.name : placeholder}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {isOpen && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-snow shadow-lg ring-1 ring-black ring-opacity-5">
          <li
            onClick={() => handleSelect(null)}
            className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
          >
            Any
          </li>
          {options.map((opt) => (
            <li
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`px-4 py-2 hover:bg-indigo-100 cursor-pointer ${
                selectedId === opt.id ? "bg-indigo-200 font-semibold" : ""
              }`}
            >
              {opt.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
