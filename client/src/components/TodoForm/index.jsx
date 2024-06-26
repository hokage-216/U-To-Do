import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_TODO} from '../../utils/mutations';

import Auth from '../../utils/auth';

const TodoForm = ({ profileId }) => {
  const [todo, setTodo] = useState('');

  const [addTodo, {error}] = useMutation(ADD_TODO);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try{
      const data = await addTodo({
        variables: {profileId, todo },
      });
      setTodo('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h4>Add a todo item below</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="Add a Todo item..."
              value={todo}
              className="form-input w-100"
              onChange={(event) => setTodo(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Add Todo
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to endorse todos. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default TodoForm;