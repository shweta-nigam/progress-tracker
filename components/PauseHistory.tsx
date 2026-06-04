export default function PauseHistory({
  logs,
}: {
  logs: number[];
}) {
  return (
    <div className="mt-10">

      <h2 className="text-white text-xl mb-4">
        Pause History
      </h2>

      <div className="space-y-3">

        {logs.map((log, index) => (
          <div
            key={index}
            className="bg-slate-800 text-white p-3 rounded-xl"
          >
            Paused At :
            {" "}
            {new Date(
              log
            ).toLocaleString()}
          </div>
        ))}

      </div>
    </div>
  );
}