import { useState, useEffect } from 'react'

export default function Orders() {
  const [idVehiculo, setIdVehiculo] = useState('')
  const [idServicio, setIdServicio] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [estado, setEstado] = useState('EN_PROCESO')
  const [total, setTotal] = useState('')
  const [vehicles, setVehicles] = useState([])
  const [services, setServices] = useState([])
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    loadVehicles()
    loadServices()
    loadOrders()
  }, [])

  const loadVehicles = async () => {
    const response = await fetch('http://localhost:3000/vehiculos')
    const data = await response.json()
    setVehicles(data)
  }

  const loadServices = async () => {
    const response = await fetch('http://localhost:3000/servicios')
    const data = await response.json()
    setServices(data)
  }

  const loadOrders = async () => {
    const response = await fetch('http://localhost:3000/ordenes')
    const data = await response.json()
    setOrders(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!idVehiculo || !idServicio || !descripcion || !total) {
      setError('Todos los campos principales son obligatorios')
      return
    }

    await fetch('http://localhost:3000/ordenes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_vehiculo: idVehiculo,
        id_servicio: idServicio,
        fecha: new Date().toISOString().split('T')[0],
        descripcion_trabajo: descripcion,
        estado,
        total_aprobado: total
      })
    })

    setIdVehiculo('')
    setIdServicio('')
    setDescripcion('')
    setEstado('EN_PROCESO')
    setTotal('')
    setError('')

    loadOrders()
  }

  return (
    <div className="page">
      <h1>Órdenes de Servicio</h1>
      <p className="subtitle">Registro y control de trabajos realizados</p>

      <form className="card" onSubmit={handleSubmit}>
        <select value={idVehiculo} onChange={(e) => setIdVehiculo(e.target.value)}>
          <option value="">Seleccione un vehículo</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id_vehiculo} value={vehicle.id_vehiculo}>
              {vehicle.placa} - {vehicle.marca} {vehicle.modelo}
            </option>
          ))}
        </select>

        <select value={idServicio} onChange={(e) => setIdServicio(e.target.value)}>
          <option value="">Seleccione un servicio</option>
          {services.map((service) => (
            <option key={service.id_servicio} value={service.id_servicio}>
              {service.nombre}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Descripción del trabajo"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <input
          type="number"
          placeholder="Total aprobado RD$"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />

        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="EN_PROCESO">En proceso</option>
          <option value="COMPLETADO">Completado</option>
          <option value="ENTREGADO">Entregado</option>
        </select>

        {error && <p role="alert">{error}</p>}

        <button type="submit">Guardar Orden</button>
      </form>

      <div className="list">
        <h2>Historial de órdenes</h2>

        {orders.map((order) => (
          <div key={order.id_orden} className="card">
            <h3>{order.placa} - {order.marca} {order.modelo}</h3>
            <p><strong>Servicio:</strong> {order.servicio}</p>
            <p><strong>Descripción:</strong> {order.descripcion_trabajo}</p>
            <p><strong>Estado:</strong> {order.estado}</p>
            <p><strong>Total:</strong> RD$ {Number(order.total_aprobado).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}