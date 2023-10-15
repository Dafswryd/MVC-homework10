/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided information.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               email:
 *                 type: string
 *               gender:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

// Routing Register
router.post('/register', (req, res) => {
    // ... (kode untuk rute register)
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate a user
 *     description: Authenticate a user using email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
// Routing Login
router.post('/login', (req, res) => {
    // ... (kode untuk rute login)
});
  
  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Delete or update a user
   *     description: Delete or update a user by their ID.
   *     tags:
   *       - Users
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: User ID to delete or update
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: User deleted or updated successfully
   *       400:
   *         description: Bad request
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  router.delete('/users/:id', (req, res) => {
    // ... (kode untuk rute delete or update user)
  });
  
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get a list of users with pagination
   *     description: Get a list of users with pagination.
   *     tags:
   *       - Users
   *     parameters:
   *       - in: query
   *         name: page
   *         required: false
   *         description: "Page number for pagination (default: 1)"
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: List of users retrieved successfully
   *       400:
   *         description: Bad request
   *       500:
   *         description: Internal server error
   */
  router.get('/users', (req, res) => {
    // ... (kode untuk rute get all users)
  });
  /**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update a user's information by their ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to update
 *         schema:
 *           type: integer
 *       - in: body
 *         name: user
 *         required: true
 *         description: User information to update
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             gender:
 *               type: string
 *             password:
 *               type: string
 *             role:
 *               type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               gender:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/users/:id', (req, res) => {
    // ... (kode untuk rute update user)
  });
  
  
  /**
   * @swagger
   * /movies:
   *   get:
   *     summary: Get a list of movies with pagination
   *     description: Get a list of movies with pagination.
   *     tags:
   *       - Movies
   *     parameters:
   *       - in: query
   *         name: page
   *         required: false
   *         description: "Page number for pagination (default: 1)"
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: List of movies retrieved successfully
   *       400:
   *         description: Bad request
   *       500:
   *         description: Internal server error
   */
  router.get('/movies', (req, res) => {
    // ... (kode untuk rute get all movies)
  });
  
  // Anda dapat melanjutkan dengan menambahkan dokumentasi untuk rute-rute lainnya
  