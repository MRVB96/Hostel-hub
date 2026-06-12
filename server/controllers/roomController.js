const Room = require('../models/Room');
const StudentDetails = require('../models/StudentDetails');

// @desc    Get all rooms with occupancy stats
// @route   GET /api/rooms
// @access  Private/Admin
const getRooms = async (req, res) => {
    const rooms = await Room.find({});
    
    // Calculate occupied beds for each room
    const studentsDetails = await StudentDetails.find({});
    
    const roomsWithStats = rooms.map(room => {
        const occupied = studentsDetails.filter(s => s.roomNumber === room.roomNumber).length;
        return {
            ...room._doc,
            occupied,
            available: room.capacity - occupied
        };
    });

    res.json(roomsWithStats);
};

// @desc    Create a room
// @route   POST /api/rooms
// @access  Private/Admin
const createRoom = async (req, res) => {
    const { roomNumber, capacity } = req.body;

    const roomExists = await Room.findOne({ roomNumber });

    if (roomExists) {
        res.status(400);
        throw new Error('Room already exists');
    }

    const room = await Room.create({
        roomNumber,
        capacity,
    });

    res.status(201).json(room);
};

// @desc    Delete a room
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
const deleteRoom = async (req, res) => {
    const room = await Room.findById(req.params.id);

    if (room) {
        // Check if room is occupied
        const studentsInRoom = await StudentDetails.find({ roomNumber: room.roomNumber });
        if (studentsInRoom.length > 0) {
            res.status(400);
            throw new Error('Cannot delete room with assigned students');
        }

        await Room.deleteOne({ _id: room._id });
        res.json({ message: 'Room removed' });
    } else {
        res.status(404);
        throw new Error('Room not found');
    }
};

module.exports = { getRooms, createRoom, deleteRoom };
