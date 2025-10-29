"use client";
import React, { useState, useEffect } from 'react';
import { Star, Upload, X, Edit, Trash2, Loader2, AlertCircle } from 'lucide-react';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    title: '',
    rating: 5,
    text: '',
    category: 'business',
    image: null,
    verified: false,
  });

  const categories = ['business', 'corporate', 'fleet', 'family'];

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/reviews');
      const json = await res.json();
      setReviews(json.data || []);
    } catch (err) {
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Submit new/edit review
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('title', form.title);
    formData.append('rating', form.rating.toString());
    formData.append('text', form.text);
    formData.append('category', form.category);
    formData.append('verified', form.verified ? '1' : '0');
    if (form.image) formData.append('image', form.image);

    try {
      const url = editingId
        ? `http://127.0.0.1:8000/api/reviews/${editingId}`
        : 'http://127.0.0.1:8000/api/reviews';

      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to save');

      await fetchReviews();
      resetForm();
      setShowForm(false);
    } catch (err) {
      setError('Error saving review');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      title: '',
      rating: 5,
      text: '',
      category: 'business',
      image: null,
      verified: false,
    });
    setEditingId(null);
  };

  const handleEdit = (review) => {
    setForm({
      name: review.name,
      title: review.title,
      rating: review.rating,
      text: review.text,
      category: review.category,
      image: null,
      verified: review.verified,
    });
    setEditingId(review.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    setDeletingId(id);

    try {
      await fetch(`http://127.0.0.1:8000/api/reviews/${id}`, { method: 'DELETE' });
      setReviews(reviews.filter(r => r.id !== id));
    } catch (err) {
      setError('Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  const toggleVerified = async (id, current) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified: !current }),
      });
      setReviews(reviews.map(r => r.id === id ? { ...r, verified: !current } : r));
    } catch (err) {
      setError('Failed to update');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Manage Reviews
          </h1>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition flex items-center gap-2 shadow-lg"
          >
            <Upload className="w-4 h-4" /> Add Review
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-600 text-red-400 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border border-amber-600/30">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-amber-400">{editingId ? 'Edit' : 'Add'} Review</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-amber-600/40 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-amber-600/40 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500"
                      placeholder="Business Owner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Review Text</label>
                  <textarea
                    required
                    rows={4}
                    value={form.text}
                    onChange={e => setForm({ ...form, text: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-amber-600/40 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 resize-none"
                    placeholder="Write your review..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Rating</label>
                    <select
                      value={form.rating}
                      onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 bg-gray-800 border border-amber-600/40 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                    >
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n} className="bg-gray-800">{n} Star{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                    <select
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-amber-600/40 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-gray-800 capitalize">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer mt-8">
                      <input
                        type="checkbox"
                        checked={form.verified}
                        onChange={e => setForm({ ...form, verified: e.target.checked })}
                        className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500"
                      />
                      <span className="text-sm font-medium text-gray-300">Verified / Featured</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Image (Optional)</label>
                  <div className="flex items-center gap-4">
                    {form.image ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={URL.createObjectURL(form.image)}
                          alt="preview"
                          className="w-16 h-16 object-cover rounded-lg border border-amber-600"
                        />
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, image: null })}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer px-4 py-2 bg-gray-800 border-2 border-dashed border-amber-600/50 rounded-lg hover:border-amber-500 transition flex flex-col items-center">
                        <Upload className="w-5 h-5 text-amber-500 mb-1" />
                        <span className="text-xs text-amber-400">Upload Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                              setForm({ ...form, image: e.target.files[0] });
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
                  >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                    {editingId ? 'Update' : 'Create'} Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 border border-amber-600/40 text-amber-400 rounded-lg hover:bg-amber-600/20 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reviews Table */}
        <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-amber-600/20">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-amber-600/10 to-amber-500/10 border-b border-amber-600/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-amber-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-amber-400 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-amber-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-amber-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-amber-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-600/20">
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No reviews yet. Click "Add Review" to get started.
                  </td>
                </tr>
              ) : (
                reviews.map(review => (
                  <tr key={review.id} className="hover:bg-amber-600/5 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {review.image ? (
                          <img src={review.image} alt={review.name} className="w-10 h-10 rounded-full object-cover border border-amber-600" />
                        ) : (
                          <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-black font-bold text-lg">
                            {review.name[0]}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-white">{review.name}</p>
                          <p className="text-sm text-amber-400">{review.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300 capitalize">{review.category}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleVerified(review.id, review.verified)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                          review.verified
                            ? 'bg-green-900/50 text-green-400 border border-green-600'
                            : 'bg-gray-800 text-gray-400 border border-gray-700'
                        }`}
                      >
                        {review.verified ? 'Verified' : 'Unverified'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(review)}
                          className="p-2 text-amber-400 hover:bg-amber-600/20 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(review.id)}
                          disabled={deletingId === review.id}
                          className="p-2 text-red-400 hover:bg-red-600/20 rounded-lg transition disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === review.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}