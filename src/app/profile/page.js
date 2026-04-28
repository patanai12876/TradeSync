"use client";
import { useState } from "react";
import Link from "next/link";
import Card from "../components/Card";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import Badge from "../components/Badge";

export default function ProfilePage() {
  const [user, setUser] = useState({
    fullName: "John Trader",
    email: "john@example.com",
    username: "johnt",
    phone: "+1 (555) 000-0000",
    bio: "Professional trader with 5+ years experience",
    avatar: null,
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    tradeOpened: true,
    tradeClosed: true,
    copyStarted: true,
    stopLoss: true,
    newFollower: true,
    emailDaily: true,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});

  const handleSaveProfile = () => {
    if (!user.fullName || !user.email) {
      alert("Please fill in all required fields");
      return;
    }
    alert("Profile updated successfully!");
  };

  const handleChangePassword = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert("Please fill in all password fields");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match");
      return;
    }
    alert("Password changed successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleToggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6 pb-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm text-teal-600 hover:text-teal-700">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-semibold text-gray-900 mt-3">Settings</h1>
          <p className="text-gray-500 text-sm">Manage your account and preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {[
            { id: "profile", label: "Profile" },
            { id: "password", label: "Change Password" },
            { id: "notifications", label: "Notifications" },
            { id: "security", label: "Security" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium border-b-2 transition ${
                activeTab === tab.id
                  ? "border-teal-500 text-teal-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <Card>
            <div className="space-y-6">
              {/* Avatar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Profile Avatar
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                    {user.fullName.charAt(0)}
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                    Change Avatar
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="Full Name"
                  value={user.fullName}
                  onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                  required
                />
                <FormInput
                  label="Email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
                <FormInput
                  label="Username"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <FormInput
                  label="Phone"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-200"
                  rows={4}
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{user.bio.length}/500 characters</p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button variant="secondary" className="flex-1">
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSaveProfile} className="flex-1">
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Change Password Tab */}
        {activeTab === "password" && (
          <Card>
            <div className="space-y-6 max-w-md">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special
                  characters.
                </p>
              </div>

              <FormInput
                label="Current Password"
                type="password"
                placeholder="Enter your current password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                required
              />

              <FormInput
                label="New Password"
                type="password"
                placeholder="Enter new password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                required
              />

              <FormInput
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                required
              />

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button variant="secondary" className="flex-1">
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleChangePassword} className="flex-1">
                  Change Password
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <Card>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">In-App Notifications</h3>
                <div className="space-y-3">
                  {[
                    { key: "tradeOpened", label: "Trade Opened", desc: "Notify when a copied trader opens a trade" },
                    { key: "tradeClosed", label: "Trade Closed", desc: "Notify when a copied trade closes" },
                    { key: "copyStarted", label: "Copy Started", desc: "Notify when you start copying a trader" },
                    { key: "stopLoss", label: "Stop Loss Reached", desc: "Notify when stop loss limit is reached" },
                    { key: "newFollower", label: "New Follower", desc: "Notify when you get a new follower (traders only)" },
                  ].map((notif) => (
                    <label key={notif.key} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[notif.key]}
                        onChange={() => handleToggleNotification(notif.key)}
                        className="mt-1 rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{notif.label}</p>
                        <p className="text-sm text-gray-600">{notif.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
                <div className="space-y-3">
                  {[
                    { key: "emailDaily", label: "Daily Summary", desc: "Get a daily summary of your portfolio performance" },
                  ].map((notif) => (
                    <label key={notif.key} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[notif.key]}
                        onChange={() => handleToggleNotification(notif.key)}
                        className="mt-1 rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{notif.label}</p>
                        <p className="text-sm text-gray-600">{notif.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button variant="secondary" className="flex-1">
                  Cancel
                </Button>
                <Button variant="primary" className="flex-1">
                  Save Preferences
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <Card>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Enable 2FA</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <Badge variant="default">Not Enabled</Badge>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Current Session</p>
                      <p className="text-sm text-gray-600">Chrome on Windows • Last active: Just now</p>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Danger Zone</h3>
                <Button variant="danger" className="w-full">
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
