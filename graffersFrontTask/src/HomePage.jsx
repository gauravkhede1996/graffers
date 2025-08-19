import React, { useState } from "react";
import { MapPin, X } from "lucide-react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { HomePageController } from "./HomePageController";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        if (star <= Math.floor(rating)) {
          // full star
          return (
            <span key={star} className="text-lg text-yellow-400">
              ★
            </span>
          );
        } else if (star === Math.ceil(rating) && rating % 1 !== 0) {
          // half star
          return (
            <span key={star} className="text-lg text-yellow-400 relative">
              <span className="absolute left-0 overflow-hidden w-1/2">
                ★
              </span>
              <span className="text-gray-300">★</span>
            </span>
          );
        } else {
          // empty star
          return (
            <span key={star} className="text-lg text-gray-300">
              ★
            </span>
          );
        }
      })}
    </div>
  );
}


export default function HomePage() {
  const { companies, fetchCompanies} = HomePageController();
console.log(companies,"companies")
  const [sortBy, setSortBy] = useState("name");
  const [city, setCity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    founded: "",
    city: "",
  });
  const handleFindCompany = () => {
    fetchCompanies(city); 
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Company Data:", formData);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Header />

      {/* Search Section */}
      <div className="bg-white py-8 mt-10">
        <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-14">
          <div className="flex items-center gap-9 flex-wrap">
            {/* City Select */}
            <div className="w-[480px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select City</label>
              <div className="relative">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="pl-4 pr-10 border rounded w-full h-9 border-gray-300"/>
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600 w-4 h-4" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-6">
              <button  onClick={handleFindCompany}  className="bg-gradient-to-r from-[#D100F3] to-[#002BC5] hover:bg-purple-700 text-white px-5 py-2 rounded">
                Find Company
              </button>
              <button
                className="bg-gradient-to-r from-[#D100F3] to-[#002BC5] hover:bg-purple-700 text-white px-5 py-2 rounded ml-20"
                onClick={() => setIsModalOpen(true)}
              >
                + Add Company
              </button>
            </div>

            {/* Sort */}
            <div className="ml-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort:</label>
              <select
                className="pl-4 pr-10 border rounded w-full h-9 border-gray-300"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="rating">Rating</option>
                <option value="reviews">Reviews</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-8 mt-10">
        <p className="text-gray-600 mb-6">Result Found: {companies.length}</p>
        <div className="space-y-6">
          {companies.map((company) => (
            <div key={company.id} className="bg-white rounded p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`w-23 h-23 ${company.logoColor} rounded-lg flex items-center justify-center text-white font-bold text-xl`}
                >
                  <img src={`http://localhost:8000${company.logo}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{company.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {company.location}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-md font-semibold">{company.averageRating}</span>
                          <StarRating rating={company.averageRating} />
                          {company.reviews.length > 0 && (
                            <span className="text-md font-semibold">{company.reviews.length} Reviews</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-sm mb-4">
                        Founded on{" "}
                        {new Date(company.foundedOn).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>

                      <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded">
                       <Link to={`/company-detail/${company._id}`} className="text-white">Detail Review</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-black hover:text-gray-700"
            >
              <X size={20} />
            </button>

            {/* Modal Title */}
            <h2 className="text-xl font-semibold mb-6 text-center">Add Company</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium text-gray-500 mb-1">Company Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter..."
                  className="border rounded w-full px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-500 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border rounded w-full px-3 py-2"
                  placeholder="Location"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-500 mb-1">Founded on</label>
                <input
                  type="date"
                  name="founded"
                  value={formData.founded}
                  onChange={handleChange}
                  className="border rounded w-full px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-500 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border rounded w-full px-3 py-2"
                  placeholder="City"
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#D100F3] to-[#002BC5] text-white px-8 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
