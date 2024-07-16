const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('secureDOC.db');

const app = express();
app.use(cors());
app.use(express.json());

const secretKey = 'a4c25ec40bc575e35ec8eabe6f21296196ace172889170f5632af46e889b8bb1';

function createUser(email, password) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], function(err) {
        if (err) {
            reject(err.message);
        } else {
            resolve(this.lastID); // Return the ID of the newly inserted user
        }
        });
    });
}

function getUserByEmail(email, password) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(row); // Return the user object
            }
        });
    });
}

function getDocumentsByOwnerEmail(owner_email) {
    return new Promise((resolve, reject) => {
        db.all('SELECT id, token FROM documents WHERE owner_email = ?', [owner_email], (err, rows) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(rows); // Return the documents array
            }
        });
    });
}

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Email and password fields are required' });
        return;
    }

    if (email == 'admin@nrzctf.kz') {
        res.status(400).json({ error: 'You can not register as admin' });
        return;
    }

    createUser(email, password)

    const token = jwt.sign({ id: email }, secretKey, { noTimestamp: true });

    res.json({ token });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    getUserByEmail(email, password)
    .then(user => {
        if (!user) {
            res.status(401).json({ error: 'Invalid email or password' });
        } else {
            const token = jwt.sign({ id: user.email }, secretKey, { noTimestamp: true });
            res.json({ token });
        } 
    })
});

app.get('/documents', (req, res) => {
    const token = req.headers.authorization;
    let owner_email = '';

    jwt.verify(token, secretKey, { noTimestamp: true }, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }
        owner_email = decoded.id;

        getDocumentsByOwnerEmail(owner_email)
        .then(documents => {
            res.json(documents);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    });
});

app.get('/document/:token', (req, res) => {
    const { token } = req.params;

    // verify the token

    jwt.verify(token, secretKey, { noTimestamp: true }, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }
        const documentId = decoded.id;

        db.get('SELECT id, content FROM documents WHERE id = ?', [documentId], (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else if (!row) {
                res.status(404).json({ error: 'Document not found' });
            } else {
                res.json(row);
            }
        });
    });
});

app.post('/create/document', (req, res) => {
    const token = req.headers.authorization;
    let owner_email = '';

    jwt.verify(token, secretKey, { noTimestamp: true }, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }
        owner_email = decoded.id;

        const { content } = req.body;

        // Check if content is provided and not empty
        if (!content || content.trim() === '') {
            res.status(400).json({ error: 'Content is required' });
            return;
        }

        db.run('INSERT INTO documents (owner_email, content) VALUES (?, ?)', [owner_email, content], function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                const documentId = this.lastID;
                const documentToken = jwt.sign({ id: documentId }, secretKey, { noTimestamp: true });
                db.run('UPDATE documents SET token = ? WHERE id = ?', [documentToken, documentId], function(err) {
                    if (err) {
                        res.status(500).json({ error: err.message });
                    } else {
                        res.json({ id: documentId, token: documentToken });
                    }
                });
            }
        });
    });
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});