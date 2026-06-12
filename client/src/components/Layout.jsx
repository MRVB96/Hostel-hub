import { useContext } from 'react';
import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Home, Users, CreditCard, MessageSquare, LogOut, Menu, Building } from 'lucide-react';
import Logo from './Logo';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = user.role === 'admin' 
    ? [
        { name: 'Dashboard', path: '/admin', icon: Home },
        { name: 'Rooms', path: '/admin/rooms', icon: Building },
        { name: 'Students', path: '/admin/students', icon: Users },
        { name: 'Fees', path: '/admin/fees', icon: CreditCard },
        { name: 'Complaints', path: '/admin/complaints', icon: MessageSquare },
      ]
    : [
        { name: 'Dashboard', path: '/student', icon: Home },
        { name: 'My Fees', path: '/student/fees', icon: CreditCard },
        { name: 'My Complaints', path: '/student/complaints', icon: MessageSquare },
      ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center flex-shrink-0">
            <Logo className="h-10 w-10" />
            <span className="ml-3 text-xl font-bold text-indigo-600 tracking-wider">Hostel Hub</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{user.role === 'admin' ? 'Administrator' : 'Student Portal'}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center space-x-3 text-gray-700 p-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center space-x-2 text-red-600 hover:text-red-700 w-full p-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 p-4 md:hidden flex justify-between items-center">
          <div className="flex items-center">
            <Logo className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-bold text-indigo-600">Hostel Hub</h2>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
