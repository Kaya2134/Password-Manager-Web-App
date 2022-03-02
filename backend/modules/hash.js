const bcrypt = require('bcrypt');

let saltRounds = 5


const hash = (password) => {
    let hash = bcrypt.hashSync(password, saltRounds);

    return hash;
};

const checkhash = (password, hash) => {
    let result = bcrypt.compareSync(password, hash);

    return result;
};


exports.hash = hash;
exports.checkhash = checkhash;

