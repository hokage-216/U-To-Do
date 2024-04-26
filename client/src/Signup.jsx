import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/register', { username, email, password })
      .then(result => {
        console.log(result);
        toast.success('Signup successful!'); 
        navigate('/'); // Redirect to home page
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.message === "User already exists") {
          toast.error('User already exists'); // Display error message if user already exists
        } else {
          console.error(err);
        }
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6"> 
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign Up</h2>
              <form id="signup-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username:</label>
                  <input type="text" className="form-control" id="username" name="username" required onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" className="form-control" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input type="password" className="form-control" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} /> 
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
              </form>
              <div className="text-center mt-3">
                <p>Already have an account? <Link to='/login'>Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
