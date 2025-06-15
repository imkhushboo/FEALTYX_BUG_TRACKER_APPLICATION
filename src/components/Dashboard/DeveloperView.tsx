'use client';
import TaskList from "../Tasks/taskList";


export default function DeveloperView() {
  return (
    <section className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Tasks</h2>
      <TaskList role="developer" />
    </section>
  );
}
