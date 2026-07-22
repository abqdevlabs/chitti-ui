import React from "react";

interface MonthSelectProps {
  /** Array of month names passed from parent (e.g., ['January', 'February', ...]) */
  months: string[];
  /** Currently selected month value */
  value: string;
  /** Callback returning the newly selected month string */
  onChange: (selectedMonth: string) => void;
  /** Optional placeholder text when no month is selected */
  placeholder?: string;
  /** Optional label text */
  label?: string;
  /** Optional disabled state */
  disabled?: boolean;
}

export const MonthSelect: React.FC<MonthSelectProps> = ({
  months,
  value,
  onChange,
  placeholder = "Select a month",
  label,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full max-w-xs">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 
                   rounded-md shadow-sm text-sm text-gray-900 dark:text-gray-100 focus:outline-none 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 
                   disabled:cursor-not-allowed transition-colors"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};
