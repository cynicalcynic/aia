const UserModel = require('../models/User.js');
const bcrypt = require('bcrypt');

class EmailTakenError extends Error {
    constructor(msg) {
        super(msg);
    }
}

class DatabaseError extends Error {
    constructor(msg, reason) {
        super(msg);
        this.reason = reason;
    }

}

class AuthService {

    constructor() {

    }

    async signUp(userData) {
        const hash = bcrypt.hashSync(userData.password, 10);
        try {
            const userRecord = await UserModel.create({
                ...userData,
                passwordHash : hash
            });
            return userRecord;
        }
        catch(err) {
            if(err.code === 11000){
                throw new EmailTakenError('Database write failed');
            }
            else {
                throw new DatabaseError('Database write failed', err);
            }
        }
    }

    async signIn(email, password) {

    }
}


module.exports = {AuthService, EmailTakenError, DatabaseError};