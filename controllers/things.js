const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');

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

module.exports = router;