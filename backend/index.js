const hash = require('./modules/hash');
const pw = require('./modules/encrypt');

const mysql = require('mysql2');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

var db = mysql.createConnection({
	host: '',
	user: '',
	password: '',
	database: '',
	rowsAsArray: true,
});

app.post('/auth', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	if (username && password) {
		db.query(
			'SELECT password FROM users WHERE `username` = ?',
			[username],
			function (err, result) {
				if (err) throw err;
				if (result.length === 0) {
					res.send({ auth: false });
				}
				let hashed_password = result[0][0];
				if (hash.checkhash(password, hashed_password)) {
					res.send({ auth: true });
				} else {
					res.send({ auth: false });
				}
			},
		);
	}
});

app.get('/getlist', (req, res) => {
	db.query('SELECT * from passwords', function (err, result) {
		if (err) throw err;
		res.send(result);
	});

	/* 
        index 0 : id
        index 1 : iv
        index 2 : key
        index 3 : encrypted
        index 4 : username
        index 5 : title
    */
});

app.post('/decrypt', (req, res) => {
	let decrypted_password = pw.decrypt(req.body);
	res.send(decrypted_password);
});

app.post('/add', (req, res) => {
	let { title, username, password } = req.body;
	let encrypted_password = pw.encrypt(password);

	db.query(
		'INSERT INTO passwords(title,username,`iv`,`key`,`encrypted`) VALUES (?, ?, ?, ?, ?)',
		[
			title,
			username,
			encrypted_password.iv,
			encrypted_password.key,
			encrypted_password.encrypted,
		],
		function (err, result) {
			if (err) throw err;
			res.sendStatus(200);
		},
	);
});

app.post('/delete', (req, res) => {
	let id = req.body.id;

	db.query(
		'DELETE FROM passwords WHERE id = ?',
		[id],
		function (err, result) {
			res.sendStatus(200);
		},
	);
});

app.listen(3001, () => {
	console.log('Server is running on http://localhost:3001/');
});
