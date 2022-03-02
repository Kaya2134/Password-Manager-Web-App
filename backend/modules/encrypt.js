const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

const encrypt = (password) => {
	let iv = Buffer.from(crypto.randomBytes(16));
	let key = Buffer.from(crypto.randomBytes(32));
	let chiper = crypto.createCipheriv(algorithm, key, iv);

	let e_password = chiper.update(password, 'utf-8', 'hex');
	e_password += chiper.final('hex');

	return {
		iv: iv.toString('hex'),
		key: key.toString('hex'),
		encrypted: e_password,
	};
};

const decrypt = (e_password) => {
	let iv = Buffer.from(e_password.iv, 'hex');
	let key = Buffer.from(e_password.key, 'hex');
	let dechiper = crypto.createDecipheriv(algorithm, key, iv);

	let password = dechiper.update(e_password.encrypted, 'hex', 'utf8');
	password += dechiper.final('utf-8');

	return password;
};

module.exports = { encrypt, decrypt };
