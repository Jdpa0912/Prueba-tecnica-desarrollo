const bcrypt = require('bcrypt');
const hashFromDB = '$2b$10$4u0QqDwZ0F7u0PZx3S5uq.FWgXQOzUqOjNv5NqEfYhO0sZjKbVqve'; // pega el hash real
const password = 'demo123';
bcrypt.compare(password, hashFromDB).then(result => console.log('Match:', result));