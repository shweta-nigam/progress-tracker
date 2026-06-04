"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function CircularTimer({
  percentage,
}: {
  percentage: number;
}) {
  const progress = Math.min(percentage, 100);

  const data = [
    {
      name: "Completed",
      value: progress,
    },
    {
      name: "Remaining",
      value: 100 - progress,
    },
  ];

  return (
    <div className="relative w-[320px] h-[320px] mx-auto">

      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            innerRadius={105}
            outerRadius={140}
            stroke="none"
          >
            <Cell fill="#4080c9" />
            <Cell fill="rgba(255,255,255,0.08)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center Content */}

      <div
        className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
        "
      >
        <h2 className="text-5xl font-bold text-white">
          {Math.floor(progress)}%
        </h2>

        <p className="text-slate-300 mt-2">
          Completed
        </p>
      </div>

    </div>
  );
}