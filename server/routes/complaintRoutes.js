const express = require('express');
const router = express.Router();
const {
    getComplaints,
    getComplaintsByStudent,
    createComplaint,
    updateComplaintStatus,
} = require('../controllers/complaintController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getComplaints).post(protect, createComplaint);
router.route('/student/:studentId').get(protect, getComplaintsByStudent);
router.route('/:id/status').put(protect, admin, updateComplaintStatus);

module.exports = router;
