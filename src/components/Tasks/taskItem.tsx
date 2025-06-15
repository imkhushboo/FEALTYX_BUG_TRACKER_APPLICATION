'use client';


 import { RootState } from '@/redux/store';
import { Task, deleteTask, editTask } from '@/redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import TaskTimeLogger from './TaskTimeLogger';
import { toast } from 'react-toastify'; // Using react-toastify as per your code

interface Props {
  task: Task;
  onEdit: () => void;
  role?: 'developer' | 'manager';
}

export default function TaskItem({ task, onEdit, role = 'developer' }: Props) {
  const dispatch = useDispatch();
  const timeLogs = useSelector((state: RootState) => state.time.logs);

  const totalTime = timeLogs
    .filter((log) => log.taskId === task.id)
    .reduce((sum, log) => sum + log.timeSpent, 0);

  const handleApprove = () => {
    dispatch(editTask({ ...task, status: 'closed' }));
    toast.success('✅ Task approved!');
  };

  const handleReject = () => {
    dispatch(editTask({ ...task, status: 'open' }));
    toast.info('❌ Task rejected and set back to Open.');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
      toast.success('🗑️ Task deleted.');
    }
  };

  const handleMarkPending = () => {
    dispatch(editTask({ ...task, status: 'pending approval' }));
    toast.info('🔁 Task marked as Pending Approval.');
  };

  return (
    <div className="border p-4 rounded-xl shadow bg-white flex justify-between items-start space-x-4">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-700">{task.description}</p>

        <div className="text-xs text-gray-500 mt-1 space-y-1">
          <p>
            <strong>Priority:</strong> {task.priority}
          </p>
          <p>
            <strong>Status:</strong> {task.status}
          </p>
          <p>
            <strong>Total Time Spent:</strong> {totalTime} mins
          </p>
        </div>

        {/* Developer-only time logger */}
        {role === 'developer' && task.status !== 'closed' && (
          <div className="mt-2">
            <TaskTimeLogger taskId={task.id} />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 items-end">
        {role === 'developer' && task.status !== 'closed' && (
          <>
            <button
              onClick={onEdit}
              className="text-sm text-blue-600 hover:underline"
              aria-label="Edit Task"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-sm text-red-600 hover:underline"
              aria-label="Delete Task"
            >
              🗑️ Delete
            </button>
            {task.status === 'open' && (
              <button
                onClick={handleMarkPending}
                className="text-sm text-yellow-600 hover:underline"
                aria-label="Mark as Pending Approval"
              >
                ⏳ Mark Pending
              </button>
            )}
          </>
        )}

        {role === 'manager' && task.status === 'pending approval' && (
          <>
            <button
              onClick={handleApprove}
              className="text-sm text-green-600 hover:underline"
              aria-label="Approve Task"
            >
              ✅ Approve
            </button>
            <button
              onClick={handleReject}
              className="text-sm text-red-600 hover:underline"
              aria-label="Reject Task"
            >
              ❌ Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
}
