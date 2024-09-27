import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import routes from './routes.js';


// const express = require('express');
// const handlebars = require('express-handlebars');
// const path = require('path');


const app = express();
const port = 5000;

app.engine('hbs', handlebars.engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');
app.set('views', path.join('src', 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(routes);


app.listen(port, () => {
    console.log(`My app is running on port ${port} ...`);
});
