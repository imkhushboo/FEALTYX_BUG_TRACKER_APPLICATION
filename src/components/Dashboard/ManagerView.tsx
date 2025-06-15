'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import TaskList from '@/components/Tasks/taskList';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function ManagerView() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const timeLogs = useSelector((state: RootState) => state.time.logs);

  const openTasks = tasks.filter((task) => task.status !== 'closed');
  const closedTasks = tasks.filter((task) => task.status === 'closed');

  const createdTrend = tasks.reduce((acc, task) => {
    const date = task.createdAt.split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const updatedTrend = tasks.reduce((acc, task) => {
    const date = (task.lastUpdatedAt || task.createdAt).split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const allDates = Array.from(new Set([...Object.keys(createdTrend), ...Object.keys(updatedTrend)])).sort();

  const createdData = {
    labels: allDates,
    datasets: [
      {
        label: 'Tasks Created',
        data: allDates.map((d) => createdTrend[d] || 0),
        borderColor: 'rgb(59,130,246)',
        backgroundColor: 'rgba(59,130,246,0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const updatedData = {
    labels: allDates,
    datasets: [
      {
        label: 'Tasks Worked On',
        data: allDates.map((d) => updatedTrend[d] || 0),
        borderColor: 'rgb(34,197,94)',
        backgroundColor: 'rgba(34,197,94,0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const timeSummary = tasks.map((task) => {
    const total = timeLogs
      .filter((log) => log.taskId === task.id)
      .reduce((sum, log) => sum + log.timeSpent, 0);
    return { title: task.title, total };
  });

  return (
    <section className="space-y-10">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Manager Dashboard</h2>
        <p className="text-gray-600">
          <span className="font-medium text-blue-600">Open:</span> {openTasks.length} &nbsp;|&nbsp;
          <span className="font-medium text-green-600">Closed:</span> {closedTasks.length}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">All Tasks</h3>
        <TaskList role="manager" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Time Logs Summary</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {timeSummary.map((t) => (
            <li key={t.title}>
              <span className="font-medium">{t.title}</span>: {t.total} mins
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tasks Created Trend</h3>
        <div className="overflow-x-auto">
          <Line data={createdData} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tasks Worked On Trend</h3>
        <div className="overflow-x-auto">
          <Line data={updatedData} />
        </div>
      </div>
    </section>
  );
}
