import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TODO, REMOVE_TODO } from '../../utils/mutations';

const TodoList = ({ todos }) => {
  const [newTodo, setNewTodo] = useState('');
  const [addTodo] = useMutation(ADD_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO);
  

  const handleAddTodo = async () => {

    try {
      // Validate newTodo
      if (!newTodo.trim()) {
        console.error('Todo cannot be empty');
        return;
      }
      const profileId = '6632d80fc0204635471d8817';
      // Call the addTodo mutation
      await addTodo({
        variables: { profileId: profileId, todos: newTodo },
      });
      // Reset the input field after adding the todo
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleRemoveTodo = async (todoId) => {
    try {
      // Call the removeTodo mutation
      await removeTodo({
        variables: { todoId },
      });
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  return (
    <div className="todo-container">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
        className="todo-input"
      />
      <button onClick={handleAddTodo} className="todo-button">Add Todo</button>

      {/* Display existing todos if todos exist */}
      {todos && todos.map((todo) => (
        <div key={todo._id} className="todo-item">
          <p>{todo.todo}</p>
          {/* Button to remove todo */}
          <button onClick={() => handleRemoveTodo(todo._id)} className="todo-remove-button">Remove</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
