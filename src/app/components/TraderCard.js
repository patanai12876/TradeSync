import Link from "next/link";
import Badge from "./Badge";
import Button from "./Button";
import { FiTrendingUp, FiAward, FiUsers } from "react-icons/fi";

export default function TraderCard({ trader, onCopy }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 flex items-center justify-center text-white font-bold">
            {trader.name?.charAt(0) || "T"}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{trader.name}</h3>
            <p className="text-xs text-gray-500">@{trader.username || "trader"}</p>
          </div>
        </div>
        {trader.isVerified && (
          <Badge variant="verified">✓ Verified</Badge>
        )}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-200">
        <div>
          <p className="text-xs text-gray-500 mb-1">ROI (Monthly)</p>
          <p className="text-lg font-bold text-green-600">{trader.roi || "N/A"}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Win Rate</p>
          <p className="text-lg font-bold text-gray-900">{trader.winRate || "N/A"}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Max Drawdown</p>
          <p className="text-lg font-bold text-red-600">{trader.maxDrawdown || "N/A"}%</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1 text-gray-600">
          <FiUsers size={16} />
          <span>{trader.followers || 0} followers</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            trader.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
            trader.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {trader.riskLevel || 'Medium'} Risk
          </span>
        </div>
      </div>

      {/* Action */}
      <div className="flex gap-2">
        <Link
          href={`/traders/${trader.id}`}
          className="flex-1"
        >
          <button className="w-full py-2 border border-teal-500 text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition">
            View Profile
          </button>
        </Link>
        <Button
          variant="primary"
          size="md"
          className="flex-1"
          onClick={() => onCopy && onCopy(trader)}
        >
          Copy
        </Button>
      </div>
    </div>
  );
}
