const FeeRecord = require('../models/FeeRecord');

// @desc    Get all fee records
// @route   GET /api/fees
// @access  Private/Admin
const getFees = async (req, res) => {
    const fees = await FeeRecord.find({}).populate('student', 'name email');
    res.json(fees);
};

// @desc    Get fee records by student
// @route   GET /api/fees/student/:studentId
// @access  Private
const getFeesByStudent = async (req, res) => {
    const fees = await FeeRecord.find({ student: req.params.studentId }).populate('student', 'name email');
    res.json(fees);
};

// @desc    Create a fee record
// @route   POST /api/fees
// @access  Private/Admin
const createFeeRecord = async (req, res) => {
    const { studentId, month, year, amount, dueDate } = req.body;

    const fee = new FeeRecord({
        student: studentId,
        month,
        year,
        amount,
        dueDate,
    });

    const createdFee = await fee.save();
    res.status(201).json(createdFee);
};

// @desc    Mark fee as paid
// @route   PUT /api/fees/:id/pay
// @access  Private/Admin
const markFeePaid = async (req, res) => {
    const fee = await FeeRecord.findById(req.params.id);

    if (fee) {
        fee.status = 'paid';
        fee.paymentDate = Date.now();
        fee.receiptId = `REC-${Math.floor(Math.random() * 1000000)}`;

        const updatedFee = await fee.save();
        res.json(updatedFee);
    } else {
        res.status(404);
        throw new Error('Fee record not found');
    }
};

module.exports = { getFees, getFeesByStudent, createFeeRecord, markFeePaid };
