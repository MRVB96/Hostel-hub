const express = require('express');
const router = express.Router();
const {
    getFees,
    getFeesByStudent,
    createFeeRecord,
    markFeePaid,
} = require('../controllers/feeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getFees).post(protect, admin, createFeeRecord);
router.route('/student/:studentId').get(protect, getFeesByStudent);
router.route('/:id/pay').put(protect, admin, markFeePaid);

module.exports = router;
