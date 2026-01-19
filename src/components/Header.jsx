import React from 'react';

const Header = ({ daysRemaining, daysRemainingInMonth }) => {
    return (
        <header className="flex flex-col items-center justify-center pt-4 pb-2 md:pt-10 md:pb-6 animate-fade-in shrink-0">
            <div className="flex items-center justify-center gap-4 md:gap-8">
                {/* Year Days Remaining */}
                <div className="flex flex-col items-center">
                    <h1 className="text-6xl md:text-9xl font-bold text-primary tracking-tighter tabular-nums leading-none">
                        {daysRemaining}
                    </h1>
                    <p className="text-gray-500 uppercase text-[10px] md:text-xs font-medium tracking-[0.2em] mt-1 opacity-80">
                        This Year
                    </p>
                </div>

                {/* Vertical Separator */}
                <div className="h-16 md:h-28 w-px bg-gray-700/50" />

                {/* Month Days Remaining */}
                <div className="flex flex-col items-center">
                    <h2 className="text-6xl md:text-9xl font-bold text-primary tracking-tighter tabular-nums leading-none">
                        {daysRemainingInMonth}
                    </h2>
                    <p className="text-gray-500 uppercase text-[10px] md:text-xs font-medium tracking-[0.2em] mt-1 opacity-80">
                        This Month
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;
