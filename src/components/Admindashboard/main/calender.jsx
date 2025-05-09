import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function EnhancedCustomCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const header = () => (
    <div className="flex justify-between items-center px-6 py-3 bg-[#0D1B2A] text-white rounded-t-xl">
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="p-1 hover:bg-[#1784AD]/20 rounded-full transition-colors"
      >
        <FiChevronLeft className="text-xl" />
      </button>
      <h2 className="text-lg font-medium tracking-wide">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <button
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        className="p-1 hover:bg-[#1784AD]/20 rounded-full transition-colors"
      >
        <FiChevronRight className="text-xl" />
      </button>
    </div>
  );

  const daysOfWeek = () => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    return (
      <div className="grid grid-cols-7 text-xs font-medium text-center text-[#0D1B2A] bg-gray-100/80 uppercase tracking-wide py-2">
        {days.map((day, i) => (
          <div key={i} className="py-1">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const cells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isToday = isSameDay(day, new Date());
        const isSelected = isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, currentMonth);

        days.push(
          <div
            key={day}
            className={`text-center py-2 cursor-pointer transition-all duration-150
              ${isSelected ? "bg-[#1784AD] text-white font-medium" : ""}
              ${
                isToday && !isSelected
                  ? "border border-[#1784AD] font-medium"
                  : ""
              }
              ${!isCurrentMonth ? "text-gray-400" : "text-gray-700"}
              hover:bg-[#1784AD]/10 rounded-md`}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <span className={`text-sm ${isSelected ? "font-bold" : ""}`}>
              {format(day, "d")}
            </span>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div key={day} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="space-y-1">{rows}</div>;
  };

  return (
    <div className="w-full max-w-4xl mx-auto shadow-sm rounded-xl overflow-hidden border border-gray-200 bg-white">
      {header()}
      {daysOfWeek()}
      <div className="px-4 py-2">{cells()}</div>
    </div>
  );
}
