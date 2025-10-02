require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cors = require("cors");
const pool = require('./db');

const app = express();
app.use(express.json());


app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174"], 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

// ожидание старта базы
async function waitForDb(retries = 10, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.query('SELECT 1');
      console.log('Connected to Postgres');
      return true;
    } catch (err) {
      console.log(`DB not ready (attempt ${i+1}/${retries}) - ${err.message}`);
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  throw new Error('Could not connect to Postgres');
}

// автоматическое создание таблиц
async function initTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Tables checked/created");
  } catch (err) {
    console.error("Error creating tables:", err.message);
    throw err;
  }
}

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true, db: true });
  } catch (err) {
    res.status(500).json({ ok: false, db: false, error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Notes backend running');
});

// Запуск
(async () => {
  try {
    await waitForDb(15, 1000);
    await initTables();  
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
})();
