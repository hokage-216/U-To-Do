import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', { email, password })
      .then(response => {
        if (response.data && response.data.token) {
          const token = response.data.token;
          localStorage.setItem('token', token);
          navigate('/'); 
        } else {
          console.error('Token not found in response');
        }
      })
      .catch(err => console.error(err));
  };
  return (
    <div className="login-background">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Login</h2>
                <form id="login-form" action="your_login_script.php" method="post" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} value={email}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} value={password}/> 
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Login</button>
                  </div>
                </form>
                <div className="text-center mt-3">
                  <p>Don't have an account? <Link to='/register'>Sign up</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
