import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { ToastContainer, toast } from 'react-toastify';

type TaskStatus = 'open' | 'in progress' | 'closed' | 'pending approval';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignee: string; // username
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  dueDate: string;
  lastUpdatedAt?: string; // Optional field for last updated timestamp
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [
    {
      id: '1',
      title: 'Task Edit Permission Bug',
      description: 'can edit tasks assigned to other developers, even though permissions should restrict it',
      status: 'open',
      assignee: 'khushboo',
      priority: 'high',
      createdAt: '2025-06-12',
      dueDate: '2025-06-20'
    },
    {
      id: '2',
      title: 'Add Dark Mode Support',
      description: 'Add Dark Mode Support',
      status: 'in progress',
      assignee: 'khushboo',
      priority: 'medium',
      createdAt: '2025-06-10',
      dueDate: '2025-06-26'
    },
    {
      id: '3',
      title: 'Notifications Not Sent on Task Reassignment',
      description: 'Notifications Not Sent on Task Reassignment',
      status: 'open',
      assignee: 'khushboo',
      priority: 'high',
      createdAt: '2025-06-15',
      dueDate: '2025-06-30'
    }
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      const newTask = { ...action.payload, id: uuidv4() };
      state.tasks.push(newTask);
    },
   

  
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = {
          ...action.payload,
          lastUpdatedAt: new Date().toISOString(), // ⬅️ Add this
        };
      }
    },


    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});
  
  export const { addTask, editTask, deleteTask } = taskSlice.actions;
  export default taskSlice.reducer;
