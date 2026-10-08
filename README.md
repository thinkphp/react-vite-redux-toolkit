# Practical Guide: React Application with Redux Toolkit (Vite)

This project demonstrates how to use the modern **Redux Toolkit** (`@reduxjs/toolkit`) along with **React-Redux** in a fast **Vite**-powered React application.

Project directory: `react-vite-redux-toolkit`

---

## Table of Contents

1. [Features Overview](#features-overview)
2. [Core Redux Concepts](#core-redux-concepts)
3. [Folder Structure](#folder-structure)
4. [Step-by-Step Implementation Guide](#step-by-step-implementation-guide)
   - [Step 1: Scaffolding the Project with Vite](#step-1-scaffolding-the-project-with-vite)
   - [Step 2: Installing Redux Dependencies](#step-2-installing-redux-dependencies)
   - [Step 3: Configuring the Central Store](#step-3-configuring-the-central-store)
   - [Step 4: Connecting the Store to React](#step-4-connecting-the-store-to-react)
   - [Step 5: Creating the First Slice (Counter)](#step-5-creating-the-first-slice-counter)
   - [Step 6: Building the Counter Component (useSelector & useDispatch)](#step-6-building-the-counter-component-useselector--usedispatch)
   - [Step 7: Creating an Advanced Slice (Task Manager)](#step-7-creating-an-advanced-slice-task-manager)
   - [Step 8: Building the TaskList Component](#step-8-building-the-tasklist-component)
   - [Step 9: Application Layout & Styling](#step-9-application-layout--styling)
5. [How to Run the Application](#how-to-run-the-application)
6. [Why Redux Toolkit (RTK) Over Legacy Redux?](#why-redux-toolkit-rtk-over-legacy-redux)

---

## Features Overview

The application demonstrates two distinct features coexisting in a single **centralized Redux Store**:

1. **Counter**:
   - A straightforward introduction to primitive state management (`number`).
   - Actions for incrementing, decrementing, resetting, and custom additions passed through `action.payload`.

2. **Task Manager**:
   - A real-world example handling complex collections (`array of objects`).
   - Actions to add tasks with priority levels (`Low`, `Medium`, `High`), toggle task completion status, delete individual tasks, dynamic status filtering (`All`, `Active`, `Completed`), and bulk deletion of completed tasks.

---

## Core Redux Concepts

* **Store**: The single source of truth for the entire client-side state tree.
* **Slice**: A piece of the Redux state with its corresponding reducer logic and generated action creators (e.g., `counter`, `tasks`).
* **Actions**: Plain JavaScript objects describing an event that occurred (e.g., `{ type: 'counter/increment' }` or `{ type: 'tasks/addTask', payload: {...} }`).
* **Reducers**: Pure functions that compute the new state based on the current state and incoming action.
* **`useSelector`**: A React-Redux hook that allows components to extract data from the Redux store state.
* **`useDispatch`**: A React-Redux hook that returns a reference to the dispatch function, used to dispatch actions to trigger state updates.
* **Immer**: An internal library in Redux Toolkit that lets you write seemingly "mutating" updates (like `state.value += 1` or `state.items.push(item)`) which safely translate into immutable updates.

---

## Folder Structure

The project follows the official feature-based folder organization recommended by the Redux team:

```text
react-vite-redux-toolkit/
├── src/
│   ├── app/
│   │   └── store.js              # Central Redux store configuration
│   ├── features/
│   │   ├── counter/
│   │   │   ├── counterSlice.js   # Counter slice (initial state, actions, reducers)
│   │   │   └── Counter.jsx       # Counter React component
│   │   └── tasks/
│   │       ├── tasksSlice.js     # Tasks slice (CRUD operations, filtering)
│   │       └── TaskList.jsx      # Task Manager React component
│   ├── App.css                   # Responsive, dark-themed styling
│   ├── App.jsx                   # Main layout container
│   ├── index.css                 # Global CSS reset and typography
│   └── main.jsx                  # Application entry point with <Provider store={store}>
├── package.json
├── vite.config.js
└── README.md
```

---

## Step-by-Step Implementation Guide

### Step 1: Scaffolding the Project with Vite
We initialized a clean React application using Vite:
```bash
npx --yes create-vite react-vite-redux-toolkit --no-interactive --template react
cd react-vite-redux-toolkit
```

### Step 2: Installing Redux Dependencies
We installed the core packages:
```bash
npm install
npm install @reduxjs/toolkit react-redux
```
* `@reduxjs/toolkit`: The modern, batteries-included standard for Redux development.
* `react-redux`: Official React bindings for Redux (`Provider`, `useSelector`, `useDispatch`).

### Step 3: Configuring the Central Store
In `src/app/store.js`, we initialize the store combining our feature reducers:
```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tasksReducer from '../features/tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tasks: tasksReducer,
  },
});
```

### Step 4: Connecting the Store to React
In `src/main.jsx`, we wrap `<App />` with `<Provider store={store}>`:
```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
```

### Step 5: Creating the First Slice (Counter)
In `src/features/counter/counterSlice.js`:
```javascript
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;
export default counterSlice.reducer;
```

### Step 6: Building the Counter Component (useSelector & useDispatch)
In `src/features/counter/Counter.jsx`:
1. Read the counter state:
   ```javascript
   const count = useSelector((state) => state.counter.value);
   ```
2. Dispatch actions:
   ```javascript
   const dispatch = useDispatch();
   dispatch(increment());
   dispatch(incrementByAmount(5));
   ```

### Step 7: Creating an Advanced Slice (Task Manager)
In `src/features/tasks/tasksSlice.js`:
* Manages an array of task objects (`items`) and a filter mode (`filter`).
* Defines reducers for `addTask`, `toggleTask`, `deleteTask`, `setFilter`, and `clearCompletedTasks`.

### Step 8: Building the TaskList Component
In `src/features/tasks/TaskList.jsx`:
* Subscribes to tasks state using `useSelector((state) => state.tasks)`.
* Dispatches task manipulation actions on form submission, checkbox toggling, and button clicks.
* Dynamically calculates counts for `All`, `Active`, and `Completed`.

### Step 9: Application Layout & Styling
* `src/App.jsx` organizes both features side-by-side in a responsive grid.
* `src/App.css` and `src/index.css` provide modern, responsive dark mode styles with cards, accessible inputs, badges, and smooth hover states.

---

## How to Run the Application

Navigate to the project folder and start the Vite development server:

```bash
cd /home/ironman/Desktop/LucianCS/Unit10/react-vite-redux-toolkit
npm run dev
```

Open the displayed URL in your browser (usually `http://localhost:5173/`).

To build for production:
```bash
npm run build
```

---

## Why Redux Toolkit (RTK) Over Legacy Redux?

1. **Zero Boilerplate**: No need to manually create action type string constants, action creator functions, and switch statements. `createSlice` generates everything automatically.
2. **Simplified Immutability with Immer**: In legacy Redux, nested immutable updates required complex object/array spread syntax. RTK integrates Immer, allowing natural syntax like `state.items.push(newTask)` safely.
3. **Built-in Configuration**: `configureStore` enables Redux DevTools Extension and safety checks for state mutations and serializability right out of the box with zero extra setup.
