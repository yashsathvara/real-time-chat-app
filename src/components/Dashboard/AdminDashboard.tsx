import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { Users, BarChart2, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user?.role !== 'admin') {
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
              <h2 className="text-2xl font-semibold mb-4">Welcome, Admin {user.username}!</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/admin/users" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <Users className="w-8 h-8 text-indigo-600 mb-2" />
                  <h3 className="text-lg font-semibold">User Management</h3>
                  <p className="text-gray-600">Manage users and permissions</p>
                </Link>
                <Link to="/admin/analytics" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <BarChart2 className="w-8 h-8 text-green-600 mb-2" />
                  <h3 className="text-lg font-semibold">Analytics</h3>
                  <p className="text-gray-600">View system analytics and reports</p>
                </Link>
                <Link to="/admin/settings" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <Settings className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="text-lg font-semibold">System Settings</h3>
                  <p className="text-gray-600">Configure system settings</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;