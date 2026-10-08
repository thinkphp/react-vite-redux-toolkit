import Counter from './features/counter/Counter';
import TaskList from './features/tasks/TaskList';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-pill">React 19 + Redux Toolkit</div>
        <h1>React & Redux Toolkit Guide</h1>
        <p className="app-subtitle">
          A hands-on showcase featuring two independent features managed in a
          single <strong>centralized Redux Store</strong>.
        </p>
      </header>

      <main className="app-grid">
        <Counter />
        <TaskList />
      </main>

      <footer className="app-footer">
        <p>
          Built step-by-step with <strong>Vite</strong>, <strong>React</strong>,{' '}
          <strong>@reduxjs/toolkit</strong>, and <strong>react-redux</strong>.
        </p>
      </footer>
    </div>
  );
}
