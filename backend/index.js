import cors from "cors";
import mysql from "mysql2";
import express from "express";
/*
const {Storage} = require('@google-cloud/storage');
require('dotenv').config();

const projectId = process.env.PROJECT_ID;
const keyFilename = process.env.KEYFILENAME;
const storage = new Storage({projectId, keyFilename});

async function uploadFile(bucketName, file, fileOutputName){
    try{
        const bucket = storage.bucket(bucketName);
        const ret = await bucket.upload(file,{
            destination:fileOutputName
        })
        return ret;
    }catch(error){
        console.error('Error:', error);        
    }
}

async function generateLink(file_name, song_id){
    //const file_name = 'Cherry Waves.mp3';
    //const song_id = 'examplesongid.mp3';
    const ret = await uploadFile(process.env.BUCKET_NAME, file_name, song_id);
    const link = "https://storage.googleapis.com/bucket-tester-2/" + song_id;
    console.log(link);
}
*/

const app = express();

app.use(express.json());

//Middleware for CORS
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

/*
// initial song posting helper
app.post('/post-song', async (req, res) => {

});
*/

// create Account - 1st endpoint (user picks either artist or listener account and is take to the correct signup page)
app.post('/createAccount', async (req, res) => {
    try {
        // Extract the userType from the request body
        const { userType } = req.body;

        // Check if the userType is valid
        if (userType !== 'artist' && userType !== 'listener') {
            return res.status(400).json({ error: 'Invalid user type' });
        }

        // Redirect to the appropriate sign-up page based on the userType
        if (userType === 'artist') {
            // Redirect to artist sign-up page
            return res.redirect('/createAccount/artist');
        } else if (userType === 'listener') {
            // Redirect to listener sign-up page
            return res.redirect('/createAccount/listener');
        }
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Error creating user' });
    }
});

// create account end point - user fills out information (based on the userType)
app.post('/createAccount/:userType', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userType = req.params.userType; // Accessing userType from URL parameter
        let requiredFields;

        // Define required fields based on user type
        if (userType === 'artist') {
            requiredFields = ['fname', 'lname', 'artistName', 'email', 'password', 'DoB'];
        } 
        else if (userType === 'listener') {
            requiredFields = ['fname', 'lname', 'email', 'username', 'password', 'DoB', 'profilePic'];
        } 
        else {
            return res.status(400).json({ error: 'Invalid user type' });
        }

        // Check if the email exists in any of the tables
        let query = `SELECT * FROM listener WHERE email = ?`;
        db.query(query, [email], async (error, results, fields) => {
            if (error) {
                console.error('Error retrieving listener data:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // If not found in listener table, check the admin table
            query = `SELECT * FROM admin WHERE email = ?`;
            db.query(query, [email], async (error, results, fields) => {
                if (error) {
                    console.error('Error retrieving admin data:', error);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                if (results.length > 0) {
                    return res.status(400).json({ error: 'Email already exists' });
                }

                // If not found in admin table, check the artist table
                query = `SELECT * FROM artist WHERE email = ?`;
                db.query(query, [email], async (error, results, fields) => {
                    if (error) {
                        console.error('Error retrieving artist data:', error);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    if (results.length > 0) {
                        return res.status(400).json({ error: 'Email already exists' });
                    }

                    // If not found in any table, check additional fields
                    if (userType === 'artist') {
                        // Check if artistName exists in the artist table
                        query = `SELECT * FROM artist WHERE artistName = ?`;
                    } 
                    else if (userType === 'listener') {
                        // Check if username exists in the listener table
                        query = `SELECT * FROM listener WHERE username = ?`;
                    }

                    db.query(query, [req.body.artistName || req.body.username], async (error, results, fields) => {
                        if (error) {
                            console.error('Error retrieving data:', error);
                            return res.status(500).json({ error: 'Internal server error' });
                        }

                        if (results.length > 0) {
                            return res.status(400).json({ error: userType === 'artist' ? 'Artist name already exists' : 'Username already exists' });
                        }

                        // If not found in any table, create the account
                        const insertQuery = `INSERT INTO ${userType} (${requiredFields.join(',')}) VALUES (${requiredFields.map(() => '?').join(',')})`;
                        const values = requiredFields.map(field => req.body[field]);

                        db.query(insertQuery, values, (error, results, fields) => {
                            if (error) {
                                console.error('Error creating user:', error);
                                return res.status(500).json({ error: 'Error creating user' });
                            }
                            console.log('User created successfully');
                            return res.status(201).json({ message: 'User created successfully' });
                        });
                    });
                });
            });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error creating user' });
    }
});

app.post('/listener-login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let query = `SELECT * FROM listener WHERE email = ? AND BINARY password = ?`;
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
            console.log('Invalid credentials');
            return res.status(401).json({ error: 'Invalid credentials' });
        });
    } 
    catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/artist-login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let query = `SELECT * FROM artist WHERE email = ? AND BINARY password = ?`;
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
            console.log('Invalid credentials');
            return res.status(401).json({ error: 'Invalid credentials' });
        });
    } 
    catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/admin-login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let query = `SELECT * FROM admin WHERE email = ? AND BINARY password = ?`;
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
            console.log('Invalid credentials');
            return res.status(401).json({ error: 'Invalid credentials' });
        });
    } 
    catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Code to post an album ? it's not
app.post('/album', async (req, res) => {
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
        } 
        else if (userType === 'listener') {
            requiredFields = ['DoB', 'email', 'fname', 'lname', 'password', 'username'];
        } 
        else {
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

// Album Display /////////////////////////////////////////////////////////////////////////
// fetching songs
async function fetchSongsForAlbum(albumID) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT songTitle, filePath, songDuration
            FROM song
            WHERE albumID = ?
        `;
        db.query(query, [albumID], (err, results) => {
            if (err) {
                console.error('Error searching songs:', err);
                reject(err); // Reject the promise with the error
            } else {
                resolve(results); // Resolve the promise with the query results
            }
        });
    });
}

// view album
app.get('/view-album/:albumID', async (req, res) =>{
    // Get the album ID from the URL
    const albumID = req.params.albumID;

    try {
        // Define query to search for album
        const query = `
            SELECT A.albumName, A.releaseDate, A.cover , ART.artistName, ART.genre, ART.profilePic
            FROM album as A, artist as ART
            WHERE A.albumID = ? AND ART.artistID = A.artistID
        `;
        
        // Execute album query
        const [albumResults] = await db.promise().query(query, [albumID]);

        if (albumResults.length === 0) {
            res.status(404).json({ error: 'Album not found' });
            return;
        }

        // Fetch songs for the album
        const songs = await fetchSongsForAlbum(albumID);

        // Combine album details and songs into a single response
        const albumWithSongs = {
            album: albumResults[0],
            songs: songs
        };

        res.json(albumWithSongs);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

// End of Album Display //////////////////////////////////////////////////////////////////

// Search Page Backend ///////////////////////////////////////////////////////////////////
app.get('/search-song', async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const query = `
        SELECT DISTINCT S.songTitle, ART.artistName
        FROM song AS S
        JOIN album AS A ON S.albumID = A.albumID
        JOIN artist AS ART ON A.artistID = ART.artistID
        WHERE (S.songTitle LIKE '%${searchTerm}%'
                OR ART.artistName LIKE '%${searchTerm}%');
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
        SELECT DISTINCT A.albumName, A.cover, ART.artistName
        FROM album AS A
        JOIN artist AS ART ON A.artistID = ART.artistID
        WHERE (A.albumName LIKE '%${searchTerm}%' 
                OR ART.genre LIKE '%${searchTerm}%' 
                OR ART.artistName LIKE '%${searchTerm}%');
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

app.get('/search-artist', async (req, res) => {
    const searchTerm = req.query.searchTerm;
    const query = `
        SELECT DISTINCT ART.artistName, ART.profilePic
        FROM song AS S
        JOIN album AS A ON S.albumID = A.albumID
        JOIN artist AS ART ON A.artistID = ART.artistID
        WHERE S.songTitle LIKE '%${searchTerm}%' 
        OR A.albumName LIKE '%${searchTerm}%'
        OR ART.genre LIKE '%${searchTerm}%' 
        OR ART.artistName LIKE '%${searchTerm}%';
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error searching songs:', err);
            res.status(500).json({ error: 'Internal server error' });
        } 
            res.json(results);
    });
});

// End Search Page Backend ///////////////////////////////////////////////////////////////////

//Admin flags
app.post('/flag-song', (req, res) => {
    const { songId } = req.body;
  
    // Increment flag count of the song in the database
    db.query('UPDATE songs SET flag_count = flag_count + 1 WHERE id = ?', [songId], (err, result) => {
      if (err) {
        console.error('Error flagging song:', err);
        res.status(500).json({ error: 'Error flagging song' });
      } else {
        res.status(200).json({ message: 'Song flagged successfully' });
      }
    });
  });


  //handle admin actions (e.g., delete song, reject report)
app.post('/admin/actions/delete-song', (req, res) => {
    const songId = req.body.songId;
    // Perform necessary actions to delete the song from the database
    db.query('DELETE FROM songs WHERE id = ?', [songId], (err, result) => {
        if (err) {
            console.error('Error deleting song:', err);
            res.status(500).json({ error: 'Failed to delete song' });
        } else {
            // Remove the deleted song from the flagged songs data structure
            flaggedSongs = flaggedSongs.filter(song => song.id !== songId);
            res.status(200).json({ message: 'Song deleted successfully' });
        }
    });
});

// Endpoint to handle rejecting a report
app.post('/admin/actions/reject-report', (req, res) => {
    const songId = req.body.songId;
    // Remove the song from the flagged songs data structure
    flaggedSongs = flaggedSongs.filter(song => song.id !== songId);
    res.status(200).json({ message: 'Report rejected successfully' });
});

// Main page
app.get("/", (req, res) => {
    res.json("This is the main page");
});

// Start the server
app.listen(8800, () => {
    console.log("Connected to backend!");
});