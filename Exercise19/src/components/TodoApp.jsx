import { useState } from 'react';

const starterTasks = [
  { id: 1, text: 'hey whtsapp', done: false },
  { id: 2, text: 'how are yu doing', done: true },
  { id: 3, text: 'This is cool right ?', done: false }
];

export default function TodoApp() {
  const [tasks, setTasks] = useState(starterTasks);
  const [newTask, setNewTask] = useState('');

  function addTask(event) {
    event.preventDefault();
    const text = newTask.trim();
    if (!text) return;
    setTasks((current) => [...current, { id: crypto.randomUUID(), text, done: false }]);
    setNewTask('');
  }

  function toggleTask(id) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  const completeCount = tasks.filter((task) => task.done).length;

  return (
    <section className="mx-auto w-full max-w-xl rounded-panel bg-white px-6 py-7 shadow-card sm:px-8 sm:py-8" aria-labelledby="todo-title">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div><p className="mb-1 text-xs font-semibold uppercase tracking-[.16em] text-lavender-600">A clear little list</p><h1 id="todo-title" className="text-2xl font-bold tracking-tight text-ink sm:text-[28px]">My Todo List</h1></div>
        <span className="rounded-full bg-lavender-50 px-3 py-1.5 text-xs font-medium text-lavender-700">{completeCount}/{tasks.length} done</span>
      </div>

      <form onSubmit={addTask} className="mb-5 flex gap-2">
        <label htmlFor="new-task" className="sr-only">Add a new todo</label>
        <input id="new-task" value={newTask} onChange={(event) => setNewTask(event.target.value)} placeholder="Add a new todo..." className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-lavender-600 focus:ring-4 focus:ring-lavender-100" />
        <button type="submit" className="rounded-lg bg-lavender-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-lavender-700 focus:outline-none focus:ring-4 focus:ring-lavender-200">Add</button>
      </form>

      {tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-9 text-center"><span className="text-2xl" aria-hidden="true">✦</span><p className="mt-2 text-sm font-medium text-slate-700">Your list is clear.</p><p className="mt-1 text-xs text-slate-500">Add a task whenever you’re ready.</p></div>
      ) : (
        <ul className="space-y-2.5" aria-label="Todo items">
          {tasks.map((task) => (
            <li key={task.id} className={`group flex min-h-12 items-center gap-3 rounded-lg px-3 py-2.5 transition ${task.done ? 'bg-slate-100' : 'bg-slate-50 hover:bg-lavender-50'}`}>
              <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} aria-label={`${task.done ? 'Mark incomplete' : 'Complete'}: ${task.text}`} className="h-[18px] w-[18px] shrink-0 cursor-pointer accent-lavender-600" />
              <span className={`min-w-0 flex-1 break-words text-sm ${task.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{task.text}</span>
              <button type="button" onClick={() => deleteTask(task.id)} className="rounded-md px-2 py-1 text-xs font-medium text-rose-600 opacity-100 transition hover:bg-rose-50 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100" aria-label={`Delete ${task.text}`}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-5 border-t border-slate-100 pt-4 text-center text-xs text-slate-400">Small steps count. Keep going.</p>
    </section>
  );
}
