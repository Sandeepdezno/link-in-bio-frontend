import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './components/style.css';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './components/dashboard.css';
import EditProfile from './components/EditProfile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/edit-profile' element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
