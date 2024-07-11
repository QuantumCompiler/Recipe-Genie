import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import CreateRecipe from './Components/CreateNewRecipe';
import Login from './Components/Login.js';
import Register from './Components/Register';

/*  App - The main application component
    Inputs:
        None
    Algorithm:
        * Render the Dashboard component
        * Render the CreateRecipe component when the user navigates to the create-recipe route
    Return:
        The main application component
*/
// export default function App() {
//   return (
//     // Routers for the application
//     <Router>
//       {/* Div for app */}
//       <div className='App'>
//         {/* Dashboard component */}
//         <Dashboard/>
//         {/* Routes for the application */}
//         <Routes>
//           {/* Route for the home page */}
//           <Route path='/' exact element={Dashboard} />
//           {/* Route for the create recipe page */}
//           <Route path='/create-recipe' element={<CreateRecipe />}/>
//         </Routes>
//       </div>
//     </Router>
//   );
// }

export default function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </div>
    </Router>
  );
}