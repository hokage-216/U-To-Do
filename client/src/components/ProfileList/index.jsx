import { Link } from 'react-router-dom';

const ProfileList = ({ profiles, title }) => {
  if (!profiles.length) {
    return <h3>No Profiles Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {profiles &&
          profiles.map((profile) => (
            <div key={profile._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {profile.name} <br />
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                    currently has {profile.todos ? profile.todos.length : 0}{' '}
                   Todo items
                    {profile.todos && profile.todos.length === 1 ? '' : 's'}
                  </span>
                </h4>

                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/profiles/${profile._id}`}
                >
                  View their todos
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileList;













// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_TODO, REMOVE_TODO } from '../../utils/mutations';

// const TodoList = ({ todos }) => {
//   const [newTodo, setNewTodo] = useState('');
//   const [addTodo] = useMutation(ADD_TODO);
//   const [removeTodo] = useMutation(REMOVE_TODO);

//   const handleAddTodo = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior
//     try {
//       // Validate newTodo
//       if (!newTodo.trim()) {
//         console.error('Todo cannot be empty');
//         return;
//       }
//       const profileId = '6632d80fc0204635471d8817';
//       // Call the addTodo mutation
//       await addTodo({
//         variables: { profileId: profileId, todos: newTodo },
//       });
//       // Reset the input field after adding the todo
//       setNewTodo('');
//     } catch (error) {
//       console.error('Error adding todo:', error);
//     }
//   };

//   const handleRemoveTodo = async (todoId) => {
//     try {
//       // Call the removeTodo mutation
//       await removeTodo({
//         variables: { todoId },
//       });
//     } catch (error) {
//       console.error('Error removing todo:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleAddTodo} className="todo-container">
//       <input
//         type="text"
//         value={newTodo}
//         onChange={(e) => setNewTodo(e.target.value)}
//         placeholder="Enter a new todo"
//         className="todo-input"
//       />
//       <button type="submit" className="todo-button">Add Todo</button>

//       {/* Display existing todos if todos exist */}
//       {todos && todos.map((todo) => (
//         <div key={todo._id} className="todo-item">
//           <p>{todo.todo}</p>
//           {/* Button to remove todo */}
//           <button onClick={() => handleRemoveTodo(todo._id)} className="todo-remove-button">Remove</button>
//         </div>
//       ))}
//     </form>
//   );
// };

// export default TodoList;
