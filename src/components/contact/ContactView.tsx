"use client";

import React, { useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { whatsappLink } from "@/data/brand";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  ChevronRight,
  Truck,
  ShieldCheck,
} from "lucide-react";

export default function ContactView() {
  // Form submission and local state management
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Order Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [honeypot, setHoneypot] = useState(""); // must stay empty; bots fill it
  const { contact } = useSettings();

  // Handle generic input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Sends the message to the store inbox (and emails the owner)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not send your message");

      setIsSubmitted(true);
      setFormData({ name: "", phone: "", email: "", subject: "Order Inquiry", message: "" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Could not send your message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-canvas min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-stone-500">
          <Link href="/" className="hover:text-gold-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-stone-800">Contact & Support</span>
        </nav>

        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-gold-700 uppercase tracking-widest">
            24/7 Dedicated Care
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-stone-900">
            We&apos;re Here To Assist Your Healthy Journey.
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
            Have questions regarding our wild mountain honey, bulk wedding hampers, or nationwide COD delivery? Reach out to our Karachi customer fulfillment team.
          </p>
        </div>

        {/* Main Grid: Direct Details + Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Info Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Quick Chat Card */}
            <div className="bg-primary text-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg relative overflow-hidden">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-leaf-700/60 px-3 py-1 rounded-full text-leaf-200 inline-block">
                  Instant Support
                </span>
                <h2 className="text-lg sm:text-xl font-display font-bold pt-1">
                  Connect on WhatsApp
                </h2>
                <p className="text-xs text-leaf-100/80 leading-relaxed">
                  Fastest response for order status, bank transfer receipts, and harvest consultations.
                </p>
              </div>

              <a
                href={whatsappLink("Hello Mewazar Team, I have an inquiry regarding your products.", contact.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#25D366] hover:brightness-110 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Specialist</span>
              </a>
            </div>

            {/* Contact Details List */}
            <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
              <h2 className="text-base font-display font-bold text-stone-900 border-b border-stone-100 pb-3">
                Store & Office Coordinates
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gold-50 text-gold-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Head Fulfillment Hub</h3>
                    <p className="text-stone-500 mt-0.5 leading-relaxed">
                      Plot 14-C, Lane 4, Bukhari Commercial Area, Phase 6 DHA, Karachi, Pakistan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gold-50 text-gold-800 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Phone Helpline</h3>
                    <p className="text-stone-500 mt-0.5">{contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gold-50 text-gold-800 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Email Address</h3>
                    <p className="text-stone-500 mt-0.5">{contact.supportEmail}{contact.salesEmail !== contact.supportEmail ? ` / ${contact.salesEmail}` : ""}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gold-50 text-gold-800 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Operating Hours</h3>
                    <p className="text-stone-500 mt-0.5">Monday - Saturday: 9:00 AM - 9:00 PM PKT</p>
                  </div>
                </div>
              </div>

              {/* Service Badges */}
              <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-stone-50 rounded-xl">
                  <Truck className="w-4 h-4 text-heading mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-stone-700 block">
                    Nationwide Courier
                  </span>
                  <span className="text-[9px] text-stone-400">2 to 4 Days (TCS/Leopards)</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-heading mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-stone-700 block">
                    Safe Packaging
                  </span>
                  <span className="text-[9px] text-stone-400">Air-tight Glass & Jars</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Customer Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-surface rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs space-y-6">
              
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-stone-900">
                  Send Us A Message
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Fill in the details below and our customer representative will respond within 2-4 hours.
                </p>
              </div>

              {isSubmitted && (
                <div className="p-4 bg-leaf-50 border border-leaf-200 rounded-2xl flex items-center gap-3 text-leaf-800 text-xs">
                  <CheckCircle2 className="w-5 h-5 text-leaf-600 shrink-0" />
                  <div>
                    <p className="font-bold">Message Sent Successfully!</p>
                    <p className="text-[11px] text-leaf-700">
                      Thank you for reaching out. We will get back to your WhatsApp or email shortly.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-stone-700 mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-stone-700 mb-1.5">
                      Phone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0300 1234567"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-stone-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@domain.com"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-bold text-stone-700 mb-1.5">
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface"
                    >
                      <option value="Order Inquiry">Order Inquiry / Tracking</option>
                      <option value="Product Authenticity">Honey Purity & Lab Test</option>
                      <option value="Corporate Hampers">Bulk / Wedding Gift Boxes</option>
                      <option value="Payment Verification">Online Payment Verification</option>
                      <option value="Other">Other Query</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-stone-700 mb-1.5">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we assist you with our organic dry fruits or pure honey?"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-primary hover:bg-primary-hover disabled:bg-stone-300 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Inquiry</span>
                    </>
                  )}
                </button>
                <input tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" />
                {submitError && (
                  <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
                    {submitError}
                  </p>
                )}
              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
