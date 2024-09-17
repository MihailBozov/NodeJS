const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();
const port = 5000;

app.engine('hbs', handlebars.engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); 

app.get('/', (req, res) => {
    res.render('home', {layout: false})
    res.send('Home Page');
});

app.listen(port, () => {
    console.log(`My app is running on port ${port} ...`);
});
