import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const StudentComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(AuthContext);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('maintenance');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await api.get(`/complaints/student/${user._id}`);
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints', error);
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) fetchComplaints();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/complaints', { title, description, category });
      setComplaints([...complaints, data]);
      setShowForm(false);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting complaint', error);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Complaints</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow text-sm font-medium transition-colors"
        >
          {showForm ? 'Cancel' : '+ New Complaint'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">Submit a Complaint</h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="maintenance">Maintenance</option>
                <option value="food">Food</option>
                <option value="room">Room</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input 
                type="text" 
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Fan not working"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea 
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide details..."
              />
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Submit
            </button>
          </form>
        </div>
      )}

      <div className="grid gap-6">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading complaints...</div>
        ) : complaints.length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-white rounded-xl shadow-sm border border-gray-100">You haven't submitted any complaints.</div>
        ) : (
          complaints.map((complaint) => (
            <div key={complaint._id} className="bg-white shadow-sm shadow-indigo-100 rounded-2xl border border-gray-100 p-6 transition-all hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-bold text-gray-900">{complaint.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                      {complaint.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 uppercase tracking-wider">
                      {complaint.category}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{complaint.description}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    <span>Date: {new Date(complaint.createdAt).toLocaleDateString()}</span>
                  </div>
                  {complaint.remarks && (
                    <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100 text-sm text-gray-800">
                      <strong>Admin Remarks:</strong> {complaint.remarks}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentComplaints;
