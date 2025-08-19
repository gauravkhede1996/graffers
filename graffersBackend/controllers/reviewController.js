const Company = require('../models/company');
const Review = require('../models/Review');
module.exports.addReview = async (req,res) => {
     try {
    const { userId, companyId, subject, reviewText, rating } = req.body;

    // 1. Validate input
    if (!userId || !companyId || !subject || !reviewText || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if company exists
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // 3. Create review
    const review = new Review({
      user: userId,
      company: companyId,
      subject,
      reviewText,
      rating,
    });
    await review.save();

    // 4. Add review to company and update average rating
    company.reviews.push(review._id);

    const reviews = await Review.find({ company: companyId });
    const avgRating =
      reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

    company.averageRating = avgRating.toFixed(1); // 1 decimal place
    await company.save();

    res.status(201).json({
      message: "Review added successfully",
      review,
      averageRating: company.averageRating,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}