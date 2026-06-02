export default function StatCard({ label, value, change, icon: Icon, color = "blue" }) {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
    teal: "text-teal-600",
  };

  const bgClasses = {
    blue: "bg-blue-50",
    green: "bg-green-50",
    red: "bg-red-50",
    teal: "bg-teal-50",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${change > 0 ? "text-green-600" : "text-red-600"}`}>
              {change > 0 ? "+" : ""}{change}%
            </p>
          )}
        </div>
        {Icon && (
          <div className={`${bgClasses[color]} p-3 rounded-lg`}>
            <Icon className={`w-6 h-6 ${colorClasses[color]}`} />
          </div>
        )}
      </div>
    </div>
  );
}
