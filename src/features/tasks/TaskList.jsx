import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  toggleTask,
  deleteTask,
  setFilter,
  clearCompletedTasks,
} from './tasksSlice';

export default function TaskList() {
  // Extract tasks state from the Redux Store
  const { items, filter } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  // Local state for the new task form
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(
      addTask({
        title: title.trim(),
        priority,
      })
    );
    setTitle('');
  };

  // Derive filtered tasks directly from Redux state
  const filteredTasks = items.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = items.filter((task) => !task.completed).length;
  const completedCount = items.filter((task) => task.completed).length;

  return (
    <section className="card tasks-card">
      <div className="card-header">
        <h2>2. Advanced Example: Task Manager</h2>
        <span className="card-tag">Complex State & Filtering</span>
      </div>
      <p className="card-desc">
        Demonstrates collections (array of objects), payload-based actions, and dynamic filtering.
      </p>

      {/* New task form */}
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new task..."
          className="input-field task-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="select-field"
        >
          <option value="Low">Priority: Low</option>
          <option value="Medium">Priority: Medium</option>
          <option value="High">Priority: High</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>

      {/* Filter toolbar and bulk actions */}
      <div className="task-toolbar">
        <div className="filter-buttons">
          <button
            type="button"
            className={`btn-filter ${filter === 'all' ? 'active' : ''}`}
            onClick={() => dispatch(setFilter('all'))}
          >
            All ({items.length})
          </button>
          <button
            type="button"
            className={`btn-filter ${filter === 'active' ? 'active' : ''}`}
            onClick={() => dispatch(setFilter('active'))}
          >
            Active ({activeCount})
          </button>
          <button
            type="button"
            className={`btn-filter ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => dispatch(setFilter('completed'))}
          >
            Completed ({completedCount})
          </button>
        </div>

        {completedCount > 0 && (
          <button
            type="button"
            onClick={() => dispatch(clearCompletedTasks())}
            className="btn btn-danger-link"
          >
            Clear completed
          </button>
        )}
      </div>

      {/* Task list */}
      <ul className="task-list">
        {filteredTasks.length === 0 ? (
          <li className="empty-message">No tasks found in this view.</li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              <label className="task-checkbox-container">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch(toggleTask(task.id))}
                />
                <span className="task-title">{task.title}</span>
              </label>

              <div className="task-meta">
                <span className={`badge badge-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
                <button
                  type="button"
                  onClick={() => dispatch(deleteTask(task.id))}
                  className="btn-delete"
                  title="Delete task"
                  aria-label="Delete task"
                >
                  ✕
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
