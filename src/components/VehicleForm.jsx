export default function VehicleForm({
  plate,
  setPlate,
  brand,
  setBrand,
  model,
  setModel,
  error
}) {
  return (
    <>
      <input
        type='text'
        placeholder='Placa'
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
      />

      <input
        type='text'
        placeholder='Marca'
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />

      <input
        type='text'
        placeholder='Modelo'
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />

      {error && <p role='alert'>{error}</p>}
    </>
  )
}   