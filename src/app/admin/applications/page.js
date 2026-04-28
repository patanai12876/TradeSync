"use client";
import { useState } from "react";
import Link from "next/link";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

// Mock data
const APPLICATIONS = [
  {
    id: 1,
    name: "David Chen",
    email: "david@example.com",
    appliedDate: "2025-03-19",
    status: "pending",
    experience: "8 years",
    strategy: "Swing trading on major pairs",
    expectedROI: "15-20% monthly",
    bio: "Professional trader with consistent track record",
    previousResults: "Average 18% yearly ROI",
  },
  {
    id: 2,
    name: "Jennifer Liu",
    email: "jennifer@example.com",
    appliedDate: "2025-03-18",
    status: "pending",
    experience: "5 years",
    strategy: "Scalping with technical analysis",
    expectedROI: "10-15% monthly",
    bio: "Experienced in high-frequency trading",
    previousResults: "Consistent profitability for 5 years",
  },
  {
    id: 3,
    name: "Michael Torres",
    email: "michael@example.com",
    appliedDate: "2025-03-17",
    status: "pending",
    experience: "12 years",
    strategy: "Trend following and breakout trading",
    expectedROI: "12-18% monthly",
    bio: "Institutional trader with proven strategy",
    previousResults: "12-year track record with +2000% return",
  },
];

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState(APPLICATIONS);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [decisionType, setDecisionType] = useState("");
  const [notes, setNotes] = useState("");

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setIsDetailModalOpen(true);
  };

  const handleDecision = (app, type) => {
    setSelectedApp(app);
    setDecisionType(type);
    setIsDecisionModalOpen(true);
  };

  const confirmDecision = () => {
    if (decisionType === "approve") {
      setApplications(
        applications.map((app) =>
          app.id === selectedApp.id ? { ...app, status: "approved" } : app
        )
      );
      alert(`Application from ${selectedApp.name} has been approved`);
    } else if (decisionType === "reject") {
      setApplications(
        applications.filter((app) => app.id !== selectedApp.id)
      );
      alert(`Application from ${selectedApp.name} has been rejected`);
    }
    setIsDecisionModalOpen(false);
    setNotes("");
  };

  const pendingApps = applications.filter((app) => app.status === "pending");

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6 pb-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="text-sm text-teal-600 hover:text-teal-700">
            ← Back to Admin Dashboard
          </Link>
          <h1 className="text-3xl font-semibold text-gray-900 mt-3">
            Trader Applications
          </h1>
          <p className="text-gray-500 text-sm">
            Review and approve trader applications
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <p className="text-gray-600 text-sm">Pending Applications</p>
            <p className="text-3xl font-bold text-teal-600 mt-1">
              {pendingApps.length}
            </p>
          </Card>
          <Card>
            <p className="text-gray-600 text-sm">Total Applications</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {applications.length}
            </p>
          </Card>
          <Card>
            <p className="text-gray-600 text-sm">Approval Rate</p>
            <p className="text-3xl font-bold text-green-600 mt-1">87.3%</p>
          </Card>
        </div>

        {/* Applications */}
        <div className="space-y-4">
          {pendingApps.length > 0 ? (
            pendingApps.map((app) => (
              <Card key={app.id} className="border-l-4 border-l-teal-500">
                <div className="grid md:grid-cols-5 gap-4 items-start">
                  {/* Info */}
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-gray-900">{app.name}</h3>
                    <p className="text-sm text-gray-600">{app.email}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Applied on {app.appliedDate}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">{app.bio}</p>
                  </div>

                  {/* Stats */}
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Experience</p>
                        <p className="font-semibold text-gray-900">
                          {app.experience}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Expected ROI</p>
                        <p className="font-semibold text-gray-900">
                          {app.expectedROI}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600">Strategy</p>
                        <p className="font-semibold text-gray-900">
                          {app.strategy}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleViewDetails(app)}
                      className="w-full text-center"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleDecision(app, "approve")}
                      className="w-full text-center"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDecision(app, "reject")}
                      className="w-full text-center"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <p className="text-center text-gray-500 py-8">
                No pending applications
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={`${selectedApp?.name} - Full Application`}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-700">Full Name</p>
              <p className="text-gray-900">{selectedApp?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Email</p>
              <p className="text-gray-900">{selectedApp?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Trading Experience</p>
              <p className="text-gray-900">{selectedApp?.experience}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Expected ROI</p>
              <p className="text-gray-900">{selectedApp?.expectedROI}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Bio</p>
            <p className="text-gray-700">{selectedApp?.bio}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Trading Strategy</p>
            <p className="text-gray-700">{selectedApp?.strategy}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Previous Results</p>
            <p className="text-gray-700">{selectedApp?.previousResults}</p>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={() => setIsDetailModalOpen(false)}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsDetailModalOpen(false);
                handleDecision(selectedApp, "approve");
              }}
              className="flex-1"
            >
              Approve
            </Button>
          </div>
        </div>
      </Modal>

      {/* Decision Modal */}
      <Modal
        isOpen={isDecisionModalOpen}
        onClose={() => setIsDecisionModalOpen(false)}
        title={`${decisionType?.toUpperCase()} Application`}
        size="md"
      >
        <div className="space-y-6">
          <div
            className={`border rounded-lg p-4 ${
              decisionType === "approve"
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <p className="text-sm text-gray-700">
              Are you sure you want to{" "}
              <span className="font-semibold">{decisionType}</span> the application from{" "}
              <span className="font-semibold">{selectedApp?.name}</span>?
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes for the applicant..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-200"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsDecisionModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant={decisionType === "approve" ? "primary" : "danger"}
              onClick={confirmDecision}
              className="flex-1"
            >
              Confirm {decisionType?.toUpperCase()}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
