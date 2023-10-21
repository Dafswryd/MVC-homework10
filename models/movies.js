const express = require('express');
const router = express.Router();
const pool = require('../config/queries.js');

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