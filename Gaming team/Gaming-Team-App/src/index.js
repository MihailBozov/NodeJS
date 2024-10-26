import routes from './routes.js'
import express from 'express';
import handlebars from 'express-handlebars';

const app = express();
app.engine('hbs', handlebars.engine({ extname: 'hbs',  }));

app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(routes)

app.listen(3000);
