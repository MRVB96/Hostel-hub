const express = require('express');
const router = express.Router();
const {
    getStudents,
    getStudentById,
    updateStudentDetails,
    deleteStudent,
} = require('../controllers/studentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getStudents);
router
    .route('/:id')
    .get(protect, getStudentById)
    .delete(protect, admin, deleteStudent);
router.route('/:id/details').post(protect, admin, updateStudentDetails);

module.exports = router;
