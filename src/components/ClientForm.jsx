export default function ClientForm({
  name,
  setName,
  phone,
  setPhone,
  error
}) {
  return (
    <>
      <input
        type='text'
        placeholder='Nombre'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type='text'
        placeholder='Teléfono'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      {error && <p role='alert'>{error}</p>}
    </>
  )
}