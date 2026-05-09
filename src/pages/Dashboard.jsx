import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [totalWeek, setTotalWeek] = useState(0)
  const [orders, setOrders] = useState(0)
  const [report, setReport] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await fetch('http://localhost:3000/reporte-semanal')
      const data = await response.json()

      setReport(data)

      let total = 0
      let cantidad = 0

      data.forEach((item) => {
        total += Number(item.total_generado)
        cantidad += Number(item.cantidad_servicios)
      })

      setTotalWeek(total)
      setOrders(cantidad)
    } catch (error) {
      console.log('Error cargando el dashboard:', error)
    }
  }

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <p className="subtitle">Resumen semanal del taller</p>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Ingresos de la semana</h2>
          <p>RD$ {totalWeek.toLocaleString()}</p>
        </div>

        <div className="card">
          <h2>Órdenes realizadas</h2>
          <p>{orders}</p>
        </div>

        <div className="card">
          <h2>Servicios registrados</h2>
          <p>{report.length}</p>
        </div>
      </div>

      <div className="table-card">
        <h2>Reporte semanal por servicio</h2>

        <table>
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Cantidad</th>
              <th>Total generado</th>
            </tr>
          </thead>

          <tbody>
            {report.map((item, index) => (
              <tr key={index}>
                <td>{item.servicio}</td>
                <td>{item.cantidad_servicios}</td>
                <td>RD$ {Number(item.total_generado).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}