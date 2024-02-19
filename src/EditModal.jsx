// // EditTodoModal.js
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { editTodo } from './todoSlice';

// const EditTodoModal = ({ todo }) => {
//   const dispatch = useDispatch();
//   const [text, setText] = useState(todo.text);

//   const handleSave = () => {
//     dispatch(editTodo({
//       id: todo.id,
//       text,
//     }));
//     // Close the modal
//   };

//   return (
//     // Render your modal UI with an input field and save button
//   );
// };

// export default EditTodoModal;