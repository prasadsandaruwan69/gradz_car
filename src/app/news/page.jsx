"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Search, Clock, TrendingUp, Zap, AlertCircle } from 'lucide-react';

export default function NewsPage() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleNews, setVisibleNews] = useState({});

  const allNews = [
    {
      id: 1,
      title: "Grand Carz Launches New Experience Center in Colombo",
      excerpt: "Grand Carz proudly announces the opening of our state-of-the-art Experience Center in prime Colombo location, featuring our latest Japanese vehicle collection.",
      content: "Grand Carz is thrilled to announce the grand opening of our new flagship Experience Center in Colombo. This modern facility showcases our extensive collection of premium Japanese vehicles and provides an immersive experience for our valued customers. The center features advanced display areas, comfortable consultation rooms, and comprehensive vehicle documentation.",
      date: "December 15, 2024",
      author: "Grand Carz Team",
      category: "announcement",
      image: "🏢",
      readTime: "5 min read",
      featured: true
    },
    {
      id: 2,
      title: "Partnership Expansion: Grand Auto Japan Strengthens Supply Chain",
      excerpt: "Our strategic partnership with Grand Auto Japan reaches new heights with expanded sourcing capabilities and faster delivery timelines for Sri Lankan customers.",
      content: "Building on our successful partnership with Grand Auto Japan, we're excited to announce expanded sourcing capabilities. This enables us to access an even wider selection of vehicles from major Japanese auction houses, ensuring our customers have more choices than ever before.",
      date: "December 10, 2024",
      author: "Partnership Team",
      category: "partnership",
      image: "🤝",
      readTime: "4 min read",
      featured: true
    },
    {
      id: 3,
      title: "New Vehicle Models Now Available - 2024 Latest Releases",
      excerpt: "Grand Carz now stocks the latest 2024 model vehicles including luxury SUVs, sedans, and hatchbacks from Japan's leading manufacturers.",
      content: "We're excited to introduce the latest 2024 model vehicles to our inventory. These vehicles feature cutting-edge technology, enhanced safety features, and improved fuel efficiency. Our team has personally selected these models to ensure they meet our premium quality standards.",
      date: "December 5, 2024",
      author: "Fleet Manager",
      category: "product",
      image: "🚗",
      readTime: "6 min read",
      featured: false
    },
    {
      id: 4,
      title: "Customer Success Story: Corporate Fleet Expansion",
      excerpt: "A leading Sri Lankan corporation successfully expanded their fleet by 50 vehicles through our direct import partnership, achieving 20% cost savings.",
      content: "One of our valued corporate clients successfully scaled their vehicle fleet from 40 to 90 vehicles through our direct import services. By leveraging our competitive pricing and streamlined import process, they achieved significant cost savings while maintaining superior quality standards.",
      date: "November 28, 2024",
      author: "Sales Team",
      category: "success",
      image: "📈",
      readTime: "7 min read",
      featured: false
    },
    {
      id: 5,
      title: "Grand Carz Achieves 4.9/5 Customer Satisfaction Rating",
      excerpt: "Our commitment to excellence is reflected in our outstanding 4.9 out of 5 customer satisfaction rating based on over 1,000 verified reviews.",
      content: "We're honored to announce that Grand Carz has achieved an impressive 4.9 out of 5 customer satisfaction rating. This milestone reflects our unwavering commitment to transparency, quality, and exceptional customer service. Every member of our team is dedicated to exceeding customer expectations.",
      date: "November 20, 2024",
      author: "Grand Carz Team",
      category: "milestone",
      image: "⭐",
      readTime: "5 min read",
      featured: false
    },
    {
      id: 6,
      title: "Import Process Simplified - New Digital Platform Launch",
      excerpt: "Grand Carz launches a new digital platform making vehicle selection, documentation, and import tracking easier than ever before.",
      content: "We're launching a revolutionary digital platform that streamlines the entire vehicle import process. Customers can now browse our inventory, track shipments in real-time, and manage documentation through a single, user-friendly portal.",
      date: "November 15, 2024",
      author: "Tech Team",
      category: "update",
      image: "💻",
      readTime: "5 min read",
      featured: false
    },
    {
      id: 7,
      title: "Exclusive: Japanese Market Insights & Vehicle Trends 2024",
      excerpt: "Industry experts analyze emerging trends in the Japanese automotive market and what these mean for Sri Lankan buyers in 2024.",
      content: "The Japanese automotive market continues to evolve with increasing focus on electric vehicles, hybrid technology, and advanced safety systems. These developments directly benefit our customers by providing access to innovative, reliable, and eco-friendly vehicle options.",
      date: "November 8, 2024",
      author: "Market Analysis Team",
      category: "insight",
      image: "📊",
      readTime: "8 min read",
      featured: false
    },
    {
      id: 8,
      title: "Grand Carz Wins 'Best Import Partner' Award",
      excerpt: "Grand Carz recognized by the Automotive Industry Association for outstanding service and commitment to customer excellence.",
      content: "We are thrilled to announce that Grand Carz has been awarded the prestigious 'Best Import Partner' award by the Automotive Industry Association. This recognition celebrates our dedication to quality, transparency, and customer satisfaction.",
      date: "November 1, 2024",
      author: "Awards Committee",
      category: "award",
      image: "🏆",
      readTime: "4 min read",
      featured: false
    }
  ];

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleNews((prev) => ({
            ...prev,
            [entry.target.dataset.id]: true,
          }));
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('[data-id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredNews = allNews.filter((item) => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredNews = allNews.filter(n => n.featured);

  const getCategoryColor = (category) => {
    const colors = {
      announcement: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
      partnership: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
      product: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30',
      success: 'bg-green-600/20 text-green-400 border-green-500/30',
      milestone: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30',
      update: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30',
      insight: 'bg-pink-600/20 text-pink-400 border-pink-500/30',
      award: 'bg-orange-600/20 text-orange-400 border-orange-500/30',
    };
    return colors[category] || colors.announcement;
  };

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-20 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <section className="relative pt-50 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">Latest Updates</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              News & Insights
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">Stay informed about Grand Carz updates, industry insights, and vehicle trends</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 animate-slideInUp">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-amber-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center bg-gray-900 border border-amber-600/30 rounded-xl overflow-hidden group-hover:border-amber-500/50 transition-all duration-300">
                <Search className="w-5 h-5 text-amber-500 ml-4" />
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-4 outline-none text-white placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News Carousel */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredNews.map((news, idx) => (
              <div
                key={news.id}
                data-id={`featured-${news.id}`}
                className={`relative group cursor-pointer transition-all duration-500 transform ${
                  visibleNews[`featured-${news.id}`] ? 'animate-slideInUp' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={() => setSelectedNews(news)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-amber-600/30 group-hover:border-amber-500/50 overflow-hidden h-full flex flex-col transform group-hover:scale-105 transition-all duration-300">
                  {/* Image Area */}
                  <div className="h-48 bg-gradient-to-br from-amber-600/30 to-amber-700/30 flex items-center justify-center text-7xl">
                    {news.image}
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    {/* Badge */}
                    <div className="mb-4">
                      <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${getCategoryColor(news.category)}`}>
                        {news.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-amber-400 transition-colors">
                      {news.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 leading-relaxed mb-6 flex-1">{news.excerpt}</p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-6 border-t border-amber-600/20">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> {news.date}
                        </span>
                      </div>
                      <button className="text-amber-400 group-hover:text-amber-300 transition-colors flex items-center gap-2">
                        Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter and News Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">All News</h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-12 animate-fadeInUp">
            {['all', 'announcement', 'partnership', 'product', 'success', 'milestone', 'update', 'insight', 'award'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 capitalize text-sm ${
                  filter === cat
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black shadow-lg'
                    : 'bg-gray-900 border border-amber-600/30 text-amber-400 hover:border-amber-500/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news, idx) => (
              <div
                key={news.id}
                data-id={`news-${news.id}`}
                className={`relative group cursor-pointer transition-all duration-500 transform ${
                  visibleNews[`news-${news.id}`] ? 'animate-slideInUp' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={() => setSelectedNews(news)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-amber-600/30 group-hover:border-amber-500/50 overflow-hidden h-full flex flex-col transform group-hover:scale-105 transition-all duration-300 p-6">
                  {/* Icon */}
                  <div className="text-5xl mb-4">{news.image}</div>

                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getCategoryColor(news.category)}`}>
                      {news.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-amber-400 transition-colors line-clamp-2">
                    {news.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">{news.excerpt}</p>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-amber-600/20">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {news.readTime}
                    </div>
                    <span className="text-xs text-gray-500">{news.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4 opacity-50" />
              <p className="text-gray-400 text-lg">No articles found matching your search</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-amber-600/30 p-12 animate-fadeInUp">
            <Zap className="w-12 h-12 text-amber-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 text-lg mb-8">Subscribe to our newsletter to receive the latest news, updates, and exclusive offers directly to your inbox</p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-gray-900 border border-amber-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-amber-600/50 transition-all transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-amber-600/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideInUp">
            {/* Header */}
            <div className="relative h-48 bg-gradient-to-br from-amber-600/30 to-amber-700/30 flex items-center justify-center text-6xl">
              {selectedNews.image}
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 rounded-full transition-all"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Category */}
              <div className="mb-4">
                <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${getCategoryColor(selectedNews.category)}`}>
                  {selectedNews.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-black text-white mb-6">{selectedNews.title}</h1>

              {/* Meta */}
              <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-amber-600/20 text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  {selectedNews.date}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-500" />
                  {selectedNews.author}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  {selectedNews.readTime}
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg mb-6">{selectedNews.content}</p>
                <p className="text-gray-300 leading-relaxed text-lg">Experience the Grand Carz difference today and discover why thousands of Sri Lankan customers trust us for their premium vehicle imports.</p>
              </div>

              {/* CTA */}
              <div className="mt-10 pt-8 border-t border-amber-600/20">
                <button className="w-full px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-amber-600/50 transition-all transform hover:scale-105">
                  Learn More About Grand Carz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}