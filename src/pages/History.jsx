import { useEffect, useState } from 'react'

export default function History() {
  const [search, setSearch] = useState('')
  const [orders, setOrders] = useState([])

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    const response = await fetch('http://localhost:3000/ordenes')
    const data = await response.json()
    setOrders(data)
  }

  const filtered = orders.filter((order) =>
    order.placa.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <h1>Historial</h1>
      <p className="subtitle">Consulta de servicios realizados por placa</p>

      <input
        type="text"
        placeholder="Buscar por placa"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="list">
        {filtered.map((order) => (
          <div className="card" key={order.id_orden}>
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