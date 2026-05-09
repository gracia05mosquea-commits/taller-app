# TallerRD

Sistema web de gestión de órdenes de servicio automotriz desarrollado con React y Firebase para pequeños talleres mecánicos en República Dominicana.

## Descripción

TallerRD resuelve los problemas comunes de los talleres mecánicos que manejan información en papel o de forma verbal.

La aplicación permite:
- Registrar clientes y vehículos
- Crear órdenes de servicio
- Llevar historial de reparaciones
- Controlar estados de órdenes
- Calcular presupuestos automáticamente
- Visualizar ingresos semanales
- Acceder únicamente mediante autenticación

---

# Tecnologías Utilizadas

| Tecnología | Uso |
|---|---|
| React + Vite | Frontend |
| Firebase Auth | Autenticación |
| Firestore Database | Base de datos |
| React Router DOM | Navegación |
| CSS | Estilos responsive |

---

# Estructura del Proyecto

```bash
src/
├── components/
│   ├── ClientForm.jsx
│   ├── DashboardCards.jsx
│   ├── Navbar.jsx
│   ├── OrderForm.jsx
│   ├── ProtectedRoute.jsx
│   └── VehicleForm.jsx
│
├── pages/
│   ├── Clients.jsx
│   ├── Dashboard.jsx
│   ├── History.jsx
│   ├── Login.jsx
│   ├── Orders.jsx
│   └── Vehicles.jsx
│
├── services/
│   └── firebase.js
│
├── styles/
│   └── App.css
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Funcionalidades Principales

## Autenticación

- Login con email y contraseña
- Protección de rutas privadas
- Logout seguro

---

## Gestión de Clientes

- Registro de clientes
- Validación de formularios
- Persistencia en Firestore

---

## Gestión de Vehículos

- Registro por:
  - placa
  - marca
  - modelo
- Historial de vehículos

---

## Órdenes de Servicio

- Registro de órdenes
- Descripción del trabajo
- Piezas utilizadas
- Mano de obra
- Cálculo automático de total
- Estado:
  - En proceso
  - Completado
  - Entregado

---

## Dashboard

- Total de ingresos
- Cantidad de órdenes
- Resumen general del taller

---

## Historial

- Consulta de órdenes anteriores
- Búsqueda por vehículo

---

# Variables de Entorno

Crear archivo `.env`

```env
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
```

---

# Instalación Local

## 1. Clonar repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

---

## 2. Entrar al proyecto

```bash
cd taller-app
```

---

## 3. Instalar dependencias

```bash
npm install
```

---

## 4. Ejecutar proyecto

```bash
npm run dev
```

---

# Configuración Firebase

## Authentication

Activar:

```text
Email/Password
```

---

## Firestore Rules

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

# Colecciones Firestore

## clients

```json
{
  "name": "Juan Pérez",
  "phone": "8095551234"
}
```

---

## vehicles

```json
{
  "plate": "A123456",
  "brand": "Toyota",
  "model": "Corolla"
}
```

---

## orders

```json
{
  "vehicle": "Toyota Corolla",
  "description": "Cambio de aceite",
  "parts": "Filtro Bosch",
  "labor": 1000,
  "partsPrice": 1500,
  "total": 2500,
  "status": "Completado"
}
```

---

# Responsive Design

La aplicación está optimizada para:

- Desktop
- Tablet
- Mobile

---

# Accesibilidad

- Formularios validados
- Mensajes con `role='alert'`
- Navegación clara
- Estructura semántica HTML

---

# Integrantes

- Cheremi Checo Dominguez - 100656934
- Gracia Mosquea Rivera - 100531861
- Hans Benny Pascual Hidalgo Moreno - 100639904


---

# Caso Asignado

## Caso 6 — TallerRD

Sistema de gestión automotriz para talleres mecánicos de República Dominicana.

---

# 📄 Licencia

Proyecto académico desarrollado para la asignatura de Desarrollo Web / React.
