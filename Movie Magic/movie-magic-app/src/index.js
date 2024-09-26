import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';


// const express = require('express');
// const handlebars = require('express-handlebars');
// const path = require('path');


const app = express();
const port = 5000;

app.engine('hbs', handlebars.engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');
app.set('views', path.join('src', 'views')); 

app.use(express.static('public'))
 
app.get('/', (req, res) => {
    res.render('home', {'layout': false})
});

app.listen(port, () => {
    console.log(`My app is running on port ${port} ...`);
});
