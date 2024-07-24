import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import CreateRecipe from './Components/CreateNewRecipe';
import Login from './Components/LogIn.js';
import Register from './Components/Register';

export default function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='create-recipe' element={<CreateRecipe />}/>
        </Routes>
      </div>
    </Router>
  );
}