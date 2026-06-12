require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const StudentDetails = require('./models/StudentDetails');
const FeeRecord = require('./models/FeeRecord');
const Complaint = require('./models/Complaint');
const Room = require('./models/Room');
const connectDB = require('./config/db');

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await StudentDetails.deleteMany();
        await FeeRecord.deleteMany();
        await Complaint.deleteMany();
        await Room.deleteMany();

        // 0. Create Rooms
        await Room.insertMany([
            { roomNumber: '101A', capacity: 2 },
            { roomNumber: '102B', capacity: 3 },
            { roomNumber: '103C', capacity: 2 },
        ]);

        // 1. Create Admin
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123', // Will be hashed by pre-save
            role: 'admin',
        });

        // 2. Create Students
        const students = await User.insertMany([
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: await bcrypt.hash('password123', 10), // InsertMany doesn't trigger pre-save reliably in all mongoose versions, hash manually
                role: 'student',
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: await bcrypt.hash('password123', 10),
                role: 'student',
            },
        ]);

        // 3. Create Student Details
        const student1 = students[0]._id;
        const student2 = students[1]._id;

        await StudentDetails.insertMany([
            {
                user: student1,
                roomNumber: '101A',
                course: 'Computer Science',
                contactNumber: '1234567890',
                guardianName: 'Bob Doe',
                guardianContact: '0987654321',
                address: '123 Main St, City',
            },
            {
                user: student2,
                roomNumber: '102B',
                course: 'Mechanical Eng.',
                contactNumber: '2234567890',
                guardianName: 'Tom Smith',
                guardianContact: '0987654322',
                address: '456 Oak St, City',
            },
        ]);

        // 4. Create Fee Records
        await FeeRecord.insertMany([
            {
                student: student1,
                month: 'January',
                year: 2026,
                amount: 5000,
                status: 'unpaid',
                dueDate: new Date('2026-01-15'),
            },
            {
                student: student2,
                month: 'January',
                year: 2026,
                amount: 5000,
                status: 'paid',
                dueDate: new Date('2026-01-15'),
                paymentDate: new Date('2026-01-10'),
                receiptId: 'REC-123456',
            },
        ]);

        // 5. Create Complaints
        await Complaint.insertMany([
            {
                student: student1,
                title: 'Fan not working',
                description: 'The ceiling fan in room 101A is making noise and not spinning properly.',
                category: 'maintenance',
                status: 'pending',
            },
            {
                student: student2,
                title: 'Food quality',
                description: 'Yesterday dinner was very spicy.',
                category: 'food',
                status: 'resolved',
                remarks: 'Informed the mess contractor to reduce spice level.',
            },
        ]);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
