const {v4: uuid} = require('uuid');
const bcrypt = require('bcrypt');

const User = require('../models/user.js');

class AuthServiceError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

class AuthService {

    constructor(container) {
        this.userModel = container.get(User);
    }

    async signUp(user) {
        const {email, password, firstName, lastName} = user;
        try {
            const password_hash = await bcrypt.hash(password, 10);
            await this.userModel.create(
                {
                    uuid: uuid(),
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password_hash
                });
        } catch (e) {

            switch (e.name) {
                case 'SequelizeUniqueConstraintError':
                    throw new AuthServiceError('User already exists', 'USER_EXISTS');
                default:
                    throw new AuthServiceError('Database error', 'DATABASE_ERROR');
            }
        }
    }


    async signIn(email, password) {
        let result;
        try {
            result = await this.userModel.findOne({
                where : {
                    email
                }
            });
        } catch (e) {
            console.error(e);
            throw new AuthServiceError('Database error', 'DATABASE_ERROR');
        }

        if(result && await bcrypt.compare(password, result.password_hash)) {
            return result.uuid;
        }
        else {
            throw new AuthServiceError('Invalid password', 'INVALID_CREDENTIALS');
        }
    }

}

AuthService.USER_EXISTS = 'USER_EXISTS';

module.exports = {
    AuthService,
    AuthServiceError
};