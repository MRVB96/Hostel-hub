const mongoose = require('mongoose');

const feeRecordSchema = mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        month: {
            type: String, // e.g., 'January', 'February'
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['paid', 'unpaid'],
            default: 'unpaid',
        },
        dueDate: {
            type: Date,
            required: true,
        },
        paymentDate: {
            type: Date,
        },
        receiptId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const FeeRecord = mongoose.model('FeeRecord', feeRecordSchema);

module.exports = FeeRecord;
