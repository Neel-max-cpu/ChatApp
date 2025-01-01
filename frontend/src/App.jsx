import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Forgetpass from './components/Forgetpass';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './components/ProfilePage';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget" element={<Forgetpass />} />

          {/* own */}
          <Route path="/profile" element={<ProfilePage isOwnProfile={true}
            user={{
              name: 'John Doe',
              profilePic: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
              status: 'Living life to the fullest.',
            }} />} />

          {/* other */}
          {/* <Route path="/profile" element={<ProfilePage isOwnProfile={false}
            user={{
              name: 'Jane Doe',
              profilePic: 'https://d3kqdc25i4tl0t.cloudfront.net/articles/content/92_408268_151204profilepicture_hero.jpg',
              status: 'Keep smiling!',
            }} />} /> */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
