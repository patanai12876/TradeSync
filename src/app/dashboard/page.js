"use client";
import Link from "next/link";
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import Card from "../components/Card";
import StatCard from "../components/StatCard";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { FiTrendingUp, FiAward, FiUsers, FiDollarSign } from "react-icons/fi";

const PORTFOLIO_DATA = [
  { date: "Jan 1",  value: 10000 },
  { date: "Jan 8",  value: 10450 },
  { date: "Jan 15", value: 11200 },
  { date: "Jan 22", value: 10950 },
  { date: "Jan 29", value: 12100 },
  { date: "Feb 5",  value: 12500 },
  { date: "Feb 12", value: 13200 },
  { date: "Feb 19", value: 13800 },
  { date: "Feb 26", value: 14500 },
  { date: "Mar 5",  value: 15200 },
  { date: "Mar 12", value: 16100 },
  { date: "Mar 19", value: 17345 },
];

const ACTIVE_COPIES = [
  { id: 1, traderName: "Alex Johnson",  capital: 5000, profit: 925,  profitPct: 18.5, status: "Active", trades: 12 },
  { id: 2, traderName: "Emma Smith",    capital: 8000, profit: 2016, profitPct: 25.2, status: "Active", trades: 18 },
  { id: 3, traderName: "Sarah Wilson",  capital: 4000, profit: 872,  profitPct: 21.8, status: "Active", trades: 10 },
];

const OPEN_TRADES = [
  { id: 1, trader: "Alex Johnson",  symbol: "EUR/USD", type: "Buy",  openPrice: 1.0850,  currentPrice: 1.0920,  profit: 70, profitPct: 0.64 },
  { id: 2, trader: "Emma Smith",    symbol: "GBP/USD", type: "Sell", openPrice: 1.2650,  currentPrice: 1.2580,  profit: 70, profitPct: 0.55 },
  { id: 3, trader: "Sarah Wilson",  symbol: "USD/JPY", type: "Buy",  openPrice: 110.50,  currentPrice: 111.20,  profit: 70, profitPct: 0.63 },
];

const RECENT_ACTIVITY = [
  { event: "Opened trade",    trader: "Alex Johnson", detail: "EUR/USD Buy",    time: "2 mins ago"  },
  { event: "Started copying", trader: "Sarah Wilson", detail: "Capital: $4,000", time: "1 hour ago"  },
  { event: "Closed trade",    trader: "Emma Smith",   detail: "Profit: +$125",   time: "3 hours ago" },
];

export default function Dashboard() {
  const user = { name: "John Trader" };

  const [isStopCopyModalOpen, setIsStopCopyModalOpen] = useState(false);
  const [selectedCopy, setSelectedCopy] = useState(null);

  const totalEquity   = 17345;
  const totalDeposit  = 17000;
  const totalProfit   = totalEquity - totalDeposit;
  const totalProfitPct = ((totalProfit / totalDeposit) * 100).toFixed(2);

  const handleStopCopy = (copy) => { setSelectedCopy(copy); setIsStopCopyModalOpen(true); };
  const confirmStopCopy = () => { alert(`Stopped copying ${selectedCopy.traderName}`); setIsStopCopyModalOpen(false); };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">Welcome back, {user.name}</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/traders"
              className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors"
            >
              Discover Traders
            </Link>
            <Link
              href="/deposit"
              className="px-4 py-2 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-100 transition-colors"
            >
              Deposit
            </Link>
            <Link
              href="/withdraw"
              className="px-4 py-2 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-100 transition-colors"
            >
              Withdraw
            </Link>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Equity"     value={`$${totalEquity.toLocaleString()}`}  change={totalProfitPct} icon={FiDollarSign}  color="green" />
          <StatCard label="Total Profit"     value={`$${totalProfit.toLocaleString()}`}  change={totalProfitPct} icon={FiTrendingUp}  color={totalProfit >= 0 ? "green" : "red"} />
          <StatCard label="Active Copies"    value={ACTIVE_COPIES.length}               icon={FiUsers}          color="blue" />
          <StatCard label="Open Trades"      value={OPEN_TRADES.length}                 icon={FiAward}          color="teal" />
        </div>

        {/* ── EQUITY CURVE ── */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Equity Curve</h2>
            <span className="text-xs text-gray-400">Jan – Mar</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={PORTFOLIO_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(v) => [`$${v.toLocaleString()}`, "Portfolio"]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb", boxShadow: "none" }}
              />
              <Line type="monotone" dataKey="value" stroke="#0d9488" strokeWidth={2} dot={false} name="Portfolio Value" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* ── ACTIVE COPIES + OPEN TRADES ── */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Active Copies */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Active Copies</h2>
              <Link href="/traders" className="text-xs text-teal-600 hover:text-teal-700">+ Add</Link>
            </div>

            <div className="space-y-3">
              {ACTIVE_COPIES.map((copy) => (
                <div key={copy.id} className="rounded-lg border border-gray-100 bg-white p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{copy.traderName}</p>
                      <p className="text-xs text-gray-400">{copy.trades} trades</p>
                    </div>
                    <Badge variant="success">{copy.status}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs border-t border-gray-100 pt-3 mb-3">
                    <div>
                      <p className="text-gray-400 mb-0.5">Capital</p>
                      <p className="font-medium text-gray-800">${copy.capital.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-0.5">Profit</p>
                      <p className="font-medium text-green-600">+${copy.profit.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-0.5">ROI</p>
                      <p className="font-medium text-green-600">+{copy.profitPct}%</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStopCopy(copy)}
                    className="w-full py-1.5 text-xs text-red-500 border border-red-100 rounded-md hover:bg-red-50 transition-colors"
                  >
                    Stop Copying
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Open Trades */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Open Trades</h2>
              <Link href="/trades" className="text-xs text-teal-600 hover:text-teal-700">View all →</Link>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Symbol", "Type", "Price", "P/L"].map((h) => (
                    <th key={h} className={`py-2 text-xs font-medium text-gray-400 uppercase tracking-wide ${h === "P/L" || h === "Price" ? "text-right" : "text-left"}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {OPEN_TRADES.map((trade) => (
                  <tr key={trade.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3">
                      <p className="font-medium text-gray-900">{trade.symbol}</p>
                      <p className="text-xs text-gray-400">{trade.trader}</p>
                    </td>
                    <td className="py-3">
                      <Badge variant={trade.type === "Buy" ? "info" : "error"}>{trade.type}</Badge>
                    </td>
                    <td className="py-3 text-right text-gray-700">{trade.currentPrice}</td>
                    <td className="py-3 text-right">
                      <p className="font-medium text-green-600">+${trade.profit}</p>
                      <p className="text-xs text-green-500">+{trade.profitPct}%</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* ── RECENT ACTIVITY ── */}
        <Card>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Recent Activity</h2>
          <div className="divide-y divide-gray-50">
            {RECENT_ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{a.event}</p>
                    <p className="text-xs text-gray-400">{a.trader} · {a.detail}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── STOP COPY MODAL ── */}
      <Modal
        isOpen={isStopCopyModalOpen}
        onClose={() => setIsStopCopyModalOpen(false)}
        title="Stop Copying"
        size="md"
      >
        <div className="space-y-5">
          <p className="text-sm text-gray-600">
            Are you sure you want to stop copying{" "}
            <span className="font-semibold text-gray-900">{selectedCopy?.traderName}</span>?
          </p>

          <div className="rounded-lg bg-gray-50 p-4 text-sm space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Capital</span>
              <span className="font-medium text-gray-900">${selectedCopy?.capital.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Profit</span>
              <span className="font-medium text-green-600">+${selectedCopy?.profit.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-700">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="action" defaultChecked /> Close all open trades now
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="action" /> Keep open trades running
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setIsStopCopyModalOpen(false)} className="flex-1">Cancel</Button>
            <Button variant="danger"    onClick={confirmStopCopy}                    className="flex-1">Stop Copying</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}