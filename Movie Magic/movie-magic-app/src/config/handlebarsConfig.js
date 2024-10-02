import handlebars from 'express-handlebars';
import path from 'path';

export default function handlebarsConfig(app) {
    app.engine('hbs', handlebars.engine({ 
        extname: 'hbs',
        helpers: {
            rating: renderRating
        }
    }));
    app.set('view engine', 'hbs');
    app.set('views', path.join('src', 'views'));
}


function renderRating (rating) {
    console.log(rating);
    if (isNaN(rating)) {
        return 'n/a';
    }
    return '&#x2605; '.repeat(Math.round(rating / 2));
}
