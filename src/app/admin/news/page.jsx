// pages/admin/news.js
"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash, AlertCircle } from 'lucide-react';

export default function NewsAdminPage() {
  const [newsList, setNewsList] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    excerpt: '',
    content: '',
    date: '',
    author: '',
    category: '',
    image: null, // Changed to store file object
    readTime: '',
    featured: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch all news on mount
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/news', {
        headers: {
          'Accept': 'application/json',
        },
      });
      const data = await response.json();
      setNewsList(data.data || data); // Adjust based on Laravel response structure
    } catch (err) {
      setError('Failed to fetch news');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('excerpt', formData.excerpt);
      data.append('content', formData.content);
      data.append('date', formData.date);
      data.append('author', formData.author);
      data.append('category', formData.category);
      if (formData.image) data.append('image', formData.image);
      data.append('readTime', formData.readTime);
      data.append('featured', formData.featured ? 1 : 0);
      if (isEditing) data.append('_method', 'PUT'); // Laravel spoofing for PUT

      const response = await fetch(
        `http://127.0.0.1:8000/api/news${isEditing ? `/${formData.id}` : ''}`,
        {
          method: isEditing ? 'POST' : 'POST', // Use POST for Laravel PUT with _method
          body: data,
        }
      );
      if (response.ok) {
        fetchNews();
        setFormData({
          id: null,
          title: '',
          excerpt: '',
          content: '',
          date: '',
          author: '',
          category: '',
          image: null,
          readTime: '',
          featured: false,
        });
        setImagePreview(null);
        setIsEditing(false);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save news');
      }
    } catch (err) {
      setError('Error saving news');
    }
  };

  const handleEdit = (news) => {
    setFormData({
      ...news,
      image: null, // Reset image to avoid sending old image file
    });
    setImagePreview(news.image ? `http://127.0.0.1:8000/storage/${news.image}` : null);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this news article?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/news/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchNews();
        } else {
          setError('Failed to delete news');
        }
      } catch (err) {
        setError('Error deleting news');
      }
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
      

        {/* Form */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-amber-600/30 mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit News' : 'Create News'}</h2>
          {error && (
            <div className="flex items-center gap-2 text-red-400 mb-4">
              <AlertCircle className="w-5 h-5" /> {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="px-4 py-2 bg-gray-800 border border-amber-600/30 rounded-lg text-white"
              required
            />
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Excerpt"
              className="px-4 py-2 bg-gray-800 border border-amber-600/30 rounded-lg text-white"
              required
            />
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Content"
              className="px-4 py-2 bg-gray-800 border border-amber-600/30 rounded-lg text-white h-32"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="px-4 py-2 bg-gray-800 border border-amber-600/30 rounded-lg text-white"
              required
            />
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Author"
              className="px-4 py-2 bg-gray-800 border border-amber-600/30 rounded-lg text-white"
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="px-4 py-2 bg-gray-800 border border-amber-600/30 rounded-lg text-white"
              required
            >
              <option value="">Select Category</option>
              {['announcement', 'partnership', 'product', 'success', 'milestone', 'update', 'insight', 'award'].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
                className="px-4 py-2 bg-gray-800 border border-amber-600/30 rounded-lg text-white"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 h-32 w-auto rounded-lg"
                />
              )}
            </div>
            <input
              type="text"
              name="readTime"
              value={formData.readTime}
              onChange={handleInputChange}
              placeholder="Read Time (e.g., 5 min read)"
              className="px-4 py-2 bg-gray-800 border border-amber-600/30 rounded-lg text-white"
            />
            <label className="flex items-center gap-2 text-amber-400">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="h-5 w-5 text-amber-500"
              />
              Featured
            </label>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold rounded-lg hover:shadow-lg"
            >
              {isEditing ? 'Update News' : 'Create News'}
            </button>
          </form>
        </div>

        {/* News List */}
        <div className="grid gap-6">
          {newsList.map((news) => (
            <div key={news.id} className="flex justify-between items-center bg-gray-900 p-4 rounded-lg border border-amber-600/30">
              <div className="flex items-center gap-4">
                {news.image && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${news.image}`}
                    alt={news.title}
                    className="h-12 w-12 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="text-lg font-bold">{news.title}</h3>
                  <p className="text-gray-400 text-sm">{news.category} • {news.date}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleEdit(news)} className="text-amber-400 hover:text-amber-300">
                  <Edit className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(news.id)} className="text-red-400 hover:text-red-300">
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}