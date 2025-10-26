// app/admin/vehicles/[id]/edit/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X, LogOut, Search, Bell, Home, Car, Users, ShoppingCart, MessageSquare, FileText, Settings, BarChart2, Plus } from "lucide-react";

export default function VehicleEdit() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    auction_number: '',
    lot_number: '',
    auction_system: '',
    auction_date: '',
    auction_price: '',
    stock_number: '',
    vehicle_title: '',
    vehicle_type: '',
    body_type: '',
    make: '',
    model: '',
    model_code: '',
    grade: '',
    chassis_no: '',
    manufacture_year: '',
    registration_year: '',
    mileage: '',
    engine_cc: '',
    engine_capacity: '',
    engine_model: '',
    seating_capacity: '',
    hs_code: '',
    height: '',
    length: '',
    width: '',
    loading_capacity: '',
    weight: '',
    doors: '',
    m3: '',
    transmission: '',
    fuel: '',
    drive: '',
    exterior_color: '',
    interior_grade: '',
    exterior_grade: '',
    is_4wd: false,
    video_url: '',
    status: 'Now On Sale',
    display: true,
    genuine_stock: false,
    fob_price: '',
    stock_location: '',
    condition: '',
    sales_person: '',
    remarks: '',
    maintenance_points: {
      new_tires: false,
      one_owner: false,
      upgraded_sound_system: false,
      turbo: false,
      locks_and_runs_great: false,
      must_see: false,
      all_scheduled_maintenance: false,
      perfect_first_car: false,
      new_paint: false,
      no_accidents: false,
      non_smoker: false,
      very_clean_interior: false,
      low_mileage: false,
      always_garaged: false,
      never_seen_snow: false,
      runs_and_drives_great: false,
    },
    mechanical_results: {
      engine_noise: false,
      engine_overheat: false,
      smokes_from_exhaust: false,
      transmission_slipping: false,
      a_c_out_of_order: false,
      recent_accident_history: false,
      weak_brakes: false,
      damaged_vehicle: false,
    },
    other_options: {
      mileage_unknown: false,
      clutch_slipping_problems: false,
    },
    accessories_options: {
      comfort: { ac_front: false, ac_rear: false },
      other_features: { _2wd: false, _4wd_camera: false },
      other_selling_points: { door_visor: false, floor_mats: false, new_paint: false },
      safety: { abs: false, air_bag: false, alarm: false },
      seat: { bucket_seat: false, half_leather_seat: false },
      sound_system: { am_fm_radio: false, am_fm_stereo: false, cd_changer: false },
      windows: { power_windows: false, rear_window_defroster: false, rear_window_wiper: false },
    },
    images: [],
    addWatermark: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch vehicle data to pre-fill form
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/vehicles/${id}`);
        if (!response.ok) throw new Error("Failed to fetch vehicle");
        const data = await response.json();
        // Ensure all fields are present, even if null, to match formData structure
        setFormData({
          ...formData,
          ...data,
          images: [], // Don't pre-fill images; handle separately if needed
          addWatermark: false, // Reset watermark for new uploads
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const parts = name.split(".");
      if (parts.length === 2) {
        const [section, field] = parts;
        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            [field]: checked,
          },
        }));
      } else if (parts.length === 3) {
        const [section, category, field] = parts;
        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            [category]: {
              ...prev[section][category],
              [field]: checked,
            },
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || e.dataTransfer.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "images") {
        formData.images.forEach((image, index) => {
          formDataToSend.append(`images[${index}]`, image);
        });
      } else if (
        key === "maintenance_points" ||
        key === "mechanical_results" ||
        key === "other_options" ||
        key === "accessories_options"
      ) {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else if (
        key === "is_4wd" ||
        key === "display" ||
        key === "genuine_stock" ||
        key === "addWatermark"
      ) {
        formDataToSend.append(key, formData[key] ? "1" : "0");
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/vehicles/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });
      if (response.ok) {
        alert("Vehicle updated successfully!");
        router.push(`/admin/vehicles/${id}`);
      } else {
        const errorData = await response.json();
        console.error("Validation errors:", errorData);
        alert("Failed to update vehicle: " + JSON.stringify(errorData.errors));
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };

  if (loading) return <div className="text-center p-4 text-white">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="h-screen bg-black text-white">
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
        <div className="flex overflow-auto p-8">
          <div className="container bg-black mx-auto p-4">
            <div className="flex justify-between mb-6">
              <h1 className="text-2xl font-bold text-amber-600">Edit Vehicle</h1>
              <Link
                href={`/admin/vehicles/${id}`}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Back to Details
              </Link>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Auction / Purchase Info */}
              <div>
                <label className="block text-sm font-medium text-amber-600">Auction Number</label>
                <input
                  type="text"
                  name="auction_number"
                  value={formData.auction_number || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Lot Number</label>
                <input
                  type="text"
                  name="lot_number"
                  value={formData.lot_number || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Auction System</label>
                <input
                  type="text"
                  name="auction_system"
                  value={formData.auction_system || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Auction Date</label>
                <input
                  type="date"
                  name="auction_date"
                  value={formData.auction_date || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Auction Price</label>
                <input
                  type="number"
                  name="auction_price"
                  value={formData.auction_price || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                  step="0.01"
                />
              </div>

              {/* Basic Vehicle Info */}
              <div>
                <label className="block text-sm font-medium text-amber-600">Stock Number</label>
                <input
                  type="text"
                  name="stock_number"
                  value={formData.stock_number || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Vehicle Title</label>
                <input
                  type="text"
                  name="vehicle_title"
                  value={formData.vehicle_title || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Vehicle Type</label>
                <input
                  type="text"
                  name="vehicle_type"
                  value={formData.vehicle_type || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Body Type</label>
                <input
                  type="text"
                  name="body_type"
                  value={formData.body_type || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Make</label>
                <input
                  type="text"
                  name="make"
                  value={formData.make || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Model Code</label>
                <input
                  type="text"
                  name="model_code"
                  value={formData.model_code || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Grade</label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Chassis No</label>
                <input
                  type="text"
                  name="chassis_no"
                  value={formData.chassis_no || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Manufacture Year</label>
                <input
                  type="number"
                  name="manufacture_year"
                  value={formData.manufacture_year || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                  min="1900"
                  max="2100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Registration Year</label>
                <input
                  type="number"
                  name="registration_year"
                  value={formData.registration_year || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                  min="1900"
                  max="2100"
                />
              </div>

              {/* Dimensions & Specs */}
              <div>
                <label className="block text-sm font-medium text-amber-600">Mileage</label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Engine CC</label>
                <input
                  type="number"
                  name="engine_cc"
                  value={formData.engine_cc || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Engine Capacity</label>
                <input
                  type="number"
                  name="engine_capacity"
                  value={formData.engine_capacity || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Engine Model</label>
                <input
                  type="text"
                  name="engine_model"
                  value={formData.engine_model || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Seating Capacity</label>
                <input
                  type="number"
                  name="seating_capacity"
                  value={formData.seating_capacity || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">HS Code</label>
                <input
                  type="text"
                  name="hs_code"
                  value={formData.hs_code || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Height</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Length</label>
                <input
                  type="number"
                  name="length"
                  value={formData.length || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Width</label>
                <input
                  type="number"
                  name="width"
                  value={formData.width || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Loading Capacity</label>
                <input
                  type="number"
                  name="loading_capacity"
                  value={formData.loading_capacity || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Weight</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Doors</label>
                <input
                  type="number"
                  name="doors"
                  value={formData.doors || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">M3</label>
                <input
                  type="text"
                  name="m3"
                  value={formData.m3 || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>

              {/* Transmission / Fuel / Drive */}
              <div>
                <label className="block text-sm font-medium text-amber-600">Transmission</label>
                <input
                  type="text"
                  name="transmission"
                  value={formData.transmission || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Fuel</label>
                <input
                  type="text"
                  name="fuel"
                  value={formData.fuel || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Drive</label>
                <input
                  type="text"
                  name="drive"
                  value={formData.drive || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Exterior Color</label>
                <input
                  type="text"
                  name="exterior_color"
                  value={formData.exterior_color || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Interior Grade</label>
                <input
                  type="text"
                  name="interior_grade"
                  value={formData.interior_grade || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Exterior Grade</label>
                <input
                  type="text"
                  name="exterior_grade"
                  value={formData.exterior_grade || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <input
                  type="checkbox"
                  name="is_4wd"
                  checked={formData.is_4wd}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm text-amber-600">Is 4WD</label>
              </div>

              {/* Media */}
              <div>
                <label className="block text-sm font-medium text-amber-600">Video URL</label>
                <input
                  type="url"
                  name="video_url"
                  value={formData.video_url || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>

              {/* Stock Status */}
              <div>
                <label className="block text-sm font-medium text-amber-600">Status</label>
                <select
                  name="status"
                  value={formData.status || "Now On Sale"}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                >
                  <option value="Now On Sale">Now On Sale</option>
                  <option value="Sold">Sold</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="display"
                  checked={formData.display}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm text-amber-600">Display</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="genuine_stock"
                  checked={formData.genuine_stock}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm text-amber-600">Genuine Stock</label>
              </div>

              {/* Pricing */}
              <div>
                <label className="block text-sm font-medium text-amber-600">FOB Price</label>
                <input
                  type="number"
                  name="fob_price"
                  value={formData.fob_price || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Stock Location</label>
                <input
                  type="text"
                  name="stock_location"
                  value={formData.stock_location || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Condition</label>
                <select
                  name="condition"
                  value={formData.condition || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                >
                  <option value="">Select Condition</option>
                  <option value="Accident">Accident</option>
                  <option value="Damaged">Damaged</option>
                  <option value="Salvaged">Salvaged</option>
                  <option value="None">None</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-600">Sales Person</label>
                <input
                  type="text"
                  name="sales_person"
                  value={formData.sales_person || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm font-medium text-amber-600">Remarks</label>
                <textarea
                  name="remarks"
                  value={formData.remarks || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-amber-600/20 rounded p-2 bg-gray-900 text-white"
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <h2 className="text-lg font-semibold text-amber-600">Vehicle Images</h2>
                <div className="border-2 border-dashed border-amber-600/20 p-6 bg-gray-900 rounded-lg text-center">
                  <p className="text-sm text-gray-400 mb-2">Upload file Max: 5MB</p>
                  <p className="text-sm text-gray-400 mb-4">Vehicle Normal Images</p>
                  <p className="text-sm text-red-500 mb-2">
                    1. Max. 60 Images Allow on create page and only jpg, jpeg, png, & bmp format Allow and Max. File Size 5MB Allow.
                  </p>
                  <p className="text-sm text-gray-400 mb-2">2. To Change Order of Images Drag the image and Drop Desired Location.</p>
                  <p className="text-sm text-gray-400 mb-2">3. Check Add Watermark before uploading the images to put watermark on all images.</p>
                  <label className="cursor-pointer bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition-all">
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/bmp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    Browse Files
                  </label>
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleImageUpload}
                    className="mt-4 border-2 border-amber-600/20 p-4 rounded-lg"
                  >
                    <p className="text-sm text-gray-400">Drag & Drop Files Here</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== index),
                            }))
                          }
                          className="absolute top-0 right-0 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2">
                    <input
                      type="checkbox"
                      name="addWatermark"
                      checked={formData.addWatermark}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label className="text-sm text-white">Add Watermark</label>
                  </div>
                </div>
              </div>

              {/* Maintenance Points */}
              <div>
                <h2 className="text-lg font-semibold text-amber-600">Maintenance Points</h2>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(formData.maintenance_points).map((key) => (
                    <div key={key}>
                      <input
                        type="checkbox"
                        name={`maintenance_points.${key}`}
                        checked={formData.maintenance_points[key]}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label className="text-sm text-white">
                        {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mechanical Results */}
              <div>
                <h2 className="text-lg font-semibold text-amber-600">Mechanical Results</h2>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(formData.mechanical_results).map((key) => (
                    <div key={key}>
                      <input
                        type="checkbox"
                        name={`mechanical_results.${key}`}
                        checked={formData.mechanical_results[key]}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label className="text-sm text-white">
                        {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Options */}
              <div>
                <h2 className="text-lg font-semibold text-amber-600">Other Options</h2>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(formData.other_options).map((key) => (
                    <div key={key}>
                      <input
                        type="checkbox"
                        name={`other_options.${key}`}
                        checked={formData.other_options[key]}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label className="text-sm text-white">
                        {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accessories & Options */}
              <div>
                <h2 className="text-lg font-semibold text-amber-600">Accessories & Options</h2>
                {Object.entries(formData.accessories_options).map(([category, fields]) => (
                  <div key={category} className="mb-4">
                    <h3 className="text-md font-medium text-amber-600 capitalize">
                      {category.replace(/_/g, " ")}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.keys(fields).map((field) => (
                        <div key={field}>
                          <input
                            type="checkbox"
                            name={`accessories_options.${category}.${field}`}
                            checked={fields[field]}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          <label className="text-sm text-white">
                            {field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
              >
                Update Vehicle
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}