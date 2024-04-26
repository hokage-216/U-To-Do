import React from 'react';

const Todo = () => {
    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
              <button classname="logout-button" id="logout"> Log Out </button>
                <h1 className="card-title text-center">To-Do</h1>
                <input type="todo" classname="todo-box" id="todo"/>
                <button type="submit" classname="enter-button" id="enter"> Enter </button>
                  <button classname="edit-button" id="edit"> Edit </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Todo;