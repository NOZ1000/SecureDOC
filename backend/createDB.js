const sqlite3 = require('sqlite3').verbose();

// Open a new SQLite database file
const db = new sqlite3.Database('secureDOC.db');

// Create users table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `);

  // Create documents table
  db.run(`
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY,
      owner_email TEXT NOT NULL,
      content TEXT NOT NULL,
      token TEXT
    )
  `);

  // insert into documents table first row
  db.run(`
    INSERT INTO documents (owner_email, content, token) VALUES ('admin@nrzctf.kz', 'nrzCTF{1d0r_w1th_jwt_0r4cl3}', 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEifQ.QHw8qxcaJjhfMR7Dkcl-DLkuUngfTdj9pmoWQPH3CMg')
  `);
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Database creation completed.');
  }
});
