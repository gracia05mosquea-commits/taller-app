const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Dios1218",
  database: "tallerRD",
  port: 3307
});

// probar conexión
db.connect((err) => {
  if (err) {
    console.log("❌ Error conectando a MySQL:", err);
    return;
  }
  console.log("✅ Conectado a MySQL correctamente");
});

// ruta prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚗🔧");
});

app.get("/clientes", (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// iniciar servidor
app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length > 0) {
      res.json({ message: "Login correcto", user: results[0] });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  });
});

app.post("/clientes", (req, res) => {
  const { nombre, telefono, direccion, email } = req.body;

  const sql = "INSERT INTO clientes (nombre, telefono, direccion, email) VALUES (?, ?, ?, ?)";
  db.query(sql, [nombre, telefono, direccion, email], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Cliente agregado correctamente", id: result.insertId });
  });
});


app.post("/vehiculos", (req, res) => {
  const { placa, marca, modelo, anio, id_cliente } = req.body;

  const sql = `
    INSERT INTO vehiculos (placa, marca, modelo, anio, id_cliente)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [placa, marca, modelo, anio, id_cliente], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.json({
      message: "Vehículo agregado correctamente",
      id: result.insertId
    });
  });
});

app.get("/vehiculos", (req, res) => {
  db.query("SELECT * FROM vehiculos", (err, results) => {
    if (err) return res.status(500).json({ error: err })
    res.json(results)
  })
})

app.post("/ordenes", (req, res) => {
  const {
    id_vehiculo,
    id_servicio,
    fecha,
    descripcion_trabajo,
    estado,
    total_aprobado
  } = req.body;

  const sql = `
    INSERT INTO ordenes_servicio
    (id_vehiculo, id_servicio, fecha, descripcion_trabajo, estado, total_aprobado)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      id_vehiculo,
      id_servicio,
      fecha,
      descripcion_trabajo,
      estado,
      total_aprobado
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.json({
        message: "Orden de servicio creada correctamente",
        id: result.insertId
      });
    }
  );
});


app.get("/reporte-semanal", (req, res) => {
  const sql = `
    SELECT 
      s.nombre AS servicio,
      COUNT(o.id_orden) AS cantidad_servicios,
      SUM(o.total_aprobado) AS total_generado
    FROM ordenes_servicio o
    INNER JOIN servicios s 
      ON o.id_servicio = s.id_servicio
    WHERE YEARWEEK(o.fecha, 1) = YEARWEEK(CURDATE(), 1)
    GROUP BY s.nombre
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });

    res.json(results);
  });
});


app.get("/servicios", (req, res) => {
  db.query("SELECT * FROM servicios", (err, results) => {
    if (err) return res.status(500).json({ error: err })
    res.json(results)
  })
})

app.get("/ordenes", (req, res) => {
  const sql = `
    SELECT 
      o.id_orden,
      v.placa,
      v.marca,
      v.modelo,
      s.nombre AS servicio,
      o.descripcion_trabajo,
      o.estado,
      o.total_aprobado,
      o.fecha
    FROM ordenes_servicio o
    INNER JOIN vehiculos v ON o.id_vehiculo = v.id_vehiculo
    INNER JOIN servicios s ON o.id_servicio = s.id_servicio
    ORDER BY o.id_orden DESC
  `

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err })
    res.json(results)
  })
})