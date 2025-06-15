'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/redux/authSlice';
import DeveloperView from '@/components/Dashboard/DeveloperView';
import ManagerView from '@/components/Dashboard/ManagerView';
import { toast } from 'react-toastify';

export default function DashboardPage() {
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
          >
            Logout
          </button>
        </div>

        {role === 'developer' && <DeveloperView />}
        {role === 'manager' && <ManagerView />}
      </div>
    </main>
  );
}
