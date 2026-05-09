import { useState, useEffect } from 'react'

export default function Clients() {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [email, setEmail] = useState('')
  const [clients, setClients] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    const response = await fetch('http://localhost:3000/clientes')
    const data = await response.json()
    setClients(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!nombre || !telefono) {
      setError('Nombre y teléfono son obligatorios')
      return
    }

    await fetch('http://localhost:3000/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre,
        telefono,
        direccion,
        email
      })
    })

    setNombre('')
    setTelefono('')
    setDireccion('')
    setEmail('')
    setError('')

    loadClients()
  }

  return (
    <div className="page">
      <h1>Clientes</h1>
      <p className="subtitle">Registro de clientes del taller</p>

      <form className="card" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del cliente"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p role="alert">{error}</p>}

        <button type="submit">Guardar Cliente</button>
      </form>

      <div className="list">
        {clients.map((client) => (
          <div key={client.id_cliente} className="card">
            <h3>{client.nombre}</h3>
            <p>{client.telefono}</p>
            <p>{client.direccion}</p>
            <p>{client.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}