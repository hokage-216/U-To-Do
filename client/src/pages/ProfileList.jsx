// import React, { useState } from 'react';
// import { useMutation, useQuery } from '@apollo/client';
// import { ADD_TODO } from '../utils/mutations';
// import { useParams } from 'react-router-dom'; // Import useParams hook
// import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';


// const TodoList = ({ todos }) => {
//   const [newTodo, setNewTodo] = useState('');
//   const [addTodo] = useMutation(ADD_TODO);
//   const { profileId } = useParams(); 
//   const { loading, data } = useQuery(profileId ? QUERY_SINGLE_PROFILE : QUERY_ME, {
//     variables: { profileId: profileId },
//   });

//   const profile = data?.me || data?.profile || {};

//   const handleAddTodo = async () => {
//     try {
//       if (!newTodo.trim()) {
//         console.error('Todo cannot be empty');
//         return;
//       }
//       console.log('Adding todo:', newTodo); 
//       console.log('Profile ID:', profile._id); 
//       await addTodo({
//         variables: { profileId: profile._id, todo: newTodo }, 
//       });
//       setNewTodo('');
//     } catch (error) {
//       console.error('Error adding todo:', error);
//     }
//   };

//   return (
//     <div className="todo-container">
//       <input
//         type="text"
//         value={newTodo}
//         onChange={(e) => setNewTodo(e.target.value)}
//         placeholder="Enter a new todo"
//         className="todo-input"
//       />
//       <button onClick={handleAddTodo} className="todo-button">Add Todo</button>

//       {/* Display existing todos if todos exist */}
//       {todos && todos.map((todo) => (
//         <div key={todo._id} className="todo-item">
//           <p>{todo.todo}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TodoList;
