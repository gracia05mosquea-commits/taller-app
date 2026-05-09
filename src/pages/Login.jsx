import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('1234')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Todos los campos son obligatorios')
      return
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dashboard')
      } else {
        setError(data.message || 'Credenciales incorrectas')
      }
    } catch {
      setError('No se pudo conectar con el servidor')
    }
  }

  return (
    <div className="container">
      <form className="card" onSubmit={handleLogin}>
        <h1>Login TallerRD</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p role="alert">{error}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}