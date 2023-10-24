const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pool = require('../config/queries.js');

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: diskStorage });

router.put(
    "/movies/:id/upload",
    upload.single("photo"),
    (req, res) => {

        const movieId = req.params.id;
  
      if (!req.file) {
        return res.status(400).send({
          status: false,
          data: "No file is selected",
        });
      }
  
      const filePath = req.file.path;
      console.log("File path:", filePath);
  
      const query = 'UPDATE movies SET photo = $1 WHERE id = $2';
      const values = [filePath, movieId];
  
      pool.query(query, values, (err, result) => {
        if (err) {
          console.error('Error updating photo in the database', err);
          return res.status(500).send({
            status: false,
            data: "Error updating photo in the database",
          });
        }
  
        res.send({
          status: true,
          data: "Photo uploaded successfully",
        });
      });
    }
  );
  
module.exports = router;
