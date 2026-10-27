import { useState } from 'react';
import TodoApp from './components/TodoApp.jsx';
import StudyTimer from './components/StudyTimer.jsx';

const tabs = [
  { id: 'todo', label: 'Todo App' },
  { id: 'timer', label: 'Study Timer' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('todo');

  return (
    <main className="min-h-screen bg-gradient-to-br from-lavender-100 via-[#f1edff] to-indigo-100 px-4 pb-12 pt-6 text-ink sm:px-6 sm:pt-8">
      <header className="mx-auto mb-7 w-full max-w-5xl">
        <div className="flex items-center gap-2 text-sm font-bold text-white/90"><span className="grid h-7 w-7 place-items-center rounded-lg bg-white/20 text-base">✦</span> Little List</div>
      </header>
      <nav className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-xl bg-white/75 p-1.5 shadow-sm backdrop-blur" aria-label="Choose app">
        {tabs.map((tab) => <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} aria-current={activeTab === tab.id ? 'page' : undefined} className={`rounded-lg px-4 py-2 text-sm font-medium transition sm:px-5 ${activeTab === tab.id ? 'bg-lavender-100 text-lavender-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>{tab.label}</button>)}
      </nav>
      {activeTab === 'todo' ? <TodoApp /> : <StudyTimer />}
      <footer className="mx-auto mt-8 max-w-5xl border-t border-white/60 pt-4 text-center text-xs text-slate-500/80">Make room for what matters.</footer>
    </main>
  );
}
