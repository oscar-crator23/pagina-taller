// routes/registro.js
import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { nombre_completo, correo, nombre_usuario, contrasena } = req.body;

  if (!nombre_completo || !correo || !nombre_usuario || !contrasena) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre_completo, correo, nombre_usuario, contrasena) VALUES (?, ?, ?, ?)',
      [nombre_completo, correo, nombre_usuario, contrasena]
    );

    res.status(201).json({ message: 'Usuario registrado con éxito', id: result.insertId });
  } catch (err) {
    console.error(' Error al registrar el usuario:', err);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

export default router;
