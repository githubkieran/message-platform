const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors());

//mddleware to parse json bodies
app.use(bodyParser.json());

//connect to SQLite database
const dbPath = path.join(__dirname, 'msgdb.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

app.get('/', (req, res) => {
    res.send("Backend is live!");
});

//POST route to handle messages
app.post('/api/messages', (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Invalid text' });
    }

    const timeStamp = new Date().toISOString(); // Store in ISO format
    const query = `INSERT INTO messages (content, timestamp) VALUES (?, ?)`;
    db.run(query, [text, timeStamp], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({ message: 'Message posted successfully', id: this.lastID });
    });
});

//GET route to retrieve all messages
app.get('/api/messages', (req, res) => {
    const query = 'SELECT * FROM messages ORDER BY timestamp DESC';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

const deleteOldMessages = () => {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000).toISOString(); //need to convert to local
    const deleteQuery = 'DELETE FROM messages WHERE timestamp < ?';

    db.run(deleteQuery, [oneMinuteAgo], function (err) {
        if (err) {
            console.error('Error deleting old messages:', err.message);
        } else {
            console.log(`Deleted ${this.changes} message(s) older than 60 seconds.`);
        }
    });
};

//check for messages after every 10secs
setInterval(deleteOldMessages, 10 * 1000); //sec, milisec

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
