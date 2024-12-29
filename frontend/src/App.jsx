import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Forgetpass from './components/Forgetpass';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget" element={<Forgetpass/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
