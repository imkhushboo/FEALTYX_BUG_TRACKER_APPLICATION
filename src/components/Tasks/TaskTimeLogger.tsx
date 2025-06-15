'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { logTime } from '@/redux/timeSlice';

interface Props {
  taskId: string;
}

export default function TaskTimeLogger({ taskId }: Props) {
  const [minutes, setMinutes] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleLog = () => {
    if (!minutes || isNaN(+minutes)) return;
    dispatch(logTime({
      taskId,
      timeSpent: Number(minutes),
      date: new Date().toISOString().split('T')[0],
    }));
    setMinutes('');
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        placeholder="Minutes"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        className="border px-2 py-1 w-24"
      />
      <button
        onClick={handleLog}
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Log Time
      </button>
    </div>
  );
}
