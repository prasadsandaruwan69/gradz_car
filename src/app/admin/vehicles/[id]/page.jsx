// app/admin/vehicles/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/vehicles/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch vehicle");
        }
        const data = await response.json();
        setVehicle(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  if (loading) return <div className="text-center p-4 text-white">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  if (!vehicle) return <div className="text-center p-4 text-white">Vehicle not found</div>;

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold text-amber-600">
            {vehicle.make} {vehicle.model}
          </h1>
          <Link
            href="/admin/vehicles"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Back to List
          </Link>
        </div>

        {/* Images */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-amber-600 mb-2">Images</h2>
          {vehicle.images && vehicle.images.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {vehicle.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://127.0.0.1:8000${image}`}
                  alt={`Vehicle image ${index + 1}`}
                  className="w-32 h-32 object-cover rounded"
                  onError={(e) => (e.target.src = "/placeholder.jpg")}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No images available</p>
          )}
        </div>

        {/* Vehicle Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-amber-600 mb-2">Vehicle Details</h2>
            <p><strong>Stock Number:</strong> {vehicle.stock_number}</p>
            <p><strong>Title:</strong> {vehicle.vehicle_title || "N/A"}</p>
            <p><strong>Type:</strong> {vehicle.vehicle_type || "N/A"}</p>
            <p><strong>Body Type:</strong> {vehicle.body_type || "N/A"}</p>
            <p><strong>Make:</strong> {vehicle.make}</p>
            <p><strong>Model:</strong> {vehicle.model}</p>
            <p><strong>Model Code:</strong> {vehicle.model_code || "N/A"}</p>
            <p><strong>Grade:</strong> {vehicle.grade || "N/A"}</p>
            <p><strong>Chassis No:</strong> {vehicle.chassis_no || "N/A"}</p>
            <p><strong>Manufacture Year:</strong> {vehicle.manufacture_year || "N/A"}</p>
            <p><strong>Registration Year:</strong> {vehicle.registration_year || "N/A"}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-amber-600 mb-2">Specifications</h2>
            <p><strong>Mileage:</strong> {vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : "N/A"}</p>
            <p><strong>Engine CC:</strong> {vehicle.engine_cc || "N/A"}</p>
            <p><strong>Engine Capacity:</strong> {vehicle.engine_capacity || "N/A"}</p>
            <p><strong>Engine Model:</strong> {vehicle.engine_model || "N/A"}</p>
            <p><strong>Seating Capacity:</strong> {vehicle.seating_capacity || "N/A"}</p>
            <p><strong>HS Code:</strong> {vehicle.hs_code || "N/A"}</p>
            <p><strong>Height:</strong> {vehicle.height || "N/A"} m</p>
            <p><strong>Length:</strong> {vehicle.length || "N/A"} m</p>
            <p><strong>Width:</strong> {vehicle.width || "N/A"} m</p>
            <p><strong>Loading Capacity:</strong> {vehicle.loading_capacity || "N/A"} tons</p>
            <p><strong>Weight:</strong> {vehicle.weight || "N/A"} kg</p>
            <p><strong>Doors:</strong> {vehicle.doors || "N/A"}</p>
            <p><strong>M3:</strong> {vehicle.m3 || "N/A"}</p>
          </div>
        </div>

        {/* Transmission & Features */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-amber-600 mb-2">Features</h2>
          <p><strong>Transmission:</strong> {vehicle.transmission || "N/A"}</p>
          <p><strong>Fuel:</strong> {vehicle.fuel || "N/A"}</p>
          <p><strong>Drive:</strong> {vehicle.drive || "N/A"}</p>
          <p><strong>Exterior Color:</strong> {vehicle.exterior_color || "N/A"}</p>
          <p><strong>Interior Grade:</strong> {vehicle.interior_grade || "N/A"}</p>
          <p><strong>Exterior Grade:</strong> {vehicle.exterior_grade || "N/A"}</p>
          <p><strong>4WD:</strong> {vehicle.is_4wd ? "Yes" : "No"}</p>
        </div>

        {/* Auction Info */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-amber-600 mb-2">Auction Info</h2>
          <p><strong>Auction Number:</strong> {vehicle.auction_number || "N/A"}</p>
          <p><strong>Lot Number:</strong> {vehicle.lot_number || "N/A"}</p>
          <p><strong>Auction System:</strong> {vehicle.auction_system || "N/A"}</p>
          <p><strong>Auction Date:</strong> {vehicle.auction_date || "N/A"}</p>
          <p><strong>Auction Price:</strong> {vehicle.auction_price ? `$${Number(vehicle.auction_price).toLocaleString()}` : "N/A"}</p>
        </div>

        {/* Status & Pricing */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-amber-600 mb-2">Status & Pricing</h2>
          <p><strong>Status:</strong> {vehicle.status}</p>
          <p><strong>Display:</strong> {vehicle.display ? "Visible" : "Hidden"}</p>
          <p><strong>Genuine Stock:</strong> {vehicle.genuine_stock ? "Yes" : "No"}</p>
          <p><strong>FOB Price:</strong> {vehicle.fob_price ? `$${Number(vehicle.fob_price).toLocaleString()}` : "N/A"}</p>
          <p><strong>Stock Location:</strong> {vehicle.stock_location || "N/A"}</p>
          <p><strong>Condition:</strong> {vehicle.condition || "N/A"}</p>
          <p><strong>Sales Person:</strong> {vehicle.sales_person || "N/A"}</p>
        </div>

        {/* Media */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-amber-600 mb-2">Media</h2>
          <p><strong>Video URL:</strong> {vehicle.video_url ? <a href={vehicle.video_url} className="text-blue-400 hover:underline" target="_blank">{vehicle.video_url}</a> : "N/A"}</p>
        </div>

        {/* Remarks */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-amber-600 mb-2">Remarks</h2>
          <p>{vehicle.remarks || "No remarks"}</p>
        </div>

        {/* Maintenance Points */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-amber-600 mb-2">Maintenance Points</h2>
          {vehicle.maintenance_points ? (
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(vehicle.maintenance_points).map(([key, value]) => (
                value && (
                  <div key={key} className="text-sm">
                    <span className="text-green-400">✓</span> {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </div>
                )
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No maintenance points</p>
          )}
        </div>

        {/* Mechanical Results */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-amber-600 mb-2">Mechanical Results</h2>
          {vehicle.mechanical_results ? (
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(vehicle.mechanical_results).map(([key, value]) => (
                value && (
                  <div key={key} className="text-sm text-red-400">
                    ✗ {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </div>
                )
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No mechanical issues</p>
          )}
        </div>

        {/* Other Options */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-amber-600 mb-2">Other Options</h2>
          {vehicle.other_options ? (
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(vehicle.other_options).map(([key, value]) => (
                value && (
                  <div key={key} className="text-sm">
                    <span className="text-green-400">✓</span> {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </div>
                )
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No other options</p>
          )}
        </div>

        {/* Accessories & Options */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-amber-600 mb-2">Accessories & Options</h2>
          {vehicle.accessories_options ? (
            Object.entries(vehicle.accessories_options).map(([category, fields]) => (
              <div key={category} className="mb-4">
                <h3 className="text-md font-medium text-amber-600 capitalize">
                  {category.replace(/_/g, " ")}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(fields).map(([field, value]) => (
                    value && (
                      <div key={field} className="text-sm">
                        <span className="text-green-400">✓</span> {field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </div>
                    )
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No accessories</p>
          )}
        </div>
      </div>
    </div>
  );
}