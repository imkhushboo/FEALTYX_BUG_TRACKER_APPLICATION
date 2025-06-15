 'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { addTask, editTask, Task } from '@/redux/taskSlice';
import { toast } from 'react-toastify';

interface Props {
  onClose: () => void;
  initialData?: Task;
  role?: 'developer' | 'manager';
}

export default function TaskForm({ onClose, initialData, role = 'developer' }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'open',
    assignee: '',
    createdAt: new Date().toISOString().split('T')[0],
    dueDate: '',
  });

  const [year, setYear] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'title' && value === 'Annual Forecast Revenue') {
      setYear('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (initialData) {
        dispatch(editTask({ ...form, id: initialData.id }));
        toast.success('✅ Task updated successfully!');
      } else {
        dispatch(addTask(form));
        toast.success('✅ Task created successfully!');
      }
      onClose();
    } catch (err) {
      toast.error('❌ Failed to submit task');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-6 rounded-xl shadow border max-w-md w-full mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {initialData ? 'Update Task' : 'Create New Task'}
      </h2>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Title</label>
        <input
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
      </div>

      {form.title === 'Annual Forecast Revenue' && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            placeholder="Enter Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          placeholder="Enter description..."
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="pending approval">Pending Approval</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Assignee</label>
        <input
          name="assignee"
          placeholder="Assignee Name"
          value={form.assignee}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
      </div>

      <div className="flex justify-end space-x-4 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded border text-gray-700 bg-gray-100 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {initialData ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}
