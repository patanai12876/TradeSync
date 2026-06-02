"use client";
import { useState } from "react";
import Link from "next/link";

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bank");

  const methods = [
    { id: "bank", name: "Bank Transfer" },
    { id: "card", name: "Card Payment" },
    { id: "paypal", name: "PayPal" },
    { id: "crypto", name: "Crypto" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6 pb-10">
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-sm text-teal-600 hover:text-teal-700"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="text-3xl font-semibold text-gray-900 mt-3">
            Deposit Funds
          </h1>
          <p className="text-gray-500 text-sm">
            Add funds to your trading account
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">

          {/* AMOUNT */}
          <div>
            <label className="text-sm text-gray-600">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full mt-2 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-teal-400"
            />
          </div>

          {/* METHODS */}
          <div>
            <label className="text-sm text-gray-600">Payment Method</label>

            <div className="grid grid-cols-2 gap-3 mt-2">
              {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`px-4 py-3 rounded-md border text-sm transition ${
                    method === m.id
                      ? "border-teal-500 bg-teal-50 text-teal-700"
                      : "border-gray-200 hover:border-teal-200 text-gray-700"
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* SUMMARY */}
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Amount</span>
              <span>${amount || "0.00"}</span>
            </div>
            <div className="flex justify-between mt-2 text-gray-500">
              <span>Fee</span>
              <span>${((amount || 0) * 0.02).toFixed(2)}</span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3">
            <Link
              href="/dashboard"
              className="flex-1 text-center py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Link>

            <button className="flex-1 py-3 bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-md hover:shadow-lg transition">
              Continue
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}