import jwt from "jsonwebtoken";
// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});
 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  if (req.method === 'POST') {
    const { username, password } = req.body;

    connection.connect(async (error) => {
      if (error) {
        console.error('Error connecting to database:', error.message);
        return res.status(500).json({ message: 'Failed to connect to database' });
      }

      const sql = 'SELECT * FROM tbl_users WHERE username = ? AND password = ?';
     
      try {
        const results = await new Promise((resolve, reject) => {
          connection.query(sql, [username, password], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
        });

        if (results.length > 0) {
          console.log("Hello")
          return res.status(200).json({ status: 'ok', message: 'Login successful', user: results });
        } else {
          console.log("Please keep login")
          return res.status(401).json({ message: 'Invalid credentials' });
        }
      } catch (error) {
        console.error('Error retrieving user:', error.message);
        return res.status(500).json({ message: 'Failed to retrieve user' });
      } finally {
        connection.end();
      }
    });
  }
}