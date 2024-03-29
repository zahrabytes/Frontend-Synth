import express from "express";
import mysql from "mysql2";
import cors from 'cors';

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for CORS
app.use(cors());

// Connection to database
const db = mysql.createConnection({
    host: "database-group-12.cxyime46mesp.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "mysqlpass",
    database: "coogtunes",
    port: "3306"
});

// Logger middleware
function logger(req, res, next) {
    console.log('Log');
    next();
}

// Endpoint for user creation
app.post('/users/:userType', async (req, res) => {
    try {
        const userType = req.params.userType;
        let requiredFields;

        // Define required fields based on user type
        if (userType === 'artist') {
            requiredFields = ['fname', 'lname', 'artistName', 'email', 'password', 'DoB'];
        } else if (userType === 'listener') {
            requiredFields = ['DoB', 'email', 'fname', 'lname', 'password', 'username'];
        } else {
            return res.status(400).json({ error: 'Invalid user type' });
        }

        if (userType === 'listener') {
            requiredFields = ['fname', 'lname', 'artistName', 'email', 'password', 'DoB'];
        } else if (userType === 'listener') {
            requiredFields = ['DoB', 'email', 'fname', 'lname', 'password', 'username'];
        } else {
            return res.status(400).json({ error: 'Invalid user type' });
        }

        // Check if email already exists
        const emailExistsQuery = `SELECT COUNT(*) as count FROM ${userType} WHERE email = ?`;
        const emailExistsResult = await db.promise().query(emailExistsQuery, [req.body.email]);
        const emailExists = emailExistsResult[0][0].count > 0;
        if (emailExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Insert user into the database
        const query = `INSERT INTO ${userType} (${requiredFields.join(',')}) VALUES (${requiredFields.map(() => '?').join(',')})`;
        const values = requiredFields.map(field => req.body[field]);

        db.query(query, values, (error, results, fields) => {
            if (error) {
                console.error('Error inserting data:', error);
                return res.status(500).json({ error: 'Error creating user' });
            }
            console.log('User inserted successfully');
            return res.status(201).json({ message: 'User created successfully' });
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error creating user' });
    }
});


app.post('/login/:userType', async (req, res) => {
    try {
        const userType = req.params.userType;
        if (userType !== 'artist' && userType !== 'listener') {
            return res.status(400).json({ error: 'Invalid user type' });
        }

        const { email, password } = req.body;

        // Retrieve user from the appropriate table based on user type
        const query = `SELECT * FROM ${userType} WHERE email = ? AND password = ?`;
        db.query(query, [email, password], (error, results, fields) => {
            if (error) {
                console.error('Error retrieving user data:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (results.length === 0) {
                // User with the provided email and password combination does not exist
                console.log('Invalid credentials');
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const user = results[0];
            console.log('Login successful:', user);
            res.status(200).json({ message: 'Login successful', user });
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Code to post an album
app.post('/album', async (req, res) => {
    try {
        const userType = req.params.userType;
        let requiredFields;

        requiredFields = ['albumName', 'genre', 'releaseDate', 'cover'];
        
        /*
        // Define required fields based on user type
        if (userType === 'artist') {
            requiredFields = ['albumName', 'genre', 'releaseDate', 'cover'];
        } else {
            return res.status(400).json({ error: 'Invalid user type' });
        }
        */

        // Check if album already exists for this artist

        /*
        const album = `SELECT artistName FROM ${userType} WHERE email = ?`;
        const emailExistsResult = await db.promise().query(emailExistsQuery, [req.body.email]);
        const emailExists = emailExistsResult[0][0].count > 0;
        if (emailExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }*/

        // Insert user into the database
        const query = `INSERT INTO album (${requiredFields.join(',')}) VALUES (${requiredFields.map(() => '?').join(',')})`;
        const values = requiredFields.map(field => req.body[field]);

        db.query(query, values, (error, results, fields) => {
            if (error) {
                console.error('Error inserting data:', error);
                return res.status(500).json({ error: 'Error creating album' });
            }
            console.log('Album inserted successfully');
            return res.status(201).json({ message: 'Album created successfully' });
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error creating album' });
    }
});

app.get('/search-song', async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const query = `
        SELECT DISTINCT S.songTitle, ART.artistName
        FROM song AS S
        JOIN album AS A ON S.albumID = A.albumID
        JOIN artist AS ART ON A.artistID = ART.artistID
        WHERE (S.songTitle LIKE '%${searchTerm}%'
                OR ART.artistName LIKE '%${searchTerm}%')
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error searching songs:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
});

app.get('/search-album', async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const query = `
    SELECT DISTINCT A.albumName, ART.artistName
    FROM album AS A
    JOIN artist AS ART ON A.artistID = ART.artistID
    WHERE (A.albumName LIKE '%${searchTerm}%'
            OR ART.genre LIKE '%${searchTerm}%'
            OR ART.artistName LIKE '%${searchTerm}%')
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error searching album:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
});

app.get('/search-artist', async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const query = `
    SELECT DISTINCT ART.artistName
    FROM song AS S
    JOIN album AS A ON S.albumID = A.albumID
    JOIN artist AS ART ON A.artistID = ART.artistID
    WHERE (S.songTitle LIKE '%${searchTerm}%' 
            OR ART.artistName LIKE '%${searchTerm}%'
            OR A.albumName LIKE '%${searchTerm}%')
    
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error searching album:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
});

// Main page
app.get("/", (req, res) => {
    res.json("This is the main page");
});

// Start the server
app.listen(8800, () => {
    console.log("Connected to backend!");
});
