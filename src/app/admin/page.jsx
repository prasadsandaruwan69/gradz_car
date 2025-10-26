export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-amber-400">
        Dashboard Overview
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-[#1a1a1a] border-l-4 border-amber-500 p-5 rounded-xl shadow hover:scale-[1.02] transition">
          <h2 className="text-gray-300 text-sm uppercase">Total Vehicles</h2>
          <p className="text-2xl font-bold text-amber-400 mt-1">12</p>
        </div>

        <div className="bg-[#1a1a1a] border-l-4 border-amber-500 p-5 rounded-xl shadow hover:scale-[1.02] transition">
          <h2 className="text-gray-300 text-sm uppercase">Total Reports</h2>
          <p className="text-2xl font-bold text-amber-400 mt-1">5</p>
        </div>

        <div className="bg-[#1a1a1a] border-l-4 border-amber-500 p-5 rounded-xl shadow hover:scale-[1.02] transition">
          <h2 className="text-gray-300 text-sm uppercase">Pending Approvals</h2>
          <p className="text-2xl font-bold text-amber-400 mt-1">2</p>
        </div>
      </div>
    </div>
  );
}
