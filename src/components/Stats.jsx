import React from 'react';

const Stats = ({ daysGone, daysRemainingInMonth }) => {
    return (
        <div
            className="grid grid-cols-2 gap-4 w-full px-2 md:px-8 mb-4 border-b border-gray-800/50 pb-4 animate-slide-up shrink-0"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        >
            <div className="flex flex-col items-center">
                <span className="text-xl md:text-3xl font-semibold text-white tabular-nums">{daysGone}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium mt-0.5">Days Gone</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xl md:text-3xl font-semibold text-white tabular-nums">{daysRemainingInMonth}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium mt-0.5">Left This Month</span>
            </div>
        </div>
    );
};

export default Stats;
