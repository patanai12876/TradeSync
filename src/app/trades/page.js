"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Card from "../components/Card";
import Badge from "../components/Badge";
import { MdSearch } from "react-icons/md";

// Mock data SAME
const ALL_TRADES = [
  { id: 1, trader: "Alex Johnson", symbol: "EUR/USD", type: "Buy", entry: 1.0850, exit: 1.0920, profit: 70, profitPct: 0.64, date: "2025-03-19", duration: "2h 45m" },
  { id: 2, trader: "Emma Smith", symbol: "GBP/USD", type: "Sell", entry: 1.2650, exit: 1.2580, profit: 70, profitPct: 0.55, date: "2025-03-18", duration: "4h 30m" },
  { id: 3, trader: "Sarah Wilson", symbol: "USD/JPY", type: "Buy", entry: 110.50, exit: 111.20, profit: 70, profitPct: 0.63, date: "2025-03-17", duration: "3h 15m" },
  { id: 12, trader: "Sarah Wilson", symbol: "AUD/JPY", type: "Buy", entry: 67.50, exit: 67.80, profit: 30, profitPct: 0.44, date: "2025-03-08", duration: "5h 30m" },
];

const TRADERS = ["All Traders", "Alex Johnson", "Emma Smith", "Sarah Wilson"];

export default function TradesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrader, setSelectedTrader] = useState("All Traders");
  const [filterProfit, setFilterProfit] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;

  const filteredTrades = useMemo(() => {
    return ALL_TRADES.filter((trade) => {
      if (searchTerm && !trade.symbol.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (selectedTrader !== "All Traders" && trade.trader !== selectedTrader) return false;
      if (filterProfit === "profit" && trade.profit <= 0) return false;
      if (filterProfit === "loss" && trade.profit >= 0) return false;
      return true;
    });
  }, [searchTerm, selectedTrader, filterProfit]);

  const sortedTrades = useMemo(() => {
    const data = [...filteredTrades];
    if (sortBy === "profit") data.sort((a, b) => b.profit - a.profit);
    if (sortBy === "loss") data.sort((a, b) => a.profit - b.profit);
    return data;
  }, [filteredTrades, sortBy]);

  const totalPages = Math.ceil(sortedTrades.length / itemsPerPage);
  const paginatedTrades = sortedTrades.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const totalProfit = filteredTrades.reduce((sum, t) => sum + t.profit, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6 pb-10">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <Link href="/dashboard" className="text-xs text-teal-600">← Dashboard</Link>
          <h1 className="text-xl font-semibold mt-2 text-gray-900">Trade History</h1>
          <p className="text-xs text-gray-400">All executed trades</p>
        </div>

        {/* STATS (minimal) */}
        <div className="grid md:grid-cols-4 gap-3">
          <Card>
            <p className="text-xs text-gray-400">Trades</p>
            <p className="text-xl font-semibold">{filteredTrades.length}</p>
          </Card>

          <Card>
            <p className="text-xs text-gray-400">Win</p>
            <p className="text-xl font-semibold text-green-600">
              {filteredTrades.filter(t => t.profit > 0).length}
            </p>
          </Card>

          <Card>
            <p className="text-xs text-gray-400">Loss</p>
            <p className="text-xl font-semibold text-red-500">
              {filteredTrades.filter(t => t.profit < 0).length}
            </p>
          </Card>

          <Card>
            <p className="text-xs text-gray-400">P/L</p>
            <p className={`text-xl font-semibold ${totalProfit >= 0 ? "text-green-600" : "text-red-500"}`}>
              {totalProfit}
            </p>
          </Card>
        </div>

        {/* FILTERS */}
        <Card>
          <div className="grid md:grid-cols-4 gap-3">

            {/* search */}
            <div className="md:col-span-2 relative">
              <MdSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                placeholder="Search symbol..."
                className="w-full pl-9 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-200"
              />
            </div>

            <select
              value={selectedTrader}
              onChange={(e) => { setSelectedTrader(e.target.value); setPage(1); }}
              className="text-sm border border-gray-200 rounded-md px-3 py-2"
            >
              {TRADERS.map(t => <option key={t}>{t}</option>)}
            </select>

            <select
              value={filterProfit}
              onChange={(e) => setFilterProfit(e.target.value)}
              className="text-sm border border-gray-200 rounded-md px-3 py-2"
            >
              <option value="all">All</option>
              <option value="profit">Profit</option>
              <option value="loss">Loss</option>
            </select>

          </div>
        </Card>

        {/* TABLE */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="text-left py-3">Date</th>
                  <th>Trader</th>
                  <th>Symbol</th>
                  <th>Type</th>
                  <th className="text-right">P/L</th>
                  <th className="text-right">Duration</th>
                </tr>
              </thead>

              <tbody>
                {paginatedTrades.map((t) => (
                  <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 text-gray-600">{t.date}</td>
                    <td className="text-teal-600">{t.trader}</td>
                    <td className="font-medium">{t.symbol}</td>
                    <td>
                      <Badge variant={t.type === "Buy" ? "info" : "error"}>{t.type}</Badge>
                    </td>
                    <td className={`text-right font-medium ${t.profit >= 0 ? "text-green-600" : "text-red-500"}`}>
                      {t.profit}
                    </td>
                    <td className="text-right text-gray-500">{t.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* pagination minimal */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 text-sm rounded-md border ${
                    page === i + 1
                      ? "bg-teal-600 text-white border-teal-600"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </Card>

      </div>
    </div>
  );
}