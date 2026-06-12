const User = require('../models/User');
const StudentDetails = require('../models/StudentDetails');

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Admin
const getStudents = async (req, res) => {
    const students = await User.find({ role: 'student' }).select('-password');
    const studentIds = students.map((s) => s._id);
    
    const details = await StudentDetails.find({ user: { $in: studentIds } });
    
    // Merge user info and details
    const mergedData = students.map((student) => {
        const detail = details.find((d) => d.user.toString() === student._id.toString());
        return {
            ...student._doc,
            details: detail || null,
        };
    });

    res.json(mergedData);
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private
const getStudentById = async (req, res) => {
    const student = await User.findById(req.params.id).select('-password');
    if (student) {
        const details = await StudentDetails.findOne({ user: student._id });
        res.json({ ...student._doc, details });
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
};

// @desc    Create/Update student details
// @route   POST /api/students/:id/details
// @access  Private/Admin
const updateStudentDetails = async (req, res) => {
    const { roomNumber, course, contactNumber, guardianName, guardianContact, address } = req.body;

    let details = await StudentDetails.findOne({ user: req.params.id });

    if (details) {
        details.roomNumber = roomNumber || details.roomNumber;
        details.course = course || details.course;
        details.contactNumber = contactNumber || details.contactNumber;
        details.guardianName = guardianName || details.guardianName;
        details.guardianContact = guardianContact || details.guardianContact;
        details.address = address || details.address;

        const updatedDetails = await details.save();
        res.json(updatedDetails);
    } else {
        details = await StudentDetails.create({
            user: req.params.id,
            roomNumber,
            course,
            contactNumber,
            guardianName,
            guardianContact,
            address,
        });
        res.status(201).json(details);
    }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Admin
const deleteStudent = async (req, res) => {
    const student = await User.findById(req.params.id);

    if (student) {
        await StudentDetails.deleteOne({ user: student._id });
        await User.deleteOne({ _id: student._id });
        res.json({ message: 'Student removed' });
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
};

module.exports = { getStudents, getStudentById, updateStudentDetails, deleteStudent };
