import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Vehicles from './pages/Vehicles'
import Orders from './pages/Orders'
import History from './pages/History'

import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  return (
    <>
      {user && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clients"
          element={
            <ProtectedRoute user={user}>
              <Clients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles"
          element={
            <ProtectedRoute user={user}>
              <Vehicles />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute user={user}>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute user={user}>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/"} />}
        />
      </Routes>
    </>
  )
}