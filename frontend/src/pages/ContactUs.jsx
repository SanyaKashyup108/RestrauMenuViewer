import React, { useState } from 'react';
import Footer from '../components/footer/Footer';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out!');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-[#222]">
      {/* Heading Section */}
      <div className="flex flex-col items-center py-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48">
        <h2 className="text-4xl font-semibold text-[#0D1321] mb-4 text-center">
          Get in Touch
        </h2>
        <p className="text-lg text-[#555] mb-10 max-w-2xl text-center">
          Have a question, feedback, or just want to say hello? Fill out the form below
          and we’ll get back to you as soon as we can.
        </p>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white p-8 md:p-10 rounded-3xl border border-[#eee] shadow-md space-y-6"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#0D1321] mb-1">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Jane Doe"
              className="w-full p-3 rounded-lg bg-white text-[#111] border border-[#ccc] focus:ring-2 focus:ring-[#0D1321] focus:outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#0D1321] mb-1">
              Your Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="jane@example.com"
              className="w-full p-3 rounded-lg bg-white text-[#111] border border-[#ccc] focus:ring-2 focus:ring-[#0D1321] focus:outline-none transition"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#0D1321] mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Type your message here..."
              className="w-full p-3 rounded-lg bg-white text-[#111] border border-[#ccc] resize-none focus:ring-2 focus:ring-[#0D1321] focus:outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#0D1321] hover:bg-[#1a2233] text-white text-base font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <span role="img" aria-label="Mail">📨</span> Send Message
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
