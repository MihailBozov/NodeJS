import express from 'express';
import session from 'express-session';
import bcrypt from 'bcrypt';


const app = express();
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    cookie: { sequre: true }
}))

app.get('/', (req, res) => {
    res.send(`
            <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a>
            <p>Home Page works!</p>
        `)
})

app.get('/login', (req, res) => {
    req.session.hello = Date.now();

    res.send(`
            <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a><br><br>
            
            <form action="/login" method="post">
                <div>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div>
                    <br>
                    <button type="submit">Login</button>
                </div>
            </form>
        `);

    // res.send(`
    //         <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a>
    //         <p>Login Page works!</p>
    //     `);

    res.end();
});

app.post('/login', (req, res) => {
    
    console.log(req.body);
})

app.listen('5000', () => 'The server is listening on port 5000...')