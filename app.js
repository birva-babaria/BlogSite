require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const connectDB = require('./server/config/db')

const app = express();
const PORT = 5000 || process.env.PORT;

//Connect to DB
connectDB();

app.use(express.static('public'));

//Templating engine (ejs-embeddedJS is a popular template engine which allows users to generate HTML with JS)
app.use(expressLayout);
app.set('layout', './layouts/main'); //Default layout file for the application
app.set('view engine', 'ejs'); //To let the app know we are using ejs as rendering files instead of HTML

app.use('/', require('./server/routes/main'));

app.listen(PORT, () => console.log(`Hey Birva, Server running on http://localhost:${PORT}`));