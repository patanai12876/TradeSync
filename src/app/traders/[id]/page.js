"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from "recharts";
import Card from "../../components/Card";
import StatCard from "../../components/StatCard";
import Badge from "../../components/Badge";
import FormInput from "../../components/FormInput";

// Mock data SAME
const TRADER_DATA = {
  1: {
    name: "Alex Johnson",
    username: "alexj",
    bio: "Professional forex trader",
    strategy: "Swing trading",
    roi: 18.5,
    winRate: 68,
    maxDrawdown: 12.3,
    followers: 2340,
    managedCapital: 2340000,
    riskLevel: "Medium",
    isVerified: true,
    totalTrades: 1240,
    avgProfit: 245.5,
    avgLoss: -120.3,
    sharpeRatio: 1.45,
  },
};

const EQUITY_CURVE = [
  { date: "Jan", value: 10000 },
  { date: "Feb", value: 12000 },
  { date: "Mar", value: 15000 },
  { date: "Apr", value: 16800 },
];

const RECENT_TRADES = [
  { symbol: "EUR/USD", type: "Buy", entry: 1.0850, exit: 1.0920, profit: 70, date: "2025-03-19" },
  { symbol: "GBP/USD", type: "Sell", entry: 1.2650, exit: 1.2580, profit: 70, date: "2025-03-18" },
];

export default function TraderProfilePage({ params }) {
  const { id } = React.use(params);
  const traderId = parseInt(id, 10);
  const trader = TRADER_DATA[traderId];

  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [copyAmount, setCopyAmount] = useState("");
  const [copyMode, setCopyMode] = useState("proportional");

  if (!trader) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/traders" className="text-teal-600 text-sm">
            ← Back
          </Link>
          <p className="mt-4 text-gray-500">Trader not found</p>
        </div>
      </div>
    );
  }

  const handleConfirmCopy = () => {
    if (!copyAmount) return alert("Enter amount");
    alert(`Copying ${trader.name}`);
    setIsCopyModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6 pb-10">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <Link href="/traders" className="text-xs text-teal-600">
            ← Back
          </Link>
          <h1 className="text-xl font-semibold mt-2 text-gray-900">
            {trader.name}
          </h1>
          <p className="text-xs text-gray-400">@{trader.username}</p>
        </div>

        {/* ACTIONS */}
        <Card>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">{trader.bio}</p>

            <div className="flex gap-2">
              <Link
                href={`/traders/${traderId}`}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                View Details
              </Link>

              <button
                onClick={() => setIsCopyModalOpen(true)}
                className="px-4 py-2 text-sm bg-teal-600 text-white rounded-lg"
              >
                Copy
              </button>
            </div>
          </div>
        </Card>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-4">
          <StatCard label="ROI" value={`${trader.roi}%`} />
          <StatCard label="Win Rate" value={`${trader.winRate}%`} />
          <StatCard label="Followers" value={trader.followers} />
          <StatCard label="Capital" value={`$${trader.managedCapital}`} />
        </div>

        {/* EQUITY */}
        <Card>
          <h3 className="text-sm font-medium mb-3">Equity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={EQUITY_CURVE}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="value" stroke="#14b8a6" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* TRADES */}
        <Card>
          <h3 className="text-sm font-medium mb-3">Recent Trades</h3>
          <table className="w-full text-sm">
            <thead className="text-gray-400">
              <tr>
                <th>Symbol</th>
                <th>Type</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_TRADES.map((t, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td>{t.symbol}</td>
                  <td>{t.type}</td>
                  <td className="text-green-600">+{t.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

      </div>
    </div>
  );
}