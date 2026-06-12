const mongoose = require('mongoose');

const studentDetailsSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        roomNumber: {
            type: String,
            required: true,
        },
        course: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        guardianName: {
            type: String,
            required: true,
        },
        guardianContact: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const StudentDetails = mongoose.model('StudentDetails', studentDetailsSchema);

module.exports = StudentDetails;
