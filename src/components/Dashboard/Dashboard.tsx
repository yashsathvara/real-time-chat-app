import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { CheckSquare, MessageSquare, User } from 'lucide-react';

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
              <h2 className="text-2xl font-semibold mb-4">Welcome, {user?.username}!</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/tasks" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CheckSquare className="w-8 h-8 text-indigo-600 mb-2" />
                  <h3 className="text-lg font-semibold">Tasks</h3>
                  <p className="text-gray-600">Manage your tasks and projects</p>
                </Link>
                <Link to="/chat" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <MessageSquare className="w-8 h-8 text-green-600 mb-2" />
                  <h3 className="text-lg font-semibold">Chat</h3>
                  <p className="text-gray-600">Communicate with your team</p>
                </Link>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <User className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="text-lg font-semibold">Profile</h3>
                  <p className="text-gray-600">View and edit your profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;