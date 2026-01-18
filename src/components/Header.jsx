import React from 'react';

const Header = ({ daysRemaining }) => {
    return (
        <header className="flex flex-col items-center justify-center pt-4 pb-2 md:pt-10 md:pb-6 animate-fade-in shrink-0">
            <h1 className="text-6xl md:text-9xl font-bold text-primary tracking-tighter tabular-nums leading-none">
                {daysRemaining}
            </h1>
            <p className="text-gray-500 uppercase text-[10px] md:text-xs font-medium tracking-[0.2em] mt-1 opacity-80">
                Days Remaining
            </p>
        </header>
    );
};

export default Header;
