"use client";
import { useState } from "react";
import Link from "next/link";
import Card from "../../../components/Card";
import Badge from "../../../components/Badge";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import { MdSearch } from "react-icons/md";

// Mock data
const USERS_DATA = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Follower", status: "active", joinDate: "2025-01-15", trades: 45 },
  { id: 2, name: "Alex Johnson", email: "alex@example.com", role: "Trader", status: "active", joinDate: "2025-01-10", trades: 128, followers: 2340 },
  { id: 3, name: "Emma Smith", email: "emma@example.com", role: "Trader", status: "active", joinDate: "2024-12-20", trades: 156, followers: 5120 },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "Trader", status: "active", joinDate: "2024-12-15", trades: 89, followers: 3920 },
  { id: 5, name: "Mike Johnson", email: "mike@example.com", role: "Follower", status: "suspended", joinDate: "2025-01-05", trades: 23 },
  { id: 6, name: "Lisa Anderson", email: "lisa@example.com", role: "Trader", status: "active", joinDate: "2024-11-30", trades: 201, followers: 6530 },
  { id: 7, name: "David Chen", email: "david@example.com", role: "Follower", status: "active", joinDate: "2025-02-01", trades: 12 },
  { id: 8, name: "Sophie Brown", email: "sophie@example.com", role: "Follower", status: "inactive", joinDate: "2024-10-15", trades: 56 },
  { id: 9, name: "Robert Lee", email: "robert@example.com", role: "Trader", status: "active", joinDate: "2024-11-05", trades: 134, followers: 4210 },
  { id: 10, name: "Jessica White", email: "jessica@example.com", role: "Follower", status: "active", joinDate: "2025-01-20", trades: 34 },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(USERS_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");

  const filteredUsers = users.filter((user) => {
    if (searchTerm && !user.name.toLowerCase().includes(searchTerm.toLowerCase()) && !user.email.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filterRole !== "all" && user.role !== filterRole) return false;
    if (filterStatus !== "all" && user.status !== filterStatus) return false;
    return true;
  });

  const handleAction = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setIsActionModalOpen(true);
  };

  const confirmAction = () => {
    if (actionType === "suspend") {
      setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, status: "suspended" } : u)));
      alert(`User ${selectedUser.name} has been suspended`);
    } else if (actionType === "activate") {
      setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, status: "active" } : u)));
      alert(`User ${selectedUser.name} has been activated`);
    } else if (actionType === "ban") {
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      alert(`User ${selectedUser.name} has been permanently banned`);
    }
    setIsActionModalOpen(false);
  };

  const roleColors = {
    Follower: "info",
    Trader: "success",
    Admin: "error",
  };

  const statusColors = {
    active: "success",
    suspended: "warning",
    inactive: "default",
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6 pb-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="text-sm text-teal-600 hover:text-teal-700">
            ← Back to Admin Dashboard
          </Link>
          <h1 className="text-3xl font-semibold text-gray-900 mt-3">User Management</h1>
          <p className="text-gray-500 text-sm">Manage platform users and accounts</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <MdSearch className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-200"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                <option value="all">All Roles</option>
                <option value="Follower">Follower</option>
                <option value="Trader">Trader</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Users Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Trades</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Join Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{user.name}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge variant={roleColors[user.role]}>{user.role}</Badge>
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-gray-900">{user.trades}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{user.joinDate}</td>
                    <td className="py-3 px-4">
                      <Badge variant={statusColors[user.status]}>{user.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {user.status === "active" ? (
                          <button
                            onClick={() => handleAction(user, "suspend")}
                            className="text-xs px-2 py-1 border border-teal-300 text-teal-600 rounded hover:bg-teal-50"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAction(user, "activate")}
                            className="text-xs px-2 py-1 border border-green-300 text-green-600 rounded hover:bg-green-50"
                          >
                            Activate
                          </button>
                        )}
                        <button
                          onClick={() => handleAction(user, "ban")}
                          className="text-xs px-2 py-1 border border-red-300 text-red-600 rounded hover:bg-red-50"
                        >
                          Ban
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-4">Showing {filteredUsers.length} users</p>
        </Card>
      </div>

      {/* Action Modal */}
      <Modal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        title={`Confirm ${actionType?.toUpperCase()}`}
        size="md"
      >
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              Are you sure you want to {actionType} <span className="font-semibold">{selectedUser?.name}</span>?
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm"><strong>Email:</strong> {selectedUser?.email}</p>
            <p className="text-sm"><strong>Role:</strong> {selectedUser?.role}</p>
            <p className="text-sm"><strong>Current Status:</strong> {selectedUser?.status}</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsActionModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant={actionType === "ban" ? "danger" : "primary"}
              onClick={confirmAction}
              className="flex-1"
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
