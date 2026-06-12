import { useState, useEffect } from 'react';
import api from '../services/api';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await api.get('/complaints');
        setComplaints(data);
      } catch (error) {
        console.error('Error fetching complaints', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const { data } = await api.put(`/complaints/${id}/status`, { status: newStatus });
      setComplaints(complaints.map(c => c._id === id ? data : c));
    } catch (error) {
      console.error('Error updating complaint', error);
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
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Complaint Management</h1>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading complaints...</div>
        ) : complaints.length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-white rounded-xl shadow-sm border border-gray-100">No complaints found.</div>
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
                  <div className="mt-4 text-sm text-gray-500 flex items-center space-x-4">
                    <span>Reported by: <span className="font-medium text-gray-900">{complaint.student?.name || 'Unknown'}</span></span>
                    <span>Date: {new Date(complaint.createdAt).toLocaleDateString()}</span>
                  </div>
                  {complaint.remarks && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700">
                      <strong>Admin Remarks:</strong> {complaint.remarks}
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  {complaint.status !== 'resolved' && (
                    <>
                      {complaint.status === 'pending' && (
                        <button 
                          onClick={() => updateStatus(complaint._id, 'in-progress')}
                          className="px-4 py-2 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 rounded-lg text-sm font-medium transition-colors border border-yellow-200"
                        >
                          Mark In Progress
                        </button>
                      )}
                      <button 
                        onClick={() => updateStatus(complaint._id, 'resolved')}
                        className="px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium transition-colors border border-green-200"
                      >
                        Mark Resolved
                      </button>
                    </>
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

export default AdminComplaints;
