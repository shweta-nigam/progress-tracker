"use client";

import { useState, useEffect } from "react";
import CircularTimer from "./CircularTimer";
import PauseHistory from "./PauseHistory";

export default function ProgressTracker() {
  const [mounted, setMounted] = useState(false);

  const [title, setTitle] = useState("Task Name");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(5);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [elapsed, setElapsed] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  const [pauseLogs, setPauseLogs] = useState<number[]>([]);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem("tracker");

    if (!saved) return;

    try {
      const data = JSON.parse(saved);

      setTitle(data.title || "Task Name");
      setDays(data.days || 0);
      setHours(data.hours || 5);
      setMinutes(data.minutes || 0);
      setSeconds(data.seconds || 0);
      setElapsed(data.elapsed || 0);
      setPauseLogs(data.pauseLogs || []);
    } catch (err) {
      console.error("Failed to load tracker", err);
    }
  }, []);

  // Save data
  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem(
      "tracker",
      JSON.stringify({
        title,
        days,
        hours,
        minutes,
        seconds,
        elapsed,
        pauseLogs,
      }),
    );
  }, [mounted, title, days, hours, minutes, seconds, , elapsed, pauseLogs]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    if (targetSeconds <= 0) {
      alert("Please set a target time");
      return;
    }
    setElapsed(0);
    setPauseLogs([]);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setPauseLogs((prev) => [...prev, Date.now()]);
    setIsRunning(false);
  };

  const resumeTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setElapsed(0);
    setPauseLogs([]);
    setIsRunning(false);

    localStorage.removeItem("tracker");
  };

  const targetSeconds =
    days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;

  const percentage = Math.min((elapsed / targetSeconds) * 100, 100);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs}h ${mins}m ${secs}s`;
  };

  if (!mounted) return null;

  const TimeControl = ({
    label,
    value,
    setValue,
  }: {
    label: string;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
  }) => (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => setValue((prev) => prev + 1)}
        className="w-10 h-10 rounded-full bg-white/10 text-white"
      >
        +
      </button>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-20 text-center bg-white/10 text-white rounded-lg p-2"
      />

      <button
        onClick={() => setValue((prev) => Math.max(0, prev - 1))}
        className="w-10 h-10 rounded-full bg-white/10 text-white"
      >
        -
      </button>

      <span className="text-slate-300 text-sm">{label}</span>
    </div>
  );

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-[#00152d] via-[#002147] to-[#0f3b72] p-8">
  //     <div className="max-w-6xl mx-auto">
  //       {/* Header */}
  //       <div className="mb-10">
  //         <h1 className="text-5xl font-bold text-white">Progress Tracker</h1>

  //         <p className="text-slate-300 mt-2">
  //           Track your focused work sessions
  //         </p>
  //       </div>

  //       <div className="grid lg:grid-cols-3 gap-8">
  //         {/* Left */}
  //         <div className="lg:col-span-2">
  //           <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
  //             <input
  //               value={title}
  //               onChange={(e) => setTitle(e.target.value)}
  //               placeholder="Task Name"
  //               className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
  //             />

  //             <div className="mt-10 flex justify-center">
  //               <CircularTimer percentage={percentage} />
  //             </div>

  //             <div className="text-center mt-8">
  //               <h2 className="text-4xl font-bold text-white">
  //                 {formatTime(elapsed)}
  //               </h2>

  //               <p className="text-slate-300 mt-2">Elapsed Time</p>
  //             </div>

  //             {/* Hours */}

  //             <div className="mt-10 flex flex-wrap justify-center gap-8">
  //               <TimeControl label="Days" value={days} setValue={setDays} />

  //               <TimeControl label="Hours" value={hours} setValue={setHours} />

  //               <TimeControl
  //                 label="Minutes"
  //                 value={minutes}
  //                 setValue={setMinutes}
  //               />

  //               <TimeControl
  //                 label="Seconds"
  //                 value={seconds}
  //                 setValue={setSeconds}
  //               />
  //             </div>

  //             {/* Controls */}

  //             <div className="flex flex-wrap justify-center gap-4 mt-10">
  //               {!isRunning && elapsed === 0 && (
  //                 <button
  //                   onClick={startTimer}
  //                   className="px-8 py-4 rounded-2xl bg-green-600 text-white font-semibold"
  //                 >
  //                   Start Session
  //                 </button>
  //               )}

  //               {isRunning && (
  //                 <button
  //                   onClick={pauseTimer}
  //                   className="px-8 py-4 rounded-2xl bg-red-500 text-white font-semibold"
  //                 >
  //                   Pause
  //                 </button>
  //               )}

  //               {!isRunning && elapsed > 0 && (
  //                 <button
  //                   onClick={resumeTimer}
  //                   className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-semibold"
  //                 >
  //                   Resume
  //                 </button>
  //               )}

  //               <button
  //                 onClick={resetTimer}
  //                 className="px-8 py-4 rounded-2xl bg-white/10 text-white font-semibold"
  //               >
  //                 Reset
  //               </button>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Right */}

  //         <div className="space-y-6">
  //           <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
  //             <p className="text-slate-300 text-sm">Progress</p>

  //             <h2 className="text-4xl font-bold text-white mt-2">
  //               {Math.floor(percentage)}%
  //             </h2>
  //           </div>

  //           <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
  //             <p className="text-slate-300 text-sm">Target Time</p>

  //             <h2 className="text-4xl font-bold text-white mt-2">
  //               {days}d {hours}h {minutes}m {seconds}s
  //             </h2>
  //           </div>

  //           <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
  //             <p className="text-slate-300 text-sm">Pause Count</p>

  //             <h2 className="text-4xl font-bold text-white mt-2">
  //               {pauseLogs.length}
  //             </h2>
  //           </div>

  //           <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
  //             <PauseHistory logs={pauseLogs} />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

return (
  <div className="min-h-screen bg-gradient-to-br from-[#00152d] via-[#002147] to-[#0f3b72] p-4 sm:p-6 lg:p-8">
    <div className="max-w-6xl mx-auto">
      {/* Header */}

      <div className="mb-6 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Progress Tracker
        </h1>

        <p className="text-slate-300 mt-2 text-sm sm:text-base">
          Track your focused work sessions
        </p>
      </div>

      {/* Layout */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Card */}

        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Name"
              className="w-full p-3 sm:p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none text-sm sm:text-base"
            />

            {/* Timer */}

            <div className="mt-6 sm:mt-10 flex justify-center overflow-hidden">
              <CircularTimer percentage={percentage} />
            </div>

            {/* Elapsed */}

            <div className="text-center mt-6 sm:mt-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white break-words">
                {formatTime(elapsed)}
              </h2>

              <p className="text-slate-300 mt-2 text-sm sm:text-base">
                Elapsed Time
              </p>
            </div>

            {/* Time Controls */}

            <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <TimeControl
                label="Days"
                value={days}
                setValue={setDays}
              />

              <TimeControl
                label="Hours"
                value={hours}
                setValue={setHours}
              />

              <TimeControl
                label="Minutes"
                value={minutes}
                setValue={setMinutes}
              />

              <TimeControl
                label="Seconds"
                value={seconds}
                setValue={setSeconds}
              />
            </div>

            {/* Controls */}

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
              {!isRunning && elapsed === 0 && (
                <button
                  onClick={startTimer}
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-2xl bg-[--primary-color] text-white font-semibold bg-border-white-400"
                >
                  Start Session
                </button>
              )}

              {isRunning && (
                <button
                  onClick={pauseTimer}
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-2xl bg-red-500 text-white font-semibold"
                >
                  Pause
                </button>
              )}

              {!isRunning && elapsed > 0 && (
                <button
                  onClick={resumeTimer}
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-2xl bg-blue-600 text-white font-semibold"
                >
                  Resume
                </button>
              )}

              <button
                onClick={resetTimer}
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-2xl bg-white/10 text-white font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}

        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6">
            <p className="text-slate-300 text-sm">
              Progress
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              {Math.floor(percentage)}%
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6">
            <p className="text-slate-300 text-sm">
              Target Time
            </p>

            <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mt-2 break-words">
              {days}d {hours}h {minutes}m {seconds}s
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6">
            <p className="text-slate-300 text-sm">
              Pause Count
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              {pauseLogs.length}
            </h2>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6">
            <PauseHistory logs={pauseLogs} />
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
