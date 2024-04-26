import React from 'react';

const Todo = () => {
    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title text-center">To-Do</h1>
                <input type="todo" className="todo-box" id="todo" />
              </div>
            </div>
          </div>
        </div>
       </div>

    )
}

export default Todo;