const express = require('express');
const app = express();
const pool = require('./config/queries.js');
const things = require('./controllers/things.js');
const usersRouter = require('./models/users.js');
const moviesRouter = require('./models/movies.js');
const uploadRouter = require('./models/upload.js');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const port = 3000;
const morgan = require('morgan');

app.use(morgan('common'));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Express API With Swagger",
      version: '0.1.0',
      description: 'This is a simple CRUD API application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      }
    ]
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJSDoc(options);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(express.json());

app.use('/', uploadRouter);
app.use('/things', things);
app.use('/', usersRouter);
app.use('/', moviesRouter);

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
