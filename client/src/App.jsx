import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import Todo from './components/Todolist';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={isLoggedIn ? <Todo /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
