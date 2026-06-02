"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Card from "../components/Card";
import Badge from "../components/Badge";

// Mock data SAME
const TRADERS = [
  { id: 1, name: "Lisa Anderson", roi: 28.4, winRate: 78, followers: 6530, drawdown: 9.8, trades: 456, verified: true },
  { id: 2, name: "Emma Smith", roi: 25.2, winRate: 75, followers: 5120, drawdown: 8.5, trades: 382, verified: true },
  { id: 3, name: "Sarah Wilson", roi: 21.8, winRate: 71, followers: 3920, drawdown: 10.2, trades: 234, verified: true },
  { id: 4, name: "Michael Brown", roi: 15.6, winRate: 65, followers: 2150, drawdown: 14.1, trades: 189, verified: true },
  { id: 5, name: "Alex Johnson", roi: 18.5, winRate: 68, followers: 2340, drawdown: 12.3, trades: 201, verified: true },
  { id: 6, name: "Robert Lee", roi: 14.3, winRate: 62, followers: 1890, drawdown: 15.7, trades: 167, verified: true },
];

export default function LeaderboardPage() {
  const [sortBy, setSortBy] = useState("roi");
  const [filterVerified, setFilterVerified] = useState(false);

  const data = useMemo(() => {
    let list = filterVerified ? TRADERS.filter(t => t.verified) : TRADERS;

    return [...list].sort((a, b) => {
      if (sortBy === "roi") return b.roi - a.roi;
      if (sortBy === "followers") return b.followers - a.followers;
      if (sortBy === "winrate") return b.winRate - a.winRate;
      if (sortBy === "trades") return b.trades - a.trades;
      return 0;
    });
  }, [sortBy, filterVerified]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6 pb-10">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <Link href="/dashboard" className="text-xs text-teal-600">
            ← Dashboard
          </Link>
          <h1 className="text-xl font-semibold mt-2 text-gray-900">
            Leaderboard
          </h1>
          <p className="text-xs text-gray-400">
            Top performing traders
          </p>
        </div>

        {/* FILTERS */}
        <Card>
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-md px-3 py-2"
            >
              <option value="roi">ROI</option>
              <option value="followers">Followers</option>
              <option value="winrate">Win Rate</option>
              <option value="trades">Trades</option>
            </select>

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={filterVerified}
                onChange={(e) => setFilterVerified(e.target.checked)}
              />
              Verified only
            </label>

          </div>
        </Card>

        {/* TABLE */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="text-gray-400 border-b border-gray-100">
                <tr>
                  <th className="text-left py-3">Rank</th>
                  <th>Trader</th>
                  <th className="text-right">ROI</th>
                  <th className="text-right">Win</th>
                  <th className="text-right">DD</th>
                  <th className="text-right">Followers</th>
                  <th className="text-center">Trades</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {data.map((t, i) => (
                  <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50">

                    {/* RANK */}
                    <td className="py-3 text-gray-500">
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                    </td>

                    {/* NAME */}
                    <td className="font-medium text-gray-900">
                      {t.name}
                    </td>

                    {/* ROI */}
                    <td className="text-right text-green-600 font-medium">
                      +{t.roi}%
                    </td>

                    {/* WIN */}
                    <td className="text-right text-gray-700">
                      {t.winRate}%
                    </td>

                    {/* DD */}
                    <td className="text-right text-red-500">
                      -{t.drawdown}%
                    </td>

                    {/* FOLLOWERS */}
                    <td className="text-right text-gray-700">
                      {t.followers.toLocaleString()}
                    </td>

                    {/* TRADES */}
                    <td className="text-center text-gray-500">
                      {t.trades}
                    </td>

                    {/* STATUS */}
                    <td>
                      {t.verified ? (
                        <Badge variant="success">Verified</Badge>
                      ) : (
                        <Badge variant="default">Pending</Badge>
                      )}
                    </td>

                    {/* ACTION */}
                    <td className="text-sm">
  <Link
    href={`/traders/${t.id}`}
    className="text-teal-600 hover:text-teal-700"
  >
    View →
  </Link>
</td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </Card>

      </div>
    </div>
  );
}