export default function DashboardCards({ totalWeek, orders }) {
  return (
    <div className='dashboard-grid'>
      <div className='card'>
        <h2>Ingresos</h2>
        <p>RD$ {totalWeek}</p>
      </div>

      <div className='card'>
        <h2>Órdenes</h2>
        <p>{orders}</p>
      </div>
    </div>
  )
}