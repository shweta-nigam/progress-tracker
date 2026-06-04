"use client";

import { useState, useEffect } from "react";
import CircularTimer from "./CircularTimer";
import PauseHistory from "./PauseHistory";

export default function ProgressTracker() {
  const [mounted, setMounted] = useState(false);

  const [title, setTitle] = useState("DSA Practice");
  const [targetHours, setTargetHours] = useState(5);
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
      setTargetHours(data.targetHours || 5);
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
        targetHours,
        elapsed,
        pauseLogs,
      }),
    );
  }, [mounted, title, targetHours, elapsed, pauseLogs]);

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

  const targetSeconds = targetHours * 60 * 60;

  const percentage = Math.min((elapsed / targetSeconds) * 100, 100);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs}h ${mins}m ${secs}s`;
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00152d] via-[#002147] to-[#0f3b72] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-white">Progress Tracker</h1>

          <p className="text-slate-300 mt-2">
            Track your focused work sessions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Name"
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
              />

              <div className="mt-10 flex justify-center">
                <CircularTimer percentage={percentage} />
              </div>

              <div className="text-center mt-8">
                <h2 className="text-4xl font-bold text-white">
                  {formatTime(elapsed)}
                </h2>

                <p className="text-slate-300 mt-2">Elapsed Time</p>
              </div>

              {/* Hours */}

              <div className="mt-8 flex justify-center items-center gap-6">
                <button
                  onClick={() =>
                    setTargetHours((prev) => Math.max(1, prev - 1))
                  }
                  className="h-12 w-12 rounded-full bg-white/10 text-white text-xl"
                >
                  −
                </button>

                <div className="text-center">
                  <div className="text-white text-3xl font-bold">
                    {targetHours}
                  </div>

                  <div className="text-slate-300">Target Hours</div>
                </div>

                <button
                  onClick={() => setTargetHours((prev) => prev + 1)}
                  className="h-12 w-12 rounded-full bg-white/10 text-white text-xl"
                >
                  +
                </button>
              </div>

              {/* Controls */}

              <div className="flex flex-wrap justify-center gap-4 mt-10">
                {!isRunning && elapsed === 0 && (
                  <button
                    onClick={startTimer}
                    className="px-8 py-4 rounded-2xl bg-green-600 text-white font-semibold"
                  >
                    Start Session
                  </button>
                )}

                {isRunning && (
                  <button
                    onClick={pauseTimer}
                    className="px-8 py-4 rounded-2xl bg-red-500 text-white font-semibold"
                  >
                    Pause
                  </button>
                )}

                {!isRunning && elapsed > 0 && (
                  <button
                    onClick={resumeTimer}
                    className="px-8 py-4 rounded-2xl bg-blue-600 text-white font-semibold"
                  >
                    Resume
                  </button>
                )}

                <button
                  onClick={resetTimer}
                  className="px-8 py-4 rounded-2xl bg-white/10 text-white font-semibold"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <p className="text-slate-300 text-sm">Progress</p>

              <h2 className="text-4xl font-bold text-white mt-2">
                {Math.floor(percentage)}%
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <p className="text-slate-300 text-sm">Target Time</p>

              <h2 className="text-4xl font-bold text-white mt-2">
                {targetHours}h
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <p className="text-slate-300 text-sm">Pause Count</p>

              <h2 className="text-4xl font-bold text-white mt-2">
                {pauseLogs.length}
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <PauseHistory logs={pauseLogs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
