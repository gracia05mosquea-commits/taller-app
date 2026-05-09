import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
    window.location.reload()
  }

  return (
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/clients">Clientes</Link>
      <Link to="/vehicles">Vehículos</Link>
      <Link to="/orders">Órdenes</Link>
      <Link to="/history">Historial</Link>

      <button onClick={handleLogout}>
        Salir
      </button>
    </nav>
  )
}