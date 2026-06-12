import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserCircle } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Student Profile</h1>

      <div className="bg-white shadow-sm shadow-indigo-100 rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-8 sm:flex sm:items-center sm:justify-between border-b border-gray-100 bg-indigo-50/50">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <UserCircle className="mx-auto h-20 w-20 text-indigo-400" />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user.name}</p>
              <p className="text-sm font-medium text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>
        
        <div className="px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 uppercase">{user.role}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-green-600 font-semibold sm:mt-0 sm:col-span-2">Active</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Hostel ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user._id}</dd>
            </div>
            {/* Note: In a complete implementation, we would fetch and display detailed student info here from /api/students/:id */}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
