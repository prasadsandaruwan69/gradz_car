"use client";
import Link from "next/link";

export default function ContentList() {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">All Content</h1>
        <Link href="/admin/content/add" className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add Content
        </Link>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <p>No content yet.</p>
      </div>
    </div>
  );
}
