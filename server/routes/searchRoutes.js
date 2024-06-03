const express = require('express');
const SearchController = require('../controllers/searchController');

const router = express.Router();

router.get('/business', SearchController.searchBusiness);
router.get('/filter', SearchController.getFilter);




module.exports = router;