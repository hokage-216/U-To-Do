import { useMutation } from '@apollo/client';

import { REMOVE_TODO } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const TodoList = ({ todos, isLoggedInUser = false }) => {
  const [removeTodo, { error }] = useMutation
  (REMOVE_TODO, {
    refetchQueries: [
      QUERY_ME,
      'me'
    ]
  });

  const handleRemoveTodo = async (todo) => {
    try{
      const { data } = await removeTodo({
        variables: { todo },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if(!todos.length){
    return <h3>No Todo Items Yet</h3>
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {todos &&
          todos.map((todo) => (
            <div key={todo} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{todo}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveTodo(todo)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default TodoList;