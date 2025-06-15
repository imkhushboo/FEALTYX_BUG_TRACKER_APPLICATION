'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useState } from 'react';
import { Task } from '@/redux/taskSlice';
import TaskItem from './taskItem';
import TaskModal from './taskModal';
import TaskForm from './taskForm';


export default function TaskList({ role = 'developer' }: { role?: 'developer' | 'manager' }) {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('all');
  
    const filteredTasks = filterStatus === 'all'
      ? tasks
      : tasks.filter(task => task.status === filterStatus);
  
    const handleEdit = (task: Task) => {
      setEditingTask(task);
      setModalOpen(true);
    };

    
  
    return (
      <div>
        {role === 'developer' && (
          <div>

          <button
            onClick={() => { setModalOpen(true); setEditingTask(null); }}
            className="bg-green-600 text-white px-4 py-2 mb-4 rounded"
          >
            + New Task
          </button>
          </div>
        )}
  
        <div className="mb-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="pending approval">Pending Approval</option>
            <option value="closed">Closed</option>
          </select>
        </div>
  
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={() => handleEdit(task)} role={role} />
          ))}
        </div>
  
        {modalOpen && (
          <TaskModal onClose={() => setModalOpen(false)}>
            <TaskForm 
             onClose={() => setModalOpen(false)}
             initialData={editingTask || undefined}
             role={role}
              />
          </TaskModal>
        )}
      </div>
    );
  }