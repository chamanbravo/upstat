export default function HeartbeatSummary({ heartbeat }: { heartbeat: any }) {
  function fillArray(arr: any) {
    while (arr?.length < 10) {
      arr.push(undefined);
    }
    return arr;
  }
  const finalHeartbeat = fillArray(heartbeat || [])?.reverse();

  return (
    <div className="flex h-full gap-1">
      {finalHeartbeat?.map((h: any, i: number) => (
        <div
          key={i}
          className={`h-4 w-1 rounded-[2px] ${
            h?.status
              ? h?.status === "green"
                ? "bg-green-400"
                : "bg-red-400"
              : "bg-gray-400"
          } ${h && "hover:scale-125"} `}
          title={
            h?.status && h?.timestamp
              ? `${new Date(h?.timestamp).toLocaleString()} - ${h?.status_code}`
              : ""
          }
        />
      ))}
    </div>
  );
}
