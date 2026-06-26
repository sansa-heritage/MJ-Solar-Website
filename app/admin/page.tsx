"use client";

import { useState, useEffect } from "react";
import {
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  MessageCircle,
  RefreshCw,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

interface ContactSubmission {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  message: string;
  ip_address: string;
  status: "pending" | "read" | "contacted" | "completed";
  created_at: string;
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    contacted: 0,
    completed: 0,
  });

  // Fetch submissions
  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-submissions.php`);
      const data = await response.json();
      if (data.success) {
        setSubmissions(data.data);
        calculateStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (data: ContactSubmission[]) => {
    setStats({
      total: data.length,
      pending: data.filter((s) => s.status === "pending").length,
      contacted: data.filter((s) => s.status === "contacted").length,
      completed: data.filter((s) => s.status === "completed").length,
    });
  };

  // Update submission status
  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-status.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await response.json();
      if (data.success) {
        fetchSubmissions();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Delete submission
  const deleteSubmission = async (id: number) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-submission.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        if (data.success) {
          fetchSubmissions();
          if (selectedSubmission?.id === id) setSelectedSubmission(null);
        }
      } catch (error) {
        console.error("Error deleting submission:", error);
      }
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["ID", "Name", "Phone", "Email", "City", "Message", "Status", "Date"];
    const csvData = submissions.map((s) => [
      s.id,
      s.name,
      s.phone,
      s.email,
      s.city,
      `"${s.message.replace(/"/g, '""')}"`,
      s.status,
      new Date(s.created_at).toLocaleString(),
    ]);
    const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `submissions_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter submissions
  const filteredSubmissions = submissions.filter((s) => {
    if (filter !== "all" && s.status !== filter) return false;
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        s.name.toLowerCase().includes(search) ||
        s.email.toLowerCase().includes(search) ||
        s.phone.includes(search) ||
        s.city.toLowerCase().includes(search)
      );
    }
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-700";
      case "read":
        return "bg-blue-100 text-blue-700";
      case "contacted":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock size={14} />;
      case "contacted":
        return <Phone size={14} />;
      case "completed":
        return <CheckCircle size={14} />;
      default:
        return <MessageCircle size={14} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6fb]">
      {/* Navbar - Same as main website */}
      <header className="w-full py-4 md:py-5 sticky top-0 bg-[#f8f6fb]/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <Navbar></Navbar>
      </header>

      {/* Main Content */}
      <div className="container-main py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#15153D]">Contact Submissions</h1>
          <p className="text-gray-500 mt-2">Manage and respond to customer inquiries</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Total</p>
                <p className="text-3xl font-bold text-[#5B3DF5] mt-1">{stats.total}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <MessageCircle size={20} className="text-[#5B3DF5]" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-3xl font-bold text-orange-500 mt-1">{stats.pending}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock size={20} className="text-orange-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Contacted</p>
                <p className="text-3xl font-bold text-green-500 mt-1">{stats.contacted}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Phone size={20} className="text-green-500" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-3xl font-bold text-gray-700 mt-1">{stats.completed}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <CheckCircle size={20} className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-xl font-medium transition text-sm ${
                  filter === "all"
                    ? "bg-[#5B3DF5] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-xl font-medium transition text-sm ${
                  filter === "pending"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("contacted")}
                className={`px-4 py-2 rounded-xl font-medium transition text-sm ${
                  filter === "contacted"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Contacted
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-4 py-2 rounded-xl font-medium transition text-sm ${
                  filter === "completed"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Completed
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchSubmissions}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center gap-2 transition text-sm"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 rounded-xl bg-[#5B3DF5] hover:bg-[#4a2fc4] text-white flex items-center gap-2 transition text-sm"
              >
                <Download size={16} />
                Export CSV
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5B3DF5] text-sm"
            />
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Table View */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-10 text-center text-gray-500">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B3DF5]"></div>
                          </div>
                          <p className="mt-2">Loading submissions...</p>
                        </td>
                      </tr>
                    ) : paginatedSubmissions.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-10 text-center text-gray-500">
                          No submissions found
                        </td>
                      </tr>
                    ) : (
                      paginatedSubmissions.map((submission) => (
                        <tr
                          key={submission.id}
                          className={`hover:bg-gray-50 cursor-pointer transition ${
                            selectedSubmission?.id === submission.id ? "bg-purple-50" : ""
                          }`}
                          onClick={() => setSelectedSubmission(submission)}
                        >
                          <td className="px-5 py-3 text-sm font-medium text-gray-900">#{submission.id}</td>
                          <td className="px-5 py-3">
                            <div className="font-medium text-gray-900">{submission.name}</div>
                            <div className="text-xs text-gray-500">{submission.city}</div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="text-sm text-gray-600">{submission.phone}</div>
                            <div className="text-xs text-gray-400 truncate max-w-[150px]">{submission.email}</div>
                          </td>
                          <td className="px-5 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                              {getStatusIcon(submission.status)}
                              {submission.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-sm text-gray-500">
                            {new Date(submission.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-5 py-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteSubmission(submission.id);
                              }}
                              className="text-red-500 hover:text-red-700 transition"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 py-4 border-t border-gray-100">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selectedSubmission ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                <div className="bg-gradient-to-r from-[#5B3DF5] to-[#7B4DFF] px-5 py-4 text-white">
                  <h3 className="font-semibold">Submission Details</h3>
                  <p className="text-sm text-white/80">ID: #{selectedSubmission.id}</p>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-semibold">Name</label>
                    <p className="text-gray-900 font-medium mt-1">{selectedSubmission.name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-semibold">Phone</label>
                    <a href={`tel:${selectedSubmission.phone}`} className="text-[#5B3DF5] hover:text-[#4a2fc4] font-medium mt-1 flex items-center gap-2">
                      <Phone size={14} />
                      {selectedSubmission.phone}
                    </a>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-semibold">Email</label>
                    <a href={`mailto:${selectedSubmission.email}`} className="text-[#5B3DF5] hover:text-[#4a2fc4] font-medium mt-1 flex items-center gap-2 break-all">
                      <Mail size={14} />
                      {selectedSubmission.email}
                    </a>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-semibold">City</label>
                    <p className="text-gray-900 mt-1 flex items-center gap-2">
                      <MapPin size={14} className="text-gray-400" />
                      {selectedSubmission.city}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-semibold">Message</label>
                    <div className="bg-gray-50 rounded-xl p-3 mt-1 text-gray-700 text-sm leading-relaxed">
                      {selectedSubmission.message}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-semibold">Submitted</label>
                    <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      {new Date(selectedSubmission.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <label className="text-xs text-gray-500 uppercase font-semibold mb-2 block">Update Status</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(selectedSubmission.id, "pending")}
                        className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition ${
                          selectedSubmission.status === "pending"
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => updateStatus(selectedSubmission.id, "contacted")}
                        className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition ${
                          selectedSubmission.status === "contacted"
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        Contacted
                      </button>
                      <button
                        onClick={() => updateStatus(selectedSubmission.id, "completed")}
                        className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition ${
                          selectedSubmission.status === "completed"
                            ? "bg-gray-700 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        Done
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <a
                      href={`mailto:${selectedSubmission.email}?subject=Response to your inquiry - MAA JOGOMAYA ENERGY&body=Dear ${selectedSubmission.name},%0D%0A%0D%0AThank you for contacting MAA JOGOMAYA ENERGY.%0D%0A%0D%0AWe have received your inquiry and will get back to you shortly.%0D%0A%0D%0ABest regards,%0D%0AMAA JOGOMAYA ENERGY Team`}
                      className="flex-1 bg-[#5B3DF5] text-white px-4 py-2 rounded-xl text-center text-sm font-medium hover:bg-[#4a2fc4] transition flex items-center justify-center gap-2"
                    >
                      <Mail size={16} />
                      Reply
                    </a>
                    <a
                      href={`tel:${selectedSubmission.phone}`}
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded-xl text-center text-sm font-medium hover:bg-green-600 transition flex items-center justify-center gap-2"
                    >
                      <Phone size={16} />
                      Call
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Eye size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500">Select a submission to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Same as main website */}
      <footer className="bg-[#15153D] text-white mt-12">
        <div className="container-main py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/images/logo/Logo.png" alt="Logo" width={50} height={50} className="bg-white rounded-full p-2" />
                <h3 className="text-xl font-bold">MAA JOGOMAYA ENERGY</h3>
              </div>
              <p className="text-white/70 text-sm">Powering a greener tomorrow with sustainable solar energy solutions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/project" className="hover:text-white transition">Projects</Link></li>
                <li><Link href="/admin" className="hover:text-white transition">Admin</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>Rooftop Solar</li>
                <li>Commercial Solar</li>
                <li>Solar Maintenance</li>
                <li>Subsidy Assistance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>📍 Bhubaneswar, Odisha</li>
                <li>📞 +91 8280508088</li>
                <li>✉️ maajogomayaenergy@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-6 text-center text-white/50 text-sm">
            <p>&copy; {new Date().getFullYear()} MAA JOGOMAYA ENERGY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}