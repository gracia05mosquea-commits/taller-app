import { useState, useEffect } from 'react'

export default function Vehicles() {
  const [placa, setPlaca] = useState('')
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [anio, setAnio] = useState('')
  const [idCliente, setIdCliente] = useState('')
  const [vehicles, setVehicles] = useState([])
  const [clients, setClients] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    loadVehicles()
    loadClients()
  }, [])

  const loadVehicles = async () => {
    const response = await fetch('http://localhost:3000/vehiculos')
    const data = await response.json()
    setVehicles(data)
  }

  const loadClients = async () => {
    const response = await fetch('http://localhost:3000/clientes')
    const data = await response.json()
    setClients(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!placa || !marca || !modelo || !idCliente) {
      setError('Placa, marca, modelo y cliente son obligatorios')
      return
    }

    await fetch('http://localhost:3000/vehiculos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        placa,
        marca,
        modelo,
        anio,
        id_cliente: idCliente
      })
    })

    setPlaca('')
    setMarca('')
    setModelo('')
    setAnio('')
    setIdCliente('')
    setError('')

    loadVehicles()
  }

  return (
    <div className="page">
      <h1>Vehículos</h1>
      <p className="subtitle">Registro de vehículos por cliente</p>

      <form className="card" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Placa"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
        />

        <input
          type="text"
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />

        <input
          type="text"
          placeholder="Modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
        />

        <input
          type="number"
          placeholder="Año"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
        />

        <select
          value={idCliente}
          onChange={(e) => setIdCliente(e.target.value)}
        >
          <option value="">Seleccione un cliente</option>
          {clients.map((client) => (
            <option key={client.id_cliente} value={client.id_cliente}>
              {client.nombre}
            </option>
          ))}
        </select>

        {error && <p role="alert">{error}</p>}

        <button type="submit">Guardar Vehículo</button>
      </form>

      <div className="list">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id_vehiculo} className="card">
            <p><strong>Placa:</strong> {vehicle.placa}</p>
            <p><strong>Marca:</strong> {vehicle.marca}</p>
            <p><strong>Modelo:</strong> {vehicle.modelo}</p>
            <p><strong>Año:</strong> {vehicle.anio}</p>
          </div>
        ))}
      </div>
    </div>
  )
}