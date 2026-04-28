"use client";
import { useState } from "react";
import Link from "next/link";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Modal from "../components/Modal";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { MdSearch } from "react-icons/md";
import { FiShield, FiUsers, FiTrendingUp } from "react-icons/fi";

const MOCK_TRADERS = [
  { id: 1, name: "Alex Johnson",  username: "alexj",    roi: 18.5, winRate: 68, maxDrawdown: 12.3, followers: 2340, riskLevel: "Medium", isVerified: true  },
  { id: 2, name: "Emma Smith",    username: "emmas",    roi: 25.2, winRate: 75, maxDrawdown: 8.5,  followers: 5120, riskLevel: "Low",    isVerified: true  },
  { id: 3, name: "David Chen",    username: "davidc",   roi: 12.3, winRate: 62, maxDrawdown: 15.7, followers: 1850, riskLevel: "High",   isVerified: false },
  { id: 4, name: "Sarah Wilson",  username: "sarahw",   roi: 21.8, winRate: 71, maxDrawdown: 10.2, followers: 3920, riskLevel: "Medium", isVerified: true  },
  { id: 5, name: "Michael Brown", username: "michaelb", roi: 15.6, winRate: 65, maxDrawdown: 14.1, followers: 2150, riskLevel: "Medium", isVerified: true  },
  { id: 6, name: "Lisa Anderson", username: "lisaa",    roi: 28.4, winRate: 78, maxDrawdown: 9.8,  followers: 6530, riskLevel: "Low",    isVerified: true  },
];

const RISK_COLORS = {
  Low:    "text-green-600 bg-green-50",
  Medium: "text-amber-600 bg-amber-50",
  High:   "text-red-500 bg-red-50",
};

function TraderCard({ trader, onCopy }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-4 hover:shadow-sm transition-shadow">
      {/* Top row — name + risk badge */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar initial */}
          <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center text-sm font-semibold shrink-0">
            {trader.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-gray-900">{trader.name}</p>
              {trader.isVerified && (
                <FiShield size={12} className="text-teal-500" title="Verified" />
              )}
            </div>
            <p className="text-xs text-gray-400">@{trader.username}</p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${RISK_COLORS[trader.riskLevel]}`}>
          {trader.riskLevel}
        </span>
      </div>

      {/* Stats row — only the 3 most important */}
      <div className="grid grid-cols-3 gap-2 border-t border-gray-50 pt-4">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">ROI</p>
          <p className="text-sm font-semibold text-green-600">+{trader.roi}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Win Rate</p>
          <p className="text-sm font-semibold text-gray-800">{trader.winRate}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-0.5">Drawdown</p>
          <p className="text-sm font-semibold text-gray-800">{trader.maxDrawdown}%</p>
        </div>
      </div>

      {/* Footer — followers + CTA */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <FiUsers size={11} />
          <span>{trader.followers.toLocaleString()}</span>
        </div>
        <button
          onClick={() => onCopy(trader)}
          className="px-4 py-1.5 bg-teal-600 text-white text-xs rounded-lg hover:bg-teal-700 transition-colors"
        >
          Copy
        </button>
      </div>
    </div>
  );
}

export default function TradersPage() {
  const [traders]                             = useState(MOCK_TRADERS);
  const [searchTerm, setSearchTerm]           = useState("");
  const [sortBy, setSortBy]                   = useState("roi");
  const [filterRisk, setFilterRisk]           = useState("all");
  const [filterVerified, setFilterVerified]   = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [selectedTrader, setSelectedTrader]   = useState(null);
  const [copyAmount, setCopyAmount]           = useState("");
  const [copyMode, setCopyMode]               = useState("proportional");
  const [isLoading, setIsLoading]             = useState(false);

  const filteredTraders = traders
    .filter((t) => {
      if (searchTerm && !t.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (filterRisk !== "all" && t.riskLevel !== filterRisk) return false;
      if (filterVerified && !t.isVerified) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "roi")       return b.roi - a.roi;
      if (sortBy === "followers") return b.followers - a.followers;
      if (sortBy === "winrate")   return b.winRate - a.winRate;
      return 0;
    });

  const handleCopyClick = (trader) => { setSelectedTrader(trader); setIsCopyModalOpen(true); };

  const handleConfirmCopy = () => {
    if (!copyAmount) { alert("Please enter a copy amount"); return; }
    setIsLoading(true);
    setTimeout(() => {
      alert(`Successfully started copying ${selectedTrader.name} with $${copyAmount}`);
      setCopyAmount("");
      setIsCopyModalOpen(false);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── HEADER ── */}
        <div>
          <Link href="/dashboard" className="text-xs text-teal-600 hover:text-teal-700">
            ← Dashboard
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mt-2">Trader Marketplace</h1>
          <p className="text-sm text-gray-400 mt-0.5">Discover and copy top-performing traders</p>
        </div>

        {/* ── FILTERS ── */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="relative mb-4">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search traders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-300 transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-300 transition"
            >
              <option value="roi">Highest ROI</option>
              <option value="followers">Most Followers</option>
              <option value="winrate">Win Rate</option>
            </select>

            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-300 transition"
            >
              <option value="all">All Risk Levels</option>
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>

            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 select-none">
              <input
                type="checkbox"
                checked={filterVerified}
                onChange={(e) => setFilterVerified(e.target.checked)}
                className="rounded accent-teal-600"
              />
              Verified only
            </label>

            <span className="ml-auto text-xs text-gray-400">
              <span className="font-medium text-gray-700">{filteredTraders.length}</span> traders
            </span>
          </div>
        </div>

        {/* ── GRID ── */}
        {isLoading ? (
          <LoadingSkeleton count={6} type="card" />
        ) : filteredTraders.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTraders.map((trader) => (
              <TraderCard key={trader.id} trader={trader} onCopy={handleCopyClick} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-sm text-gray-400">No traders match your filters</p>
          </div>
        )}
      </div>

      {/* ── COPY MODAL ── */}
      <Modal
        isOpen={isCopyModalOpen}
        onClose={() => setIsCopyModalOpen(false)}
        title={`Copy ${selectedTrader?.name}`}
        size="md"
      >
        <div className="space-y-5">
          <p className="text-sm text-gray-500">
            All trades from{" "}
            <span className="font-medium text-gray-900">{selectedTrader?.name}</span>{" "}
            will be copied automatically using your allocated capital.
          </p>

          <FormInput
            label="Copy Amount ($)"
            type="number"
            placeholder="Enter amount"
            value={copyAmount}
            onChange={(e) => setCopyAmount(e.target.value)}
            required
          />

          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Copy Mode</p>
            <div className="space-y-2">
              {[
                { id: "proportional", label: "Proportional", hint: "recommended" },
                { id: "fixed",        label: "Fixed Lot Size" },
              ].map((mode) => (
                <label key={mode.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="copyMode"
                    value={mode.id}
                    checked={copyMode === mode.id}
                    onChange={(e) => setCopyMode(e.target.value)}
                    className="accent-teal-600"
                  />
                  <span className="text-sm text-gray-700">
                    {mode.label}
                    {mode.hint && <span className="ml-1 text-xs text-gray-400">({mode.hint})</span>}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setIsCopyModalOpen(false)} className="flex-1" disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirmCopy} className="flex-1" disabled={isLoading}>
              {isLoading ? "Processing..." : "Start Copying"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}