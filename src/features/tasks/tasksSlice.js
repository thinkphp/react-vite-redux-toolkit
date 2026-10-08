import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 1,
      title: 'Understand the difference between local state and global store',
      priority: 'High',
      completed: true,
    },
    {
      id: 2,
      title: 'Configure Store using configureStore and Provider',
      priority: 'Medium',
      completed: true,
    },
    {
      id: 3,
      title: 'Create actions and reducers with createSlice',
      priority: 'High',
      completed: false,
    },
    {
      id: 4,
      title: 'Use useSelector and useDispatch hooks in components',
      priority: 'Low',
      completed: false,
    },
  ],
  filter: 'all', // 'all' | 'active' | 'completed'
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      // action.payload contains { title, priority }
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        priority: action.payload.priority || 'Medium',
        completed: false,
      };
      state.items.unshift(newTask);
    },
    toggleTask: (state, action) => {
      // action.payload is task.id
      const task = state.items.find((item) => item.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action) => {
      // action.payload is task.id
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setFilter: (state, action) => {
      // action.payload is 'all' | 'active' | 'completed'
      state.filter = action.payload;
    },
    clearCompletedTasks: (state) => {
      state.items = state.items.filter((item) => !item.completed);
    },
  },
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  setFilter,
  clearCompletedTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
