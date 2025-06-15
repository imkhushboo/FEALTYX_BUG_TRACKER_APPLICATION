import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimeLog {
  taskId: string;
  timeSpent: number; // in minutes
  date: string; // ISO date string
}

interface TimeState {
  logs: TimeLog[];
}

const initialState: TimeState = {
  logs: [],
};

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    logTime: (state, action: PayloadAction<TimeLog>) => {
      state.logs.push(action.payload);
    },
  },
});

export const { logTime } = timeSlice.actions;
export default timeSlice.reducer;
