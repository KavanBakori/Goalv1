import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Stats from './components/Stats';
import Calendar from './components/Calendar';
import { getYearProgress, getMonthProgress } from './utils/dateUtils';

function App() {
  const [data, setData] = useState({
    daysRemaining: 0,
    daysGone: 0,
    daysRemainingInMonth: 0
  });

  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const update = () => {
      const year = getYearProgress();
      const month = getMonthProgress();
      setData({ ...year, ...month });
    };

    update();
    const interval = setInterval(update, 60000); // every minute check

    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    // Show the install prompt
    installPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await installPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    setInstallPrompt(null);
  };

  return (
    <div className="h-[100dvh] bg-background text-white flex flex-col justify-center overflow-hidden w-full shadow-2xl relative">
      {/* Background subtle gradient or glow */}
      <div className="absolute top-0 left-0 right-0 h-48 md:h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      {/* Install Button (Hidden per request) */}
      {/* Install Button (Always visible logic) */}
      <button
        onClick={handleInstallClick}
        className={`absolute top-4 right-4 z-50 p-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-full transition-colors animate-pulse-slow active:scale-95 ${!installPrompt ? 'opacity-50' : ''}`}
        aria-label="Install App"
        title={installPrompt ? "Install App" : "App Installed / Not Available"}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>

      <Header daysRemaining={data.daysRemaining} daysRemainingInMonth={data.daysRemainingInMonth} />
      <Stats daysGone={data.daysGone} />
      <Calendar />
    </div>
  );
}

export default App;
