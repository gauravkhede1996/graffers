const mongoose = require('mongoose');
const Review = require('./reviewSchema');
const { Schema } = mongoose;
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    foundedOn: {
      type: Date,
    },
    city: {
      type: String,
      trim: true,
    },
    logo: {
      type: String, 
    },
    description: {
      type: String,
    },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Company = mongoose.model("Company", companySchema);
module.exports = Company; 