import express from "express";
import mysql from "mysql2";
import cors from 'cors'


const app = express();
app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

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


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Retrieve user from listener table
        let query = `SELECT * FROM listener WHERE email = ? AND password = ?`;
        db.query(query, [email, password], (error, results, fields) => {
            if (error) {
                console.error('Error retrieving listener data:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (results.length > 0) {
                const user = results[0];
                console.log('Login successful (Listener):', user);
                return res.status(200).json({ message: 'Login successful', user });
            }

            // If not found in listener table, try admin table
            query = `SELECT * FROM admin WHERE email = ? AND password = ?`;
            db.query(query, [email, password], (error, results, fields) => {
                if (error) {
                    console.error('Error retrieving admin data:', error);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                if (results.length > 0) {
                    const user = results[0];
                    console.log('Login successful (Admin):', user);
                    return res.status(200).json({ message: 'Login successful', user });
                }

                // If not found in admin table, try artist table
                query = `SELECT * FROM artist WHERE email = ? AND password = ?`;
                db.query(query, [email, password], (error, results, fields) => {
                    if (error) {
                        console.error('Error retrieving artist data:', error);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    if (results.length > 0) {
                        const user = results[0];
                        console.log('Login successful (Artist):', user);
                        return res.status(200).json({ message: 'Login successful', user });
                    }

                    // If not found in any table, return invalid credentials
                    console.log('Invalid credentials');
                    return res.status(401).json({ error: 'Invalid credentials' });
                });
            });
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});




app.get("/albums", (req, res)=> {
    const q = "SELECT * FROM album;"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//Uploading Albums
app.post("/albums", (req, res)=>{
    const q = "INSERT INTO album (`artistName`, `albumName`, `genre`, `releaseDate`, `cover`) VALUES (?)"
    const values = [req.body.artistName, req.body.albumName, req.body.genre, req.body.releaseDate, req.body.cover]

    db.query(q, [values], (err, data)=>{
        if (err) return res.json(err)
        return res.json("Album added successfully!")
    })
})

//Updating Albums
app.put("/albums/:id", (req, res)=>{
    const albumId = req.params.id;
    const q = "UPDATE album SET `artistName` = ?, `albumName` = ?, `genre` = ?, `releaseDate` = ?, `cover` = ? WHERE albumID = ?"
    const values = [req.body.artistName, req.body.albumName, req.body.genre, req.body.releaseDate, req.body.cover]

    db.query(q, [...values, albumId], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Album has updated successfully!")
    })
})

//Deleting Albums
app.delete("/albums/:id", (req, res)=>{
    const albumId = req.params.id;
    const q = "DELETE FROM album WHERE albumID = ?"

    db.query(q, [albumId], (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// Main page
app.get("/", (req, res) => {
    res.json("This is the main page");
});

// Start the server
app.listen(8800, () => {
    console.log("Connected to backend!");
});
