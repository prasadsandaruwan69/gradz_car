"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, Eye, Edit } from "lucide-react";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch vehicles from the API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/vehicles", {
          headers: {
            // Uncomment if using Sanctum
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const data = await response.json();
        setVehicles(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // Handle vehicle deletion
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/vehicles/${id}`, {
        method: "DELETE",
        headers: {
          // Uncomment if using Sanctum
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
        alert("Vehicle deleted successfully!");
      } else {
        alert("Failed to delete vehicle.");
      }
    } catch (err) {
      console.error("Error deleting vehicle:", err);
      alert("An error occurred while deleting the vehicle.");
    }
  };



  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">All Vehicles ({vehicles.length})</h1>
        <Link
          href="/admin/vehicles/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Vehicle
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center text-gray-400 py-8">No vehicles found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-900 rounded-lg shadow border border-gray-700">
            <thead>
              <tr className="bg-gray-800 text-left border-b border-gray-700">
                <th className="p-3">Image</th>
                <th className="p-3">Stock #</th>
                <th className="p-3">Vehicle Details</th>
                <th className="p-3">Auction Info</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={vehicle.id} className="border-b border-gray-800 hover:bg-gray-800">
                  {/* Image */}
                  <td className="p-3">
                    {vehicle.images && vehicle.images.length > 0 ? (
                      <img
                        src={`http://127.0.0.1:8000${vehicle.images[0]}`}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => (e.target.src = "/placeholder.jpg")} // Fallback image
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-700 rounded flex items-center justify-center text-xs">
                        No Image
                      </div>
                    )}
                  </td>
                  {/* Stock Number */}
                  <td className="p-3">{vehicle.stock_number}</td>
                  {/* Vehicle Details */}
                  <td className="p-3">
                    <div className="font-semibold">{`${vehicle.make} ${vehicle.model}`}</div>
                    <div className="text-sm text-gray-400">
                      {vehicle.vehicle_type || "N/A"} | {vehicle.body_type || "N/A"}
                    </div>
                    <div className="text-sm text-gray-400">
                      Year: {vehicle.manufacture_year || "N/A"} | Mileage: {vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : "N/A"}
                    </div>
                    <div className="text-sm text-gray-400">
                      {vehicle.transmission || "N/A"} | {vehicle.fuel || "N/A"}
                    </div>
                  </td>
                  {/* Auction Info */}
                  <td className="p-3">
                    <div className="text-sm">
                      Auction: {vehicle.auction_number || "N/A"}
                    </div>
                    <div className="text-sm">Lot: {vehicle.lot_number || "N/A"}</div>
                    <div className="text-sm">
                      Date: {vehicle.auction_date || "N/A"}
                    </div>
                    <div className="text-sm text-amber-400">
                      {vehicle.auction_price
                        ? `$${Number(vehicle.auction_price).toLocaleString()}`
                        : "N/A"}
                    </div>
                  </td>
                  {/* Price */}
                  <td className="p-3 text-amber-400">
                    {vehicle.fob_price
                      ? `$${Number(vehicle.fob_price).toLocaleString()}`
                      : "N/A"}
                  </td>
                  {/* Status */}
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        vehicle.status === "Now On Sale"
                          ? "bg-green-600"
                          : "bg-gray-600"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                    <div className="text-xs mt-1">
                      {vehicle.display ? "Visible" : "Hidden"}
                    </div>
                    {vehicle.is_4wd && (
                      <div className="text-xs text-blue-400 mt-1">4WD</div>
                    )}
                    {vehicle.genuine_stock && (
                      <div className="text-xs text-yellow-400 mt-1">Genuine</div>
                    )}
                  </td>
                  {/* Actions */}
                  <td className="p-3 flex gap-2">
                    <Link
                      href={`/admin/vehicles/${vehicle.id}`}
                      className="text-blue-400 hover:text-blue-500"
                      title="View"
                    >
                      <Eye size={20} />
                    </Link>
                    <Link
                      href={`/admin/vehicles/${vehicle.id}/edit`}
                      className="text-yellow-400 hover:text-yellow-500"
                      title="Edit"
                    >
                      <Edit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      className="text-red-400 hover:text-red-500"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}