import {
    startOfYear,
    endOfYear,
    differenceInDays,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameDay,
    isBefore,
    isAfter,
    format,
    addMonths,
    subMonths,
    getDaysInMonth
} from 'date-fns';

export const getYearProgress = () => {
    const now = new Date();
    const start = startOfYear(now);
    const end = endOfYear(now);

    // days gone: diff between now and start
    const daysGone = differenceInDays(now, start); // 0-indexed usually, so +1 if "Day 1" is Jan 1. 
    // differenceInDays(jan2, jan1) is 1. So Jan 1 is 0 days gone? 
    // "Days Gone (from Jan 1 to today)". If today is Jan 1, days gone 0? Or 1? Usually 1.
    // "Remaining Days": diff between end and now.

    const daysRemaining = differenceInDays(end, now);

    return {
        daysGone: daysGone + 1, // Include today in gone?? Or today is current?
        // Let's assume Days Gone includes today if it's passed? Or excludes?
        // Usually "Days Gone" means past. "Remaining" means future.
        // If I am on Jan 1: Days remaining 364 (or 365 leap). Days visible: 1.
        // Let's stick to standard difference.
        daysGone: differenceInDays(now, start) + 1,
        daysRemaining: differenceInDays(end, now),
    };
};

export const getMonthProgress = () => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    return {
        daysRemainingInMonth: differenceInDays(end, now),
        daysGoneInMonth: differenceInDays(now, start) + 1,
    };
};

export const getCalendarDays = (date) => {
    const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 }); // Monday start
    const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });

    return eachDayOfInterval({ start, end });
};

export const isDatePast = (date) => {
    const today = new Date();
    // Check if date is strictly before today (ignoring time, checking date string)
    return isBefore(date, today) && !isSameDay(date, today);
};

export const isDateFuture = (date) => {
    const today = new Date();
    return isAfter(date, today) && !isSameDay(date, today);
};

export const isDateToday = (date) => isSameDay(date, new Date());
