export default function LoadingSkeleton({ count = 3, type = "card" }) {
  if (type === "card") {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-gray-200 h-24 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (type === "chart") {
    return <div className="bg-gray-200 h-64 rounded-lg animate-pulse" />;
  }

  if (type === "table") {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 h-12 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  return <div className="bg-gray-200 h-10 rounded-lg animate-pulse" />;
}
