import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, editTodo, toggleComplete } from "./todoSlice";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState(null);

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(
        addTodo({
          id: Date.now(),
          text,
          isComplete: false,
        })
      );
      setText("");
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = () => {
    if (editedTodo) {
      dispatch(
        editTodo({
          id: editedTodo.id,
          newText: editedTodo.text,
        })
      );
      setEditModalOpen(false);
      setEditedTodo(null);
    }
  };

  const handleToggleComplete = (id, isComplete) => {
    dispatch(
      toggleComplete({
        id,
        isComplete,
      })
    );
  };

  const openEditModal = (todo) => {
    setEditedTodo(todo);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedTodo(null);
    setEditModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-20 w-1/3 p-4">
      <div className="w-full flex justify-between">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-2 w-3/4 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddTodo}
          className="ml-2 w-1/4  px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Todo
        </button>
      </div>
      <ul className="mt-4">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between py-2">
            <div>
              <button
                onClick={() => handleToggleComplete(todo.id, !todo.isComplete)}
                className={`px-2 py-1 rounded mr-2 ${
                  todo.isComplete ? "bg-green-500" : "bg-gray-300"
                } text-white hover:bg-green-600`}
              >
                <i className="fa-regular text-xl fa-circle-check"></i>
              </button>
              <span
                style={{
                  textDecoration: todo.isComplete ? "line-through" : "none",
                }}
                className="text-gray-800 text-lg"
              >
                {todo.text}
              </span>
            </div>
            <div>
              <button
                onClick={() => openEditModal(todo)}
                className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                <i className="fa-regular text-xl fa-pen-to-square"></i>
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <i className="fa-solid text-xl fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editModalOpen && editedTodo && (
        <div className="modal fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded">
            <h2 className="text-xl text-center mb-4">Edit ToDo</h2>
            <input
              type="text"
              value={editedTodo.text}
              onChange={(e) =>
                setEditedTodo({
                  ...editedTodo,
                  text: e.target.value,
                })
              }
              className="p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleEditTodo}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={closeEditModal}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
