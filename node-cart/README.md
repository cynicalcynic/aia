
# Node.js store

A small express online store. EJS is utilized as a rendering engine. Products are stored in a SQLite database and a server-side file-based session is used to store a user's cart.

The database is automatically created after installation, it can also be reset by making a GET request to `/reset`.

## Install
```
npm install
```
## Start
```
npm run start
```