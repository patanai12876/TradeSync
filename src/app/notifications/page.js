"use client";
import { useState } from "react";
import Link from "next/link";
import Card from "../components/Card";
import Badge from "../components/Badge";

// Mock notifications data
const NOTIFICATIONS_DATA = [
  {
    id: 1,
    type: "trade_opened",
    title: "Trade Opened",
    message: "Alex Johnson opened EUR/USD Buy trade",
    trader: "Alex Johnson",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "trade_closed",
    title: "Trade Closed",
    message: "Emma Smith closed GBP/USD Sell trade with +$70 profit",
    trader: "Emma Smith",
    timestamp: "15 minutes ago",
    read: false,
  },
  {
    id: 3,
    type: "copy_started",
    title: "Copy Started",
    message: "You successfully started copying Sarah Wilson",
    trader: "Sarah Wilson",
    timestamp: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    type: "stop_loss",
    title: "Stop Loss Reached",
    message: "Copy of Alex Johnson stopped due to stop loss limit",
    trader: "Alex Johnson",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "new_follower",
    title: "New Follower",
    message: "You have a new follower: John Trader",
    trader: "John Trader",
    timestamp: "5 hours ago",
    read: true,
  },
  {
    id: 6,
    type: "trade_opened",
    title: "Trade Opened",
    message: "Sarah Wilson opened USD/JPY Buy trade",
    trader: "Sarah Wilson",
    timestamp: "6 hours ago",
    read: true,
  },
  {
    id: 7,
    type: "deposit",
    title: "Deposit Confirmed",
    message: "Your deposit of $2,000 has been confirmed",
    trader: "System",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: 8,
    type: "trade_closed",
    title: "Trade Closed",
    message: "Michael Brown closed USD/CAD Buy trade with -$30 loss",
    trader: "Michael Brown",
    timestamp: "2 days ago",
    read: true,
  },
];

const getNotificationIcon = (type) => {
  const icons = {
    trade_opened: "📈",
    trade_closed: "✓",
    copy_started: "🔄",
    stop_loss: "⛔",
    new_follower: "👤",
    deposit: "💰",
  };
  return icons[type] || "📢";
};

const getNotificationColor = (type) => {
  const colors = {
    trade_opened: "blue",
    trade_closed: "green",
    copy_started: "purple",
    stop_loss: "red",
    new_follower: "teal",
    deposit: "green",
  };
  return colors[type] || "default";
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [filter, setFilter] = useState("all");

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.read;
    if (filter === "read") return notif.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all notifications?")) {
      setNotifications([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6 pb-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm text-teal-600 hover:text-teal-700">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-semibold text-gray-900 mt-3">Notifications</h1>
          <p className="text-gray-500 text-sm">
            {unreadCount > 0 && `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Toolbar */}
        <Card className="mb-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Filters */}
            <div className="flex gap-2">
              {[
                { id: "all", label: "All" },
                { id: "unread", label: "Unread" },
                { id: "read", label: "Read" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    filter === f.id
                      ? "bg-gradient-to-r from-teal-600 to-cyan-500 text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-100 transition"
                >
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50 transition"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </Card>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map((notif) => (
              <Card
                key={notif.id}
                className={`cursor-pointer transition hover:shadow-md ${
                  !notif.read ? "border-l-4 border-l-teal-500 bg-teal-50" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="text-2xl mt-1">{getNotificationIcon(notif.type)}</div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                      {!notif.read && (
                        <Badge variant="success" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-700 mb-2">{notif.message}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">{notif.timestamp}</p>
                      <div className="flex gap-2">
                        {!notif.read && (
                          <button
                            onClick={() => handleMarkAsRead(notif.id)}
                            className="text-xs text-teal-600 hover:text-teal-700 font-medium"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notif.id)}
                          className="text-xs text-gray-500 hover:text-red-600 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No notifications yet</p>
              <p className="text-gray-400 text-sm mt-2">
                {filter === "unread"
                  ? "You're all caught up!"
                  : "You'll receive notifications about your trades and account activity here."}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
