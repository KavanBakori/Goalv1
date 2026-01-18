import React from 'react';
import { isSameMonth, getDate, format } from 'date-fns';
import { isDatePast, isDateToday, isDateFuture } from '../utils/dateUtils';


// Minimal class joiner
const cn = (...classes) => classes.filter(Boolean).join(' ');

const DayCell = ({ date, viewingMonth }) => {
    const isCurrentMonth = isSameMonth(date, viewingMonth);
    const isPast = isDatePast(date);
    const isToday = isDateToday(date);
    const isFuture = isDateFuture(date);

    const dayNumber = getDate(date);

    if (!isCurrentMonth) {
        return <div className="h-14 md:h-16 w-full" aria-hidden="true" />;
    }

    // Base styles
    // Past: text-gray-700, Cross overlay
    // Today: border-primary, text-white
    // Future: text-gray-300

    return (
        <div
            className={cn(
                "relative h-14 md:h-16 w-full flex items-center justify-center text-lg md:text-xl font-medium transition-colors",
                isPast && "text-gray-600",
                isToday && "text-white bg-primary/20 rounded-xl border border-primary shadow-[0_0_15px_rgba(255,59,59,0.3)]",
                isFuture && "text-gray-200",
                // isFuture && "hover:bg-white/5 rounded-xl cursor-default" // interactive
            )}
        >
            {dayNumber}

            {isPast && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-primary text-2xl font-light select-none">✕</span>
                </div>
            )}
        </div>
    );
};

export default DayCell;
