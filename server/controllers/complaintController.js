const Complaint = require('../models/Complaint');

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Private/Admin
const getComplaints = async (req, res) => {
    const complaints = await Complaint.find({}).populate('student', 'name roomNumber');
    res.json(complaints);
};

// @desc    Get complaints by student
// @route   GET /api/complaints/student/:studentId
// @access  Private
const getComplaintsByStudent = async (req, res) => {
    const complaints = await Complaint.find({ student: req.params.studentId });
    res.json(complaints);
};

// @desc    Create a complaint
// @route   POST /api/complaints
// @access  Private
const createComplaint = async (req, res) => {
    const { title, description, category } = req.body;

    const complaint = new Complaint({
        student: req.user._id, // Assume logged in user creates it
        title,
        description,
        category,
    });

    const createdComplaint = await complaint.save();
    res.status(201).json(createdComplaint);
};

// @desc    Update complaint status
// @route   PUT /api/complaints/:id/status
// @access  Private/Admin
const updateComplaintStatus = async (req, res) => {
    const { status, remarks } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (complaint) {
        complaint.status = status || complaint.status;
        complaint.remarks = remarks || complaint.remarks;

        const updatedComplaint = await complaint.save();
        res.json(updatedComplaint);
    } else {
        res.status(404);
        throw new Error('Complaint not found');
    }
};

module.exports = { getComplaints, getComplaintsByStudent, createComplaint, updateComplaintStatus };
