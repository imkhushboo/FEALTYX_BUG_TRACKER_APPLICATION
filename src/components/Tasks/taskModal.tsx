'use client';
import { ReactNode } from 'react';

export default function TaskModal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
        <button className="text-sm mb-4 text-right block ml-auto text-red-500" onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}
