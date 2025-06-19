import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from './Redux/TodoSlice';

function App() {
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const [task, setTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleAdd = () => {
    if (task) {
      dispatch(addTodo(task));
      setTask('');
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index]);
  };

  const handleUpdate = () => {
    dispatch(editTodo({ index: editingIndex, newText: editingText }));
    setEditingIndex(null);
    setEditingText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-start justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Todo List</h2>

        <div className="flex gap-2 mb-4">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task"
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleAdd}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {todos?.map((todo, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-100 p-3 rounded shadow-sm"
            >
              {editingIndex === index ? (
                <>
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 mr-2 px-2 py-1 border rounded"
                  />
                  <button
                    onClick={handleUpdate}
                    className="text-green-600 hover:underline text-sm"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-gray-800">{todo}</span>
                  <div className="flex gap-2 text-sm">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deleteTodo(index))}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
