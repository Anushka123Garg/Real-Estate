// src/pages/AboutContent.jsx
import React from "react";
import { FaBullseye, FaLightbulb, FaHandshake, FaUsers } from "react-icons/fa"; // Import some icons

export function AboutContent() {
  return (
    <div className="py-1 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            About <span className="text-blue-600">SmartEstate</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Your trusted partner in finding the perfect property.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-10">
          <div className="px-6 py-8 sm:px-10">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              Our Story
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              SmartEstate was born from a vision to simplify and enhance the
              real estate journey. Frustrated by outdated processes and a lack
              of transparency, our founders, a team of experienced real estate
              professionals and technology innovators based right here in
              Bhopal, Madhya Pradesh, India, set out to create a platform that
              puts you, the user, first.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe that finding your ideal property should be an exciting
              and stress-free experience. That's why we've combined cutting-edge
              technology with deep local market expertise to provide you with
              unparalleled access to listings, insightful information, and the
              support you need every step of the way.
            </p>
          </div>
          <div className="bg-gray-100 px-6 py-4 sm:px-10">
            <p className="text-sm text-gray-500 italic">
              "Empowering your property dreams with smart solutions."
            </p>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="flex items-center justify-center text-blue-600 text-3xl mb-4">
              <FaBullseye />
            </div>
            <h4 className="text-lg font-semibold text-slate-800 mb-2">
              Our Mission
            </h4>
            <p className="text-gray-600 leading-relaxed text-sm">
              To provide a seamless, transparent, and personalized real estate experience.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="flex items-center justify-center text-green-600 text-3xl mb-4">
              <FaLightbulb />
            </div>
            <h4 className="text-lg font-semibold text-slate-800 mb-2">
              Innovation
            </h4>
            <p className="text-gray-600 leading-relaxed text-sm">
              Leveraging technology to offer cutting-edge tools and insights.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="flex items-center justify-center text-yellow-600 text-3xl mb-4">
              <FaHandshake />
            </div>
            <h4 className="text-lg font-semibold text-slate-800 mb-2">
              Integrity
            </h4>
            <p className="text-gray-600 leading-relaxed text-sm">
              Guiding you with honesty, trust, and unwavering ethical standards.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="flex items-center justify-center text-purple-600 text-3xl mb-4">
              <FaUsers />
            </div>
            <h4 className="text-lg font-semibold text-slate-800 mb-2">
              Customer Focus
            </h4>
            <p className="text-gray-600 leading-relaxed text-sm">
              Your needs and aspirations are at the heart of everything we do.
            </p>
          </div>
        </div>

        {/* Our Team (Optional - you can expand on this) */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-10">
          <div className="px-6 py-8 sm:px-10">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              Meet Our Team
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Behind SmartEstate is a dedicated team of professionals passionate
              about real estate and technology. Based in Bhopal, we bring
              together years of experience in the local market and a commitment
              to innovation to serve you better.
            </p>
            {/* You could add individual team member profiles here in a grid or list */}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-8">
          <p className="mt-4 text-lg text-gray-600 leading-relaxed mb-6">
            Ready to find your dream property?
          </p>
          <a
            href="/listings" // Replace with your actual listings page link
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Explore Listings
          </a>
        </div>
      </div>
    </div>
  );
}
