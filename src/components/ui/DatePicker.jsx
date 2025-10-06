import React, { useState, useRef, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
  startOfDay,
} from "date-fns";

const DatePicker = ({
  value,
  onChange,
  placeholder = "Select date",
  minDate = new Date(),
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null
  );
  const dropdownRef = useRef(null);

  // Chiudi il dropdown quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Aggiorna la data selezionata quando cambia il value prop
  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    }
  }, [value]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onChange(format(date, "yyyy-MM-dd"));
    setIsOpen(false);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const isDateDisabled = (date) => {
    return isBefore(date, startOfDay(minDate));
  };

  // Genera i giorni del mese
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Nomi dei giorni della settimana
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Input */}
      <input
        type="text"
        value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
        onClick={toggleDropdown}
        readOnly
        className={`border-b border-gray-300 text-gray-900 text-sm block w-full p-2.5 focus:outline-none focus:border-blue-500 cursor-pointer bg-transparent ${className}`}
        placeholder={placeholder}
      />

      {/* Dropdown Calendar */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 bg-white border border-gray-300 shadow-lg mt-1 rounded-lg w-80">
          {/* Header del calendario */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              type="button"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <span className="text-lg font-semibold text-gray-800">
              {format(currentMonth, "MMMM yyyy")}
            </span>

            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              type="button"
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Giorni della settimana */}
          <div className="grid grid-cols-7 gap-1 p-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Giorni del mese */}
          <div className="grid grid-cols-7 gap-1 p-2">
            {/* Spazi vuoti per allineare il primo giorno */}
            {Array.from({ length: startOfMonth(currentMonth).getDay() }).map(
              (_, index) => (
                <div key={`empty-${index}`} className="h-8" />
              )
            )}

            {days.map((day) => {
              const isDisabled = isDateDisabled(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isCurrentDay = isToday(day);

              return (
                <button
                  key={day.toString()}
                  onClick={() => !isDisabled && handleDateSelect(day)}
                  disabled={isDisabled}
                  className={`
                    h-8 text-sm rounded-lg transition-colors
                    ${
                      isSelected
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : isCurrentDay
                        ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                        : isCurrentMonth
                        ? "text-gray-900 hover:bg-gray-100"
                        : "text-gray-400 hover:bg-gray-50"
                    }
                    ${
                      isDisabled
                        ? "cursor-not-allowed text-gray-300 hover:bg-transparent"
                        : "cursor-pointer"
                    }
                  `}
                  type="button"
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>

          {/* Footer con azioni rapide */}
          <div className="flex justify-between p-3 border-t border-gray-200">
            <button
              onClick={() => handleDateSelect(startOfDay(new Date()))}
              className="px-3 py-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
              type="button"
            >
              Today
            </button>
            <button
              onClick={() => {
                setSelectedDate(null);
                onChange("");
                setIsOpen(false);
              }}
              className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 font-medium"
              type="button"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default DatePicker;
