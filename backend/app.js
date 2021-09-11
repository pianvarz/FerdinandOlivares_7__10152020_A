const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const path = require('path')

const userRoutes = require('./src/routes/user')
const postRoutes = require('./src/routes/post')

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

db.sequelize.sync() //Confirming MySQL Connection
.then(() => console.log('Database connected!'))
.catch(error => console.log(error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/auth', userRoutes)
app.use('/api/posts', postRoutes)

module.exports = app;