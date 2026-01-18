import React, { useState } from 'react';
import { addMonths, subMonths, format } from 'date-fns';
import { getCalendarDays } from '../utils/dateUtils';
import { useSwipe } from '../hooks/useSwipe';
import DayCell from './DayCell';

const Calendar = () => {
    const [viewingDate, setViewingDate] = useState(new Date());

    const handlePrevMonth = () => setViewingDate(curr => subMonths(curr, 1));
    const handleNextMonth = () => setViewingDate(curr => addMonths(curr, 1));

    const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
        onSwipeLeft: handleNextMonth,
        onSwipeRight: handlePrevMonth,
    });

    const days = getCalendarDays(viewingDate);
    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return (
        <div
            className="flex-1 w-full max-w-full mx-auto px-1 flex flex-col overflow-hidden animate-slide-up min-h-0"
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div className="flex items-center justify-between mb-4 md:mb-8 px-2 select-none shrink-0">
                <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
                    {format(viewingDate, 'MMMM yyyy')}
                </h2>
                <div className="flex gap-4">
                    <button onClick={handlePrevMonth} className="p-2 text-gray-500 hover:text-white transition-colors" aria-label="Previous Month">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button onClick={handleNextMonth} className="p-2 text-gray-500 hover:text-white transition-colors" aria-label="Next Month">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-1 shrink-0">
                {weekDays.map((d, i) => (
                    <div key={i} className="text-center text-[10px] md:text-xs text-gray-500 font-medium">
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5 md:gap-y-4 md:gap-x-2 flex-1 content-start transition-all duration-300 ease-in-out pb-2 min-h-0">
                {days.map((day, i) => (
                    <DayCell key={day.toISOString()} date={day} viewingMonth={viewingDate} />
                ))}
            </div>
        </div>
    );
};

export default Calendar;
