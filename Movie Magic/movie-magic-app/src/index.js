import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import routes from './routes.js';
import handlebarsConfig from './config/handlebarsConfig.js';
import expressConfig from './config/expressConfig.js';
import mongooseConfig from './config/mongooseConfig.js';


const app = express();
const port = 5000;

mongooseConfig();
expressConfig(app);
handlebarsConfig(app);

app.use(routes);

app.listen(port, () => {
    console.log(`My app is running on port ${port} ...`);
});
