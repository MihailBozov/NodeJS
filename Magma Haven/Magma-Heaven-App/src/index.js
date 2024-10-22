import routes from './routes.js'
import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';


const app = express();

const url = 'mongodb://localhost:27017';
await mongoose.connect(url, { dbName: 'magma-heaven' })  //TODO change the name
        .then(() => console.log(`Connected to ${url}`))
        .catch((err) => console.log);


app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('views', 'src/views');
app.set('view engine', 'hbs')

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(routes);




app.listen(3000, () => console.log('The server is running on port 3000!'))