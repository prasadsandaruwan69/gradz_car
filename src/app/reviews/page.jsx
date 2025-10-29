"use client";

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, X, Upload, Quote, TrendingUp, Users, Loader2 } from 'lucide-react';

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [activeReview, setActiveReview] = useState(0);
  const [filter, setFilter] = useState('all');
  const [visibleReviews, setVisibleReviews] = useState({});
  const [autoPlay, setAutoPlay] = useState(true);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    customers: '0+',
    rating: '0/5',
    success: '0%',
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
const [submitting, setSubmitting] = useState(false);
const [newReview, setNewReview] = useState({
  name: '',
  title: '',
  rating: 5,
  text: '',
  category: 'business',
  image: null,
  verified: false,
});



  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/reviews');
        const json = await res.json();
        const data = json.data || [];

        const total = data.length;
        const avgRating = total > 0
          ? (data.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
          : 0;
        const verifiedCount = data.filter(r => r.verified).length;
        const successRate = total > 0 ? Math.round((verifiedCount / total) * 100) : 0;

        setStats({
          customers: `${total}+`,
          rating: `${avgRating}/5`,
          success: `${successRate}%`,
        });

        setReviews(data);
        setFilteredReviews(data);
      } catch (err) {
        console.error('Failed to load reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);
const resetForm = () => {
  setNewReview({
    name: '',
    title: '',
    rating: 5,
    text: '',
    category: 'business',
    image: null,
    verified: false,
  });
};

const handleReviewSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  const formData = new FormData();
  formData.append('name', newReview.name);
  formData.append('title', newReview.title);
  formData.append('rating', newReview.rating);
  formData.append('text', newReview.text);
  formData.append('category', newReview.category);
  formData.append('verified', newReview.verified ? '1' : '0');
  if (newReview.image) formData.append('image', newReview.image);

  try {
    const res = await fetch('http://127.0.0.1:8000/api/reviews', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Failed');

    // Refresh reviews
    const updatedRes = await fetch('http://127.0.0.1:8000/api/reviews');
    const json = await updatedRes.json();
    setReviews(json.data || []);
    setFilteredReviews(json.data || []);

    setShowReviewForm(false);
    resetForm();
    alert('Thank you! Your review has been submitted.');
  } catch (err) {
    alert('Error submitting review.');
  } finally {
    setSubmitting(false);
  }
};
  // Filter
  useEffect(() => {
    const filtered = filter === 'all'
      ? reviews
      : reviews.filter(r => r.category === filter);
    setFilteredReviews(filtered);
  }, [filter, reviews]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || reviews.length === 0) return;
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoPlay, reviews.length]);

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleReviews((prev) => ({
              ...prev,
              [entry.target.dataset.id]: true,
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('[data-id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredReviews]);

  const current = reviews[activeReview] || {};

  const nextReview = () => {
    setActiveReview((prev) => (prev + 1) % reviews.length);
    setAutoPlay(false);
  };

  const prevReview = () => {
    setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    setAutoPlay(false);
  };



  return (
    <div className="bg-black text- mt-22 overflow-hidden min-h-screen">
      {/* Header */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">
            What Our Customers Say
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Customer Testimonials
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Real stories from satisfied customers who found their perfect vehicle through Grand Carz
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-7xl mx-auto px-4">
          {[
            { label: "Happy Customers", value: stats.customers, icon: Users },
            { label: "Average Rating", value: stats.rating, icon: Star },
            { label: "Success Rate", value: stats.success, icon: TrendingUp },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-amber-600/30 hover:border-amber-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <Icon className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                <p className="text-4xl font-black text-amber-400 mb-2">{stat.value}</p>
                <p className="text-gray-400 font-semibold">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Carousel */}
      {reviews.length > 0 && (
        <section
          className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-amber-400">Featured Review</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl border border-amber-600/30 p-8 md:p-12 h-full flex flex-col justify-between min-h-96">
                  <Quote className="w-12 h-12 text-amber-500 opacity-50 mb-6" />
                  <div className="flex gap-1 mb-6">
                    {[...Array(current.rating || 0)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xl text-gray-200 leading-relaxed mb-8 italic font-light min-h-24">
                    "{current.text}"
                  </p>
                  <div className="border-t border-amber-600/30 pt-6">
                    <p className="text-lg font-bold text-white">{current.name}</p>
                    <p className="text-amber-400 font-semibold mb-2">{current.title}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{current.formatted_date || current.date}</span>
                      {current.verified && (
                        <span className="flex items-center gap-1 text-amber-500">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex justify-center">
                  <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-500">
                    {current.image ? (
                      <img
                      
                        src={`http://127.0.0.1:8000/storage/${current.image}`} // Already full URL from Laravel
                        alt={current.name}
                        className="w-full h-full object-cover rounded-3xl"
                      />
                    ) : (
                      <span className="text-8xl font-black text-black">
                        {current.name?.[0] || '?'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 font-semibold">
                      Review {activeReview + 1} of {reviews.length}
                    </p>
                    <button
                      onClick={() => setAutoPlay(!autoPlay)}
                      className="text-amber-400 text-sm font-semibold hover:text-amber-300"
                    >
                      {autoPlay ? 'Pause' : 'Resume'}
                    </button>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300 rounded-full"
                      style={{ width: `${((activeReview + 1) / reviews.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button onClick={prevReview} className="p-3 bg-amber-600 hover:bg-amber-500 rounded-full transition-all transform hover:scale-110 shadow-lg">
                    <ChevronLeft className="w-6 h-6 text-black" />
                  </button>
                  <button onClick={nextReview} className="p-3 bg-amber-600 hover:bg-amber-500 rounded-full transition-all transform hover:scale-110 shadow-lg">
                    <ChevronRight className="w-6 h-6 text-black" />
                  </button>
                </div>

                <div className="flex gap-2 justify-center flex-wrap">
                  {reviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveReview(idx)}
                      className={`rounded-full transition-all duration-300 ${
                        idx === activeReview ? 'bg-amber-500 w-8 h-3' : 'bg-gray-700 w-3 h-3 hover:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter + Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        

     

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.length === 0 ? (
              <p className="col-span-full text-center text-gray-400 py-12">
                No reviews found for this category.
              </p>
            ) : (
              filteredReviews.map((review, idx) => (
                <div
                  key={review.id}
                  data-id={`review-${review.id}`}
                  className={`relative group transition-all duration-500 transform ${
                    visibleReviews[`review-${review.id}`] ? 'animate-slideInUp' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-amber-600/30 group-hover:border-amber-500/50 p-6 h-full flex flex-col transform group-hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      {review.image ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/${review.image}`} // Full URL from Laravel
                          alt={review.name}
                          className="w-14 h-14 rounded-xl object-cover border border-amber-600"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center">
                          <span className="font-bold text-black">{review.name[0]}</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-bold text-white">{review.name}</p>
                        <p className="text-sm text-amber-400">{review.title}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">
                      "{review.text}"
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-400 border-t border-amber-600/20 pt-4">
                      <span>{review.formatted_date || review.date}</span>
                      {review.verified && <span className="text-amber-500 font-semibold">Verified</span>}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
     {/* CTA + REVIEW FORM */}
<section className="relative py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-4xl md:text-5xl font-black mb-8 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
      Ready to Write Your Success Story?
    </h2>
    <p className="text-gray-300 text-xl mb-10">
      Join hundreds of satisfied customers who found their perfect vehicle with Grand Carz
    </p>

    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      {/* Browse Fleet → Open Review Form */}
      <button
        onClick={() => setShowReviewForm(true)}
        className="px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-amber-600/50 transition-all transform hover:scale-105 flex items-center gap-3"
      >
        <Quote className="w-6 h-6" />
        Write a Review
      </button>

      {/* Optional: Real Browse Fleet Button */}
      {/* <button className="px-10 py-4 border-2 border-amber-600 text-amber-400 font-bold text-lg rounded-lg hover:bg-amber-600/10 transition-all">
        Browse Our Fleet
      </button> */}
    </div>
  </div>

  {/* === REVIEW FORM MODAL === */}
  {showReviewForm && (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 border border-amber-600/30">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-400">Write Your Review</h2>
          <button
            onClick={() => {
              setShowReviewForm(false);
              resetForm();
            }}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleReviewSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
              <input
                type="text"
                required
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-amber-600/40 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title/Role</label>
              <input
                type="text"
                required
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-amber-600/40 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500"
                placeholder="Business Owner"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Your Review</label>
            <textarea
              required
              rows={5}
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-amber-600/40 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 resize-none"
              placeholder="Share your experience..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-gray-800 border border-amber-600/40 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              >
                {[5, 4, 3, 2, 1].map(n => (
                  <option key={n} value={n} className="bg-gray-800">
                    {n} Star{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={newReview.category}
                onChange={(e) => setNewReview({ ...newReview, category: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-amber-600/40 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              >
                {['business', 'corporate', 'fleet', 'family'].map(cat => (
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
                  checked={newReview.verified}
                  onChange={(e) => setNewReview({ ...newReview, verified: e.target.checked })}
                  className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500"
                />
                <span className="text-sm font-medium text-gray-300">Real review</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Photo (Optional)</label>
            <div className="flex items-center gap-4">
              {newReview.image ? (
                <div className="flex items-center gap-2">
                  <img
                    src={URL.createObjectURL(newReview.image)}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded-lg border border-amber-600"
                  />
                  <button
                    type="button"
                    onClick={() => setNewReview({ ...newReview, image: null })}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer px-5 py-3 bg-gray-800 border-2 border-dashed border-amber-600/50 rounded-lg hover:border-amber-500 transition flex flex-col items-center">
                  <Upload className="w-6 h-6 text-amber-500 mb-1" />
                  <span className="text-xs text-amber-400">Upload Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setNewReview({ ...newReview, image: e.target.files[0] });
                      }
                    }}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold rounded-lg hover:shadow-lg disabled:opacity-70 transition flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowReviewForm(false);
                resetForm();
              }}
              className="px-6 py-3 border border-amber-600/40 text-amber-400 rounded-lg hover:bg-amber-600/20 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</section>

      <style jsx>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideInUp { animation: slideInUp 0.8s ease-out forwards; }
      `}</style>
    </div>
  );
}