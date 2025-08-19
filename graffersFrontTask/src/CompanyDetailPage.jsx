import { MapPin, Calendar } from "lucide-react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//  Star Rating Component
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${
            star <= Math.floor(rating)
              ? "text-yellow-400"
              : star - 0.5 <= rating
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// 📄 Main Component
export default function CompanyDetailPage() {
   const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
     useEffect(() => {
    async function fetchCompanyData() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/getCompanyDetails/${companyId}`,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(reviews," is the response")
        setCompany(response.data.company);
        setReviews(response.data.company.reviews || []);
        console.log(company," is the company")
      } catch (error) {
        console.error("Error fetching company details:", error);
      } finally {
        setLoading(false);
      }
    }

    if (companyId) {
      fetchCompanyData();
    }
  }, []);
  if (loading) return <p className="p-8">Loading...</p>;
  if (!company) return <p className="p-8">Company not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <Header />

      <div className="bg-white py-8 mt-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            
            <div
              className={`w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold text-2xl`}
            >
              <img src={`http://localhost:8000${company.logo}`} />
            </div>

            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {company.name}
                  </h1>
                  <p className="text-gray-600 mb-4 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {company.location}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">
                        {company.averageRating}
                      </span>
                      <StarRating rating={company.averageRating} />
                      <span className="text-gray-600">
                        {company.reviews.length} Reviews
                      </span>
                    </div>
                  </div>
                </div>

                
                <div className="text-right">
                  <p className="text-gray-500 text-sm mb-4">
                    Founded on {new Date(company.foundedOn).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                  </p>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
                    + Add Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 

      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-600 mb-6">
          Result Found: {reviews.length}
        </p>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border rounded p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <img
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.author || 'Jorgue Watson'}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {review.author || 'Jorgue Watson'}
                      </h3>
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(review.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {review.reviewText}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> 
    </div>
  );
}