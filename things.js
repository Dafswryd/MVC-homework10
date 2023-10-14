const express = require('express');
const router = express.Router();
const pool = require('./queries.js');
const jwt = require('jsonwebtoken');

const secretKey = 'rahasiapalingaman';

// Middleware untuk verifikasi token login
const verifyLoginToken = (req, res, next) => {
    const token = req.header('Authorization');

    // Periksa apakah token ada
    if (!token) {
        return res.status(401).json({ error: 'Token tidak ditemukan' });
    }

    try {
        // Verifikasi token
        const decoded = jwt.verify(token, secretKey); // Gantilah 'your-secret-key' dengan kunci rahasia yang sesuai

        // Token valid, Anda dapat mengakses data dalam 'decoded'
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token tidak valid' });
    }
};

router.post('/register', (req, res) => {
    const { id, email, gender, password, role } = req.body;

    // Validasi data yang diterima
    if (!email || !gender || !password || !role) {
        return res.status(400).json({ error: 'Semua bidang harus diisi' });
    }

    // Jalankan pernyataan SQL untuk menambahkan data pengguna dengan id yang disediakan
    pool.query('INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5)', [id, email, gender, password, role], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan saat mendaftarkan pengguna' });
        }

        // Data pengguna berhasil ditambahkan
        res.status(201).json({ message: 'Registrasi berhasil', id, email, gender, role });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validasi data yang diterima
    if (!email || !password) {
        return res.status(400).json({ error: 'Email dan password harus diisi' });
    }

    // Periksa kecocokan email dan password dengan database
    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan saat proses login' });
        }

        // Jika login berhasil, buat token akses dan kirimkan ke klien
        if (result.rowCount === 1) {
            const user = result.rows[0];
            return res.status(200).json({ id: user.id, email: user.email });
        } else {
            return res.status(401).json({ error: 'Login gagal. Cek kembali email dan password Anda.' });
        }
    });
});

router.get('/users', (req, res) => {
    pool.query('SELECT * FROM users', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data pengguna' });
        }
        res.json(result.rows);
    });
});

// Tambahkan endpoint lainnya di sini

module.exports = router;
