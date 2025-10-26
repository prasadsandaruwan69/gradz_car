"use client";
import { useState } from "react";

export default function AddContent() {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Content added!");
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-lg">
      <h1 className="text-xl font-bold mb-4">Add New Content</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          rows="4"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
