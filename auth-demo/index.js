import express from 'express';
import session from 'express-session';


const app = express();
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    cookie: {sequre: true}
}))

app.get('/', (req, res) => {
    
    console.log(req.session);
    console.log(req.session.hello)
    console.log(req.session.id)
    
    res.send(`
            <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a>
            <p>Home Page works!</p>
        `)
})

app.get('/login', (req, res) => {

    req.session.hello = Date.now();
    
    res.send(`
            <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a>
            <p>Login Page works!</p>
        `);
        
    res.end();

})

app.listen('5000', () => 'The server is listening on port 5000...')