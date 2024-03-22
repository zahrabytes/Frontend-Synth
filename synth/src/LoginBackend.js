const express = require('express');
const app = express();
//const bcrypt = require('bcrypt');

//app.use(express.json());

const users = [];

// Endpoint to get all users (for testing purposes)
app.get('/users', (req, res) => {
  res.json(users);
});

// Endpoint for user signup
app.post('/users', async (req, res) => {
  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user object with hashed password
    const user = { name: req.body.name, email: req.body.email, password: hashedPassword };

    // Push the user object to the users array
    users.push(user);

    res.status(201).send(); // Send success response
  } catch {
    res.status(500).send(); // Send error response
  }
});

// Endpoint for user login
app.post('/users/login', async (req, res) => {
  // Find the user by email
  const user = users.find(user => user.email === req.body.email);
  
  // If user not found, send error response
  if (!user) {
    return res.status(400).send('Cannot find user');
  }

  try {
    // Compare the provided password with the hashed password
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success'); // Send success response
    } else {
      res.send('Not Allowed'); // Send failure response
    }
  } catch {
    res.status(500).send(); // Send error response
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
