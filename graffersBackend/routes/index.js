const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const companyController = require('../controllers/companyController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/logos/'); // Folder where logos are stored
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

router.post('/createCompany',upload.single('logo'), companyController.createCompany);
router.post('/getAllCompanies', companyController.getAllCompanies);
router.get('/uploads/logos/:filename', companyController.logo);
router.get(`/getCompanyDetails/:companyId`, companyController.getCompanyDetails);

module.exports = router;