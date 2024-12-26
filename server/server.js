const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

db.getConnection((err) => {
	if (err) {
		console.error('Error connecting to the database:', err.message);
	} else {
		console.log('Successfully connected to the database.');
	}
});

app.get('/users', (req, res) => {
	const query = 'SELECT * FROM users';
	db.query(query, (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: 'Error fetching users.' });
		}
		res.status(200).json(results);
	});
});

app.post('/users', (req, res) => {
	const { name, email } = req.body;
	if (!name || !email) {
		return res.status(400).json({ error: 'Name and email are required.' });
	}

	const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
	db.query(query, [name, email], (err) => {
		if (err) {
			if (err.code === 'ER_DUP_ENTRY') {
				return res.status(409).json({ error: 'Email already registered.' });
			}
			console.error(err);
			return res.status(500).json({ error: 'Error adding user.' });
		}
		res.status(201).json({ message: 'User added successfully.' });
	});
});

app.put('/users/:id', (req, res) => {
	const { id } = req.params;
	const { name, email } = req.body;

	const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
	db.query(query, [name, email, id], (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: 'Error updating user.' });
		}
		if (results.affectedRows === 0) {
			return res.status(404).json({ error: 'User not found.' });
		}
		res.status(200).json({ message: 'User updated successfully.' });
	});
});

app.delete('/users/:id', (req, res) => {
	const { id } = req.params;

	const query = 'DELETE FROM users WHERE id = ?';
	db.query(query, [id], (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: 'Error deleting user.' });
		}
		if (results.affectedRows === 0) {
			return res.status(404).json({ error: 'User not found.' });
		}
		res.status(200).json({ message: 'User deleted successfully.' });
	});
});

app.get('/users/:id', (req, res) => {
	const { id } = req.params;

	const query = 'SELECT * FROM users WHERE id = ?';
	db.query(query, [id], (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: 'Error fetching user.' });
		}
		if (results.length === 0) {
			return res.status(404).json({ error: 'User not found.' });
		}
		res.status(200).json(results[0]);
	});
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
