"use client";

import React, { useState } from 'react';
import { 
  Menu, X, LogOut, Settings, Bell, Search, BarChart3, Users, Car, MessageSquare, 
  FileText, ShoppingCart, TrendingUp, Eye, Calendar, DollarSign, MapPin, Plus,
  ChevronRight, Home, Package, BarChart2, Zap, AlertCircle, CheckCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-blue-400' },
    { id: 'vehicles', label: 'Vehicles', icon: Car, color: 'text-green-400' },
    { id: 'customers', label: 'Customers', icon: Users, color: 'text-purple-400' },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, color: 'text-orange-400' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, color: 'text-pink-400' },
    { id: 'reports', label: 'Reports', icon: BarChart2, color: 'text-cyan-400' },
    { id: 'content', label: 'Content', icon: FileText, color: 'text-yellow-400' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-red-400' },
  ];

  const dashboardStats = [
    { label: 'Total Vehicles', value: '42', change: '+5', icon: Car, color: 'from-blue-600 to-blue-700' },
    { label: 'Active Listings', value: '38', change: '+2', icon: Eye, color: 'from-green-600 to-green-700' },
    { label: 'Total Customers', value: '1,240', change: '+120', icon: Users, color: 'from-purple-600 to-purple-700' },
    { label: 'Monthly Revenue', value: 'Rs. 45.2M', change: '+15%', icon: DollarSign, color: 'from-orange-600 to-orange-700' },
  ];

  const recentVehicles = [
    { id: 1, name: 'Toyota Camry 2023', price: '2.5M', status: 'Active', date: '2 hours ago' },
    { id: 2, name: 'Honda CR-V 2022', price: '2.2M', status: 'Active', date: '5 hours ago' },
    { id: 3, name: 'Nissan Altima 2023', price: '2.1M', status: 'Pending', date: '1 day ago' },
    { id: 4, name: 'Mazda CX-5 2022', price: '1.95M', status: 'Active', date: '2 days ago' },
    { id: 5, name: 'Lexus ES 2023', price: '3.2M', status: 'Active', date: '3 days ago' },
  ];

  const recentOrders = [
    { id: 'ORD001', customer: 'Rajesh Kumar', vehicle: 'Toyota Camry', amount: '2.5M', status: 'Completed', date: '2024-01-15' },
    { id: 'ORD002', customer: 'Priya Silva', vehicle: 'Honda CR-V', amount: '2.2M', status: 'Processing', date: '2024-01-14' },
    { id: 'ORD003', customer: 'Kamal Fernando', vehicle: 'Nissan Altima', amount: '2.1M', status: 'Pending', date: '2024-01-13' },
  ];

  const activityFeed = [
    { type: 'new_vehicle', message: 'New vehicle listed: Toyota Camry 2023', time: '2 hours ago' },
    { type: 'new_order', message: 'New order received from Rajesh Kumar', time: '4 hours ago' },
    { type: 'new_message', message: '5 new customer inquiries', time: '6 hours ago' },
    { type: 'vehicle_sold', message: 'Honda CR-V 2022 sold to Priya Silva', time: '1 day ago' },
  ];

  const renderContent = () => {
    switch(currentPage) {
      case 'dashboard':
        return renderDashboard();
      case 'vehicles':
        return renderVehicles();
      case 'customers':
        return renderCustomers();
      case 'orders':
        return renderOrders();
      case 'messages':
        return renderMessages();
      case 'reports':
        return renderReports();
      case 'content':
        return renderContent_management();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8   ">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-600/20 rounded-xl p-6 hover:border-amber-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-bold">{stat.change}</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-600/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Revenue Overview</h3>
          <div className="h-64 bg-gray-800/50 rounded-lg flex items-end justify-around p-4">
            {[65, 45, 80, 60, 90, 75, 85].map((height, idx) => (
              <div
                key={idx}
                className="flex-1 mx-1 bg-gradient-to-t from-amber-600 to-amber-500 rounded-t opacity-80 hover:opacity-100 transition-all"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-4">7-day revenue trend</p>
        </div>

        {/* Activity Feed */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-600/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {activityFeed.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-700 last:border-0">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-gray-300 text-sm">{activity.message}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Vehicles and Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Vehicles */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-600/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Vehicles</h3>
            <button className="text-amber-400 hover:text-amber-300 text-sm font-bold flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {recentVehicles.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all">
                <div className="flex-1">
                  <p className="text-white font-semibold">{vehicle.name}</p>
                  <p className="text-gray-400 text-sm">{vehicle.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-amber-400 font-bold">Rs. {vehicle.price}</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-bold mt-1 ${
                    vehicle.status === 'Active' 
                      ? 'bg-green-600/20 text-green-400' 
                      : 'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {vehicle.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-600/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Orders</h3>
            <button className="text-amber-400 hover:text-amber-300 text-sm font-bold flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all">
                <div className="flex-1">
                  <p className="text-white font-semibold">{order.id}</p>
                  <p className="text-gray-400 text-sm">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-amber-400 font-bold">Rs. {order.amount}</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-bold mt-1 ${
                    order.status === 'Completed' 
                      ? 'bg-green-600/20 text-green-400' 
                      : order.status === 'Processing'
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVehicles = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Vehicles Management</h2>
        <button className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add Vehicle
        </button>
      </div>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-600/20 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800/50 border-b border-amber-600/20">
              <th className="px-6 py-4 text-left text-gray-400">Vehicle</th>
              <th className="px-6 py-4 text-left text-gray-400">Price</th>
              <th className="px-6 py-4 text-left text-gray-400">Status</th>
              <th className="px-6 py-4 text-left text-gray-400">Views</th>
              <th className="px-6 py-4 text-left text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentVehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border-b border-gray-700 hover:bg-gray-800/30 transition-all">
                <td className="px-6 py-4 text-white font-semibold">{vehicle.name}</td>
                <td className="px-6 py-4 text-amber-400 font-bold">Rs. {vehicle.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    vehicle.status === 'Active' 
                      ? 'bg-green-600/20 text-green-400' 
                      : 'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">234</td>
                <td className="px-6 py-4">
                  <button className="text-amber-400 hover:text-amber-300 font-bold">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Customers Management</h2>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-600/20 rounded-xl p-6">
        <p className="text-gray-300">Total Customers: 1,240</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Active Customers</p>
            <p className="text-3xl font-bold text-green-400">856</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">New This Month</p>
            <p className="text-3xl font-bold text-blue-400">124</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Inactive</p>
            <p className="text-3xl font-bold text-orange-400">260</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Orders Management</h2>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-600/20 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800/50 border-b border-amber-600/20">
              <th className="px-6 py-4 text-left text-gray-400">Order ID</th>
              <th className="px-6 py-4 text-left text-gray-400">Customer</th>
              <th className="px-6 py-4 text-left text-gray-400">Vehicle</th>
              <th className="px-6 py-4 text-left text-gray-400">Amount</th>
              <th className="px-6 py-4 text-left text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-800/30 transition-all">
                <td className="px-6 py-4 text-amber-400 font-bold">{order.id}</td>
                <td className="px-6 py-4 text-white">{order.customer}</td>
                <td className="px-6 py-4 text-gray-300">{order.vehicle}</td>
                <td className="px-6 py-4 text-amber-400 font-bold">Rs. {order.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'Completed' 
                      ? 'bg-green-600/20 text-green-400' 
                      : order.status === 'Processing'
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Messages</h2>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-600/20 rounded-xl p-6">
        <p className="text-gray-300">You have 24 unread messages</p>
        <div className="mt-4 space-y-3">
          {[1,2,3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all">
              <div>
                <p className="text-white font-semibold">Customer {i}</p>
                <p className="text-gray-400 text-sm">Hi, I'm interested in the Toyota Camry...</p>
              </div>
              <span className="px-3 py-1 bg-amber-600 text-black text-xs font-bold rounded">New</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-600/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Sales Report</h3>
          <p className="text-gray-300">Total Sales (This Month): Rs. 45.2M</p>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-600/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Traffic Report</h3>
          <p className="text-gray-300">Total Visits (This Month): 12,450</p>
        </div>
      </div>
    </div>
  );

  const renderContent_management = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Content Management</h2>
        <button className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" /> Create Content
        </button>
      </div>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-600/20 rounded-xl p-6">
        <p className="text-gray-300">Manage news, blogs, and promotional content</p>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-600/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">General Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Business Name</p>
              <button className="text-amber-400 hover:text-amber-300">Edit</button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Email</p>
              <button className="text-amber-400 hover:text-amber-300">Edit</button>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-amber-600/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Security</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Change Password</p>
              <button className="text-amber-400 hover:text-amber-300">Update</button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Two-Factor Auth</p>
              <button className="text-amber-400 hover:text-amber-300">Enable</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-gray-900 to-black border-r border-amber-600/20 transition-all duration-300 flex flex-col fixed h-full z-40`}>
        {/* Logo */}
        <div className="p-6 border-b border-amber-600/20 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-2xl font-black text-amber-400">ADMIN</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-gray-800 rounded transition-all">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-6 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-3 transition-all ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-amber-600/30 to-amber-500/10 border-l-4 border-amber-400 text-amber-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${item.color}`} />
                {sidebarOpen && <span className="font-semibold">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-amber-600/20 p-6">
          <button className="w-full flex items-center gap-4 px-4 py-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all font-semibold">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 flex flex-col overflow-hidden transition-all duration-300`}>
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-amber-600/20 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center flex-1 gap-4">
            <div className="relative hidden md:block">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 border border-gray-700 pl-10 pr-4 py-2 rounded-lg text-gray-300 focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-all">
                <Bell className="w-5 h-5 text-gray-400" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center font-bold">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white">Admin</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}