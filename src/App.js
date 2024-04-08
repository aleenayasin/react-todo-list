import React, { useReducer, useState } from 'react';

const initialState = {
  todos: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...state.todos, { text: action.payload, completed: false }],
      };
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map((todo, index) =>
          index === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'REMOVE_TODO':
      return {
        todos: state.todos.filter((todo, index) => index !== action.payload),
      };
    case 'CLEAR_COMPLETED':
      return {
        todos: state.todos.filter((todo) => !todo.completed),
      };
    default:
      return state;
  }
}

function TodoList() {
  const [todoInput, setTodoInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddTodo = () => {
    if (todoInput.trim() !== '') {
      dispatch({ type: 'ADD_TODO', payload: todoInput });
      setTodoInput('');
    }
  };

  const handleToggleTodo = (index) => {
    dispatch({ type: 'TOGGLE_TODO', payload: index });
  };

  const handleRemoveTodo = (index) => {
    dispatch({ type: 'REMOVE_TODO', payload: index });
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const filteredTodos = state.todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => handleToggleTodo(index)}
            >
              {todo.text}
            </span>
            <button onClick={() => handleRemoveTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('active')}>Active</button>
      </div>
      <button onClick={handleClearCompleted}>Clear Completed</button>
    </div>
  );
}

export default TodoList;
