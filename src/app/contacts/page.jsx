"use client";

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleElements, setVisibleElements] = useState({});

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Grand Carz Experience Center, Colombo, Sri Lanka",
      subtext: "State-of-the-art showroom with premium vehicle collection"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+94 11 234 5678",
      subtext: "Monday - Friday: 9:00 AM - 6:00 PM"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "info@grandcarz.lk",
      subtext: "Response within 2 hours on business days"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon - Fri: 9:00 AM - 6:00 PM",
      subtext: "Sat - Sun: 10:00 AM - 5:00 PM"
    }
  ];

  const faqs = [
    {
      question: "How long does the import process take?",
      answer: "Typically, the complete import process takes 30-45 days from vehicle selection to delivery, depending on shipping schedules and documentation requirements."
    },
    {
      question: "Are all vehicles inspected before delivery?",
      answer: "Yes, every vehicle undergoes a rigorous 300-point inspection to ensure it meets our premium quality standards before delivery to customers."
    },
    {
      question: "What warranty coverage is provided?",
      answer: "We provide comprehensive warranty coverage for all vehicles. Details vary by vehicle age and model. Contact our team for specific warranty information."
    },
    {
      question: "Can I customize my vehicle selection?",
      answer: "Absolutely! Our team works directly with Grand Auto Japan to source vehicles matching your exact specifications, budget, and preferences."
    },
    {
      question: "What payment options are available?",
      answer: "We accept multiple payment methods including bank transfers, credit cards, and flexible financing options. Speak with our sales team for details."
    },
    {
      question: "Is after-sales support included?",
      answer: "Yes, we provide comprehensive after-sales support including maintenance guidance, spare parts assistance, and customer service for all imported vehicles."
    }
  ];

  const [expandedFaq, setExpandedFaq] = useState(null);

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements((prev) => ({
            ...prev,
            [entry.target.dataset.id]: true,
          }));
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('[data-id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setLoading(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Background Elements */}
      {/* <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-20 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div> */}

      {/* Header */}
      <section className="relative pt-50 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fadeInUp">
            <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">Get in Touch</p>
            <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">Have questions? Our dedicated team is here to help you find the perfect vehicle and guide you through the import process.</p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <div
                  key={idx}
                  data-id={`contact-${idx}`}
                  className={`relative group cursor-pointer transition-all duration-500 transform ${
                    visibleElements[`contact-${idx}`] ? 'animate-slideInUp' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600/40 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-amber-600/30 group-hover:border-amber-500/50 p-8 h-full flex flex-col transform group-hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                    <p className="text-amber-400 font-semibold mb-2">{info.details}</p>
                    <p className="text-gray-400 text-sm flex-1">{info.subtext}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div data-id="form-section" className={`transition-all duration-500 transform ${visibleElements['form-section'] ? 'animate-slideInLeft' : 'opacity-0'}`}>
              <h2 className="text-4xl font-bold mb-8">Send us a Message</h2>

              <div onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-amber-400 mb-3">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-3 bg-gray-900 border border-amber-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-amber-400 mb-3">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-3 bg-gray-900 border border-amber-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-amber-400 mb-3">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-3 bg-gray-900 border border-amber-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                    placeholder="+94 XX XXX XXXX"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-amber-400 mb-3">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-3 bg-gray-900 border border-amber-600/30 rounded-lg text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                  >
                    <option value="">Select a subject...</option>
                    <option value="vehicle-inquiry">Vehicle Inquiry</option>
                    <option value="import-process">Import Process</option>
                    <option value="after-sales">After-Sales Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-amber-400 mb-3">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-6 py-3 bg-gray-900 border border-amber-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 ${
                    submitted
                      ? 'bg-green-600 text-white'
                      : 'bg-gradient-to-r from-amber-600 to-amber-500 text-black hover:shadow-2xl hover:shadow-amber-600/50'
                  } ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                  {submitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" /> Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Send Message
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Map and Social Media */}
            <div data-id="map-section" className={`transition-all duration-500 transform ${visibleElements['map-section'] ? 'animate-slideInRight' : 'opacity-0'}`}>
              {/* Map Placeholder */}
              <div className="relative group mb-8 rounded-2xl overflow-hidden border border-amber-600/30 group-hover:border-amber-500/50 transition-all duration-300 h-80 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                  <MapPin className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                  <p className="text-xl font-bold text-white">Grand Carz Experience Center</p>
                  <p className="text-gray-400 mt-2">Colombo, Sri Lanka</p>
                  <button className="mt-6 px-6 py-2 bg-amber-600 hover:bg-amber-500 text-black font-semibold rounded-lg transition-all transform hover:scale-105">
                    View on Map
                  </button>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-600/30 rounded-2xl p-8 space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Info</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white mb-1">Working Hours</p>
                      <p className="text-gray-400 text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-400 text-sm">Sat - Sun: 10:00 AM - 5:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white mb-1">Emergency Support</p>
                      <p className="text-amber-400 font-bold">+94 11 234 5678</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-white mb-1">Email Response</p>
                      <p className="text-gray-400 text-sm">Within 2 hours on business days</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-6 border-t border-amber-600/20">
                  <p className="text-sm font-semibold text-amber-400 mb-4">Follow Us</p>
                  <div className="flex gap-4">
                    {[Facebook, Linkedin, Instagram, Twitter].map((Icon, idx) => (
                      <button
                        key={idx}
                        className="p-3 bg-gray-800 hover:bg-amber-600 text-gray-400 hover:text-black rounded-lg transition-all transform hover:scale-110"
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300 text-lg">Find answers to common questions about Grand Carz and our services</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                data-id={`faq-${idx}`}
                className={`transition-all duration-500 transform ${
                  visibleElements[`faq-${idx}`] ? 'animate-slideInUp' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 bg-gradient-to-br from-gray-900 to-black border border-amber-600/30 hover:border-amber-500/50 rounded-lg transition-all duration-300 group text-left"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{faq.question}</h3>
                    <div className={`text-amber-500 transition-transform duration-300 ${expandedFaq === idx ? 'rotate-180' : ''}`}>
                      ▼
                    </div>
                  </div>

                  {expandedFaq === idx && (
                    <p className="mt-4 text-gray-300 leading-relaxed animate-slideInUp border-t border-amber-600/20 pt-4">
                      {faq.answer}
                    </p>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center animate-fadeInUp">
          <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Ready to Find Your Perfect Vehicle?
          </h2>
          <p className="text-gray-300 text-xl mb-10">Our team of experts is ready to help you every step of the way</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-amber-600/50 transition-all transform hover:scale-105">
              Browse Our Fleet
            </button>
            <button className="px-10 py-4 border-2 border-amber-600 text-amber-400 font-bold text-lg rounded-lg hover:bg-amber-600/10 transition-all">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>

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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}