"use client";
import Link from "next/link";
import Card from "../components/Card";
import StatCard from "../components/StatCard";
import { FiUsers, FiTrendingUp, FiActivity, FiCheckCircle } from "react-icons/fi";

export default function AdminDashboard() {
  const adminStats = [
    {
      label: "Total Users",
      value: "2,547",
      change: 12.5,
      icon: FiUsers,
      color: "blue",
    },
    {
      label: "Active Traders",
      value: "342",
      change: 8.2,
      icon: FiTrendingUp,
      color: "green",
    },
    {
      label: "Total Copy Relationships",
      value: "1,234",
      change: 15.3,
      icon: FiActivity,
      color: "teal",
    },
    {
      label: "Verified Traders",
      value: "287",
      change: 5.1,
      icon: FiCheckCircle,
      color: "blue",
    },
  ];

  const recentActivity = [
    { event: "New user registration", detail: "john.doe@example.com", time: "5 mins ago" },
    { event: "Trader application submitted", detail: "alex_trader", time: "15 mins ago" },
    { event: "User account suspended", detail: "spam_account_123", time: "1 hour ago" },
    { event: "Large trade detected", detail: "$50,000 copy amount", time: "2 hours ago" },
    { event: "Withdrawal processed", detail: "$2,500 to user", time: "3 hours ago" },
  ];

  const pendingActions = [
    { id: 1, type: "Trader Application", user: "Sarah Wilson", status: "pending", date: "Today" },
    { id: 2, type: "Account Suspension", user: "john_spam", status: "pending", date: "Today" },
    { id: 3, type: "Dispute Report", user: "user_complaint", status: "pending", date: "Yesterday" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6 pb-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Platform management and analytics</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {adminStats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <Card className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/admin/users"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <p className="font-medium text-gray-900">User Management</p>
                <p className="text-xs text-gray-600">View and manage user accounts</p>
              </Link>
              <Link
                href="/admin/applications"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <p className="font-medium text-gray-900">Trader Applications</p>
                <p className="text-xs text-gray-600">Review pending applications</p>
              </Link>
              <Link
                href="/admin/trades"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <p className="font-medium text-gray-900">Trade Monitoring</p>
                <p className="text-xs text-gray-600">View all platform trades</p>
              </Link>
              <Link
                href="/admin/reports"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <p className="font-medium text-gray-900">Reports & Analytics</p>
                <p className="text-xs text-gray-600">Platform metrics and reports</p>
              </Link>
            </div>
          </Card>

          {/* Pending Actions */}
          <Card className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Actions</h3>
            <div className="space-y-3">
              {pendingActions.map((action) => (
                <div
                  key={action.id}
                  className="p-3 border border-teal-200 bg-teal-50 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{action.type}</p>
                      <p className="text-xs text-gray-600">{action.user}</p>
                    </div>
                    <span className="text-xs text-teal-700 font-medium">{action.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="border-b border-gray-200 last:border-b-0 pb-3 last:pb-0">
                  <p className="text-sm font-medium text-gray-900">{activity.event}</p>
                  <p className="text-xs text-gray-600">{activity.detail}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Platform Metrics */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Metrics</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-gray-600 text-sm">Total Volume (24h)</p>
              <p className="text-2xl font-bold text-gray-900">$2.4M</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-gray-600 text-sm">Platform Profit (24h)</p>
              <p className="text-2xl font-bold text-green-600">+$125K</p>
            </div>
            <div className="border-l-4 border-teal-500 pl-4">
              <p className="text-gray-600 text-sm">New Registrations (24h)</p>
              <p className="text-2xl font-bold text-gray-900">42</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="text-gray-600 text-sm">System Uptime</p>
              <p className="text-2xl font-bold text-gray-900">99.98%</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
