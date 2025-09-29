const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";



// middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Invalid token format' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, username }
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

// USERS
// Регистрация
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, created_at',
      [username, hashedPassword]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') { 
      res.status(400).json({ error: "Username already taken" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});
// Логн
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = rows[0];

    if (!user) return res.status(400).json({ error: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid username or password' });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// NOTES
// Получить заметки авторизованного пользователя
router.get('/notes', authMiddleware, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM notes WHERE user_id = $1',
      [req.user.id],
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//создать
router.post('/notes', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
      [req.user.id, title, content],
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//Обновить
router.put('/notes/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const { rows } = await pool.query(
      `UPDATE notes 
       SET title = $1, content = $2 
       WHERE id = $3 AND user_id = $4 
       RETURNING *`,
      [title, content, id, req.user.id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Note not found or not yours" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//Удалить
router.delete('/notes/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      `DELETE FROM notes 
       WHERE id = $1 AND user_id = $2 
       RETURNING *`,
      [id, req.user.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Note not found or not yours" });
    }
    res.json({ message: "Note deleted", note: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
