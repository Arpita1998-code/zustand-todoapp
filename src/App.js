import React, { useState } from 'react';
import { useStore } from './store';

function App() {
  const { todos, addTodo, updateTodo, deleteTodo } = useStore();
  const [editingId, setEditingId] = useState(null);
  const [newText, setNewText] = useState('');

  const handleAddTodo = (text) => {
    if (text.trim() !== '') {
      addTodo({ text, completed: false });
      document.getElementById('todoInput').value = '';
    }
  };

  const handleUpdateTodo = (id) => {
    updateTodo(id, { text: newText });
    setEditingId(null);
    setNewText('');
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-gray-100 rounded">
      <h1 className="text-2xl mb-4 text-center">Todo App</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          id="todoInput"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={() => handleAddTodo(document.getElementById('todoInput').value)}
          className="ml-2 p-2 bg-blue-500 text-white rounded">
          Add Todo
        </button>
      </div>
      <ul>
        {[...todos].reverse().map((todo) => (
          <li key={todo.id} className="bg-white p-3 mb-2 rounded shadow">
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="p-2 border rounded"
                />
                <button
                  onClick={() => handleUpdateTodo(todo.id)}
                  className="ml-2 p-2 bg-green-500 text-white rounded">
                  Save
                </button>
              </>
            ) : (
              <>
                {todo.text}
                <button
                  onClick={() => setEditingId(todo.id)}
                  className="ml-2 p-2 bg-yellow-500 text-white rounded">
                  Edit
                </button>
              </>
            )}
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="ml-2 p-2 bg-red-500 text-white rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;