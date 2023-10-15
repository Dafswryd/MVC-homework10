const express = require('express');
const router = express.Router();
const pool = require('./queries.js');
const jwt = require('jsonwebtoken');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const secretKey = 'rahasiapalingaman';

// Middleware verifikasi token
const verifikasiToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Token tidak ditemukan' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token tidak valid' });
    }
};

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Express API With Swagger",
            version: '0.1.0',
            description: 'This is a simple CRUD API application made with Express and documented with Swagger',
        },
    },
    apis: ['./things.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    swaggerSpec,
  };

// Definisi rute Swagger
router.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Routing Register
router.post('/register', (req, res) => {
    const { id, email, gender, password, role } = req.body;

    if (!email || !gender || !password || !role) {
        return res.status(400).json({ error: 'Semua bidang harus diisi' });
    }

    pool.query('INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5)', [id, email, gender, password, role], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan saat mendaftarkan pengguna' });
        }

        res.status(201).json({ message: 'Registrasi berhasil', id, email, gender, role });
    });
});

// Routing Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email dan password harus diisi' });
    }

    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan saat proses login' });
        }

        if (result.rowCount === 1) {
            const user = result.rows[0];
            const token = jwt.sign({ email, id: user.id }, secretKey, { expiresIn: '1h' });
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ error: 'Login gagal. Cek kembali email dan password Anda.' });
        }
    });
});

// Router untuk yang menggunakan token
router.use(verifikasiToken);

// Routing Delete User
router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ error: 'ID pengguna harus diberikan' });
    }

    pool.query('DELETE FROM users WHERE id = $1', [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan saat menghapus pengguna' });
        }

        if (result.rowCount === 1) {
            return res.status(200).json({ message: 'Pengguna berhasil dihapus' });
        } else {
            return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
        }
    });
});

// Routing Put User
router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { email, gender, password, role } = req.body;

    if (!userId || !email || !gender || !password || !role) {
        return res.status(400).json({ error: 'ID pengguna dan semua bidang harus diisi' });
    }

    pool.query('UPDATE users SET email = $1, gender = $2, password = $3, role = $4 WHERE id = $5', [email, gender, password, role, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan saat memperbarui pengguna' });
        }

        if (result.rowCount === 1) {
            return res.status(200).json({ message: 'Pengguna berhasil diperbarui' });
        } else {
            return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
        }
    });
});

// Routing Get Semua Users Dengan Masing - Masing Page 10 Data
router.get('/users', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const offset = (page - 1) * limit;

    const sql = 'SELECT * FROM users OFFSET $1 LIMIT $2';
    const values = [offset, limit];

    pool.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data pengguna' });
        }
        res.json(result.rows);
    });
});

// Routing Get Semua Films
router.get('/movies', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const offset = (page - 1) * limit;

    const sql = 'SELECT * FROM movies OFFSET $1 LIMIT $2';
    const values = [offset, limit];

    pool.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data film' });
        }
        res.json(result.rows);
    });
});

module.exports = router;
