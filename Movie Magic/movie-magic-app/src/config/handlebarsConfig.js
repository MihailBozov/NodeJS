import handlebars from 'express-handlebars';
import path from 'path';

export default  function handlebarsConfig(app) {
    app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
    app.set('view engine', 'hbs');
    app.set('views', path.join('src', 'views'));
}
