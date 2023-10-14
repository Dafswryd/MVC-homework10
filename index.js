const express = require('express');
const app = express();
const pool = require('./queries.js');
const things = require('./things.js');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./things.js').swaggerJSDoc;
const port = 3000;

app.use(express.json());

app.use('/things', things);

// Middleware untuk menampilkan dokumentasi Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

pool.connect((err, client) => {
  if (err) {
    console.error('Database Error', err);
    return;
  }
  console.log('Database berhasil disambungkan');
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
