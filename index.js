// var express = require('express');
// var app = express();
// var pool = require('./queries.js');
// var things = require('./things.js');

// app.use(express.json());

// app.use('/things', things);


// pool.connect((err, res) => {
//     console.log(err);
//     console.log('connected');
// })

// app.listen(3000);

var express = require('express');
var app = express();
var pool = require('./queries.js');
var things = require('./things.js');
const port = 3000;

app.use(express.json());

app.use('/things', things);

pool.connect((err, client) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
