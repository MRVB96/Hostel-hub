import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Users, AlertTriangle, IndianRupee, BedDouble } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    complaints: 0,
    unpaidFees: 0,
    totalRooms: 0,
    totalBeds: 0,
    occupiedBeds: 0,
    unoccupiedBeds: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, complaintsRes, feesRes, roomsRes] = await Promise.all([
          api.get('/students'),
          api.get('/complaints'),
          api.get('/fees'),
          api.get('/rooms'),
        ]);

        const pendingComplaints = complaintsRes.data.filter(c => c.status !== 'resolved');
        const unpaid = feesRes.data.filter(f => f.status === 'unpaid');
        const rooms = roomsRes.data;

        let totalBeds = 0;
        let occupiedBeds = 0;
        
        rooms.forEach(room => {
          totalBeds += room.capacity;
          occupiedBeds += room.occupied;
        });

        setStats({
          students: studentsRes.data.length,
          complaints: pendingComplaints.length,
          unpaidFees: unpaid.reduce((sum, f) => sum + f.amount, 0),
          totalRooms: rooms.length,
          totalBeds,
          occupiedBeds,
          unoccupiedBeds: totalBeds - occupiedBeds,
        });
      } catch (error) {
        console.error('Error fetching stats', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
      </div>

      {/* Primary Stats: Capacity */}
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Capacity & Occupancy</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Rooms */}
        <div className="bg-white overflow-hidden shadow-sm shadow-indigo-100 rounded-2xl border border-gray-100 transition-all hover:shadow-md p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Total Rooms</dt>
          <dd className="mt-2 text-3xl font-semibold text-gray-900">{stats.totalRooms}</dd>
        </div>
        {/* Total Beds */}
        <div className="bg-white overflow-hidden shadow-sm shadow-indigo-100 rounded-2xl border border-gray-100 transition-all hover:shadow-md p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Total Beds</dt>
          <dd className="mt-2 text-3xl font-semibold text-gray-900">{stats.totalBeds}</dd>
        </div>
        {/* Occupied Beds */}
        <div className="bg-white overflow-hidden shadow-sm shadow-indigo-100 rounded-2xl border border-gray-100 transition-all hover:shadow-md p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Occupied Beds</dt>
          <dd className="mt-2 text-3xl font-semibold text-indigo-600">{stats.occupiedBeds}</dd>
        </div>
        {/* Unoccupied Beds */}
        <div className="bg-white overflow-hidden shadow-sm shadow-indigo-100 rounded-2xl border border-gray-100 transition-all hover:shadow-md p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">Unoccupied Beds</dt>
          <dd className="mt-2 text-3xl font-semibold text-green-600">{stats.unoccupiedBeds}</dd>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4 mt-8">Operations Overview</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Students Card */}
        <div className="bg-white overflow-hidden shadow-sm shadow-indigo-100 rounded-2xl border border-gray-100 transition-all hover:shadow-md">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-50 rounded-xl p-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Registered Students</dt>
                  <dd className="text-3xl font-semibold text-gray-900">{stats.students}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-3">
            <div className="text-sm">
              <Link to="/admin/students" className="font-medium text-blue-600 hover:text-blue-500">
                View all <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Complaints Card */}
        <div className="bg-white overflow-hidden shadow-sm shadow-indigo-100 rounded-2xl border border-gray-100 transition-all hover:shadow-md">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-orange-50 rounded-xl p-4">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Complaints</dt>
                  <dd className="text-3xl font-semibold text-gray-900">{stats.complaints}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-3">
            <div className="text-sm">
              <Link to="/admin/complaints" className="font-medium text-orange-600 hover:text-orange-500">
                Review complaints <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Fees Card */}
        <div className="bg-white overflow-hidden shadow-sm shadow-indigo-100 rounded-2xl border border-gray-100 transition-all hover:shadow-md">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-50 rounded-xl p-4">
                <IndianRupee className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Fees</dt>
                  <dd className="text-3xl font-semibold text-gray-900">₹{stats.unpaidFees.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-3">
            <div className="text-sm">
              <Link to="/admin/fees" className="font-medium text-green-600 hover:text-green-500">
                Collect fees <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
