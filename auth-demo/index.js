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
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
            <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a><span style="white-space: pre">   </span><a href="/register">Register</a><br><br>
            <p>Home Page works!</p>
        `)
})

app.get('/register', (req, res) => {
    req.session.hello = Date.now();

    res.send(`
            <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a><span style="white-space: pre">   </span><a href="/register">Register</a><br><br>
            
            <form action="/register" method="post">
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
                    <button type="submit">Register</button>
                </div>
            </form>
        `);
    res.end();
});


const registeredUsers = {};


app.post('/register', async (req, res) => {

    const salt = await bcrypt.genSalt(10);

    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Plain password :', password);
    console.log('Salt           :', salt);
    console.log('Hashed password:', hashedPassword);
    
    registeredUsers[username] = hashedPassword;

    res.redirect('/login')
})

app.listen('5000', () => 'The server is listening on port 5000...')