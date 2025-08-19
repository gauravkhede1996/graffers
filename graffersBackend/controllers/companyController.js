
const Company = require('../models/company')
const path = require('path');
const fs = require('fs');


module.exports.logo = async (req,res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname,"../", "uploads", "logos", filename);
  console.log(filePath," is the filePath ****")
  // check if file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "Logo not found" });
  }
}

module.exports.createCompany = async (req,res) => {
    try {
    const { name, location, foundedOn, city, description } = req.body;
    // As of now I am just focusing on creating company due to time contraints but various checks can be added
    // like if we don't want 2 companies with the same name and location then we can handle those cases.
    const newCompany = new Company({
      name,
      location,
      foundedOn,
      city,
      description,
      logo: req.file ? `/uploads/logos/${req.file.filename}` : null,
      reviews: [] 
    });

    await newCompany.save();
    res.status(201).json({ message: 'Company created successfully', company: newCompany, status: 201 });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports.getAllCompanies = async (req,res) => {
     try {
    let { city, name, sortBy, sortOrder } = req.body;

    const filter = {};

    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    let sortOptions = {};
    if (sortBy) {
      const order = sortOrder === 'desc' ? -1 : 1; 
      if (['name', 'averageRating', 'location'].includes(sortBy)) {
        sortOptions[sortBy] = order;
      }
    }

    const companies = await Company.find(filter)
      .populate('reviews')
      .sort(sortOptions);

    res.status(200).json({
      total: companies.length,
      companies,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports.getCompanyDetails = async (req,res) => {
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId).populate("reviews");

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (err) {
    console.error("Error fetching company details:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}