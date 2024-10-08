import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const app = express();
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    cookie: { sequre: true }
}))
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
            <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a><span style="white-space: pre">   </span><a href="/register">Register</a><span style="white-space: pre">   </span><a href="/profile">Profile</a><br><br>
            <h2>Home Page works!</h2>
        `)
})

app.get('/register', (req, res) => {
    req.session.hello = Date.now();

    res.send(`
            <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a><span style="white-space: pre">   </span><a href="/register">Register</a><span style="white-space: pre">   </span><a href="/profile">Profile</a><br><br>
            <h2>Register</h2>
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

const registeredUsers = {
    'sand@sand.com': '$2b$10$nekwXIVjl5tkuZpa8ZSP7.uHijeu3OxBe1jkqRqzU3Kxw1YT.C/9a',
};

app.post('/register', async (req, res) => {

    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    registeredUsers[email] = hashedPassword;
    console.log(registeredUsers);
    res.redirect('/login')
})

app.get('/login', (req, res) => {

    res.send(`
            <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a><span style="white-space: pre">   </span><a href="/register">Register</a><span style="white-space: pre">   </span><a href="/profile">Profile</a><br><br>
            <h2>Login</h2>
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
        `)
    res.end();
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!registeredUsers[email]) {
        return res.status(400).end();
    }

    const plainPassword = password;
    const hashedPassword = registeredUsers[email];

    const compared = await bcrypt.compare(password, hashedPassword)

    // Return jwt on sucessfull authentication
    const payload = {
        email,
        role: 'Admin'
    };

    const jwtToken = jwt.sign(payload, 'SECRET', { expiresIn: '1h' });
    res.cookie('auth', jwtToken);
    
    if (compared) {
        return res.redirect('/profile');

    } else {
        return res.send(`
            <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a><span style="white-space: pre">   </span><a href="/register">Register</a><span style="white-space: pre">   </span><a href="/profile">Profile</a><br><br>
            <h2>Invalid email or password</h2>
            `).end()
    }
})

app.get('/profile', async (req, res) => {
    
    // Authenticate the user
    const jwtToken = req.cookies['auth'];

    if (!jwtToken) {
        res.status(401).send(`
            <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a><span style="white-space: pre">   </span><a href="/register">Register</a><span style="white-space: pre">   </span><a href="/profile">Profile</a><br><br>
            <h1>UNAUTHORIZED</h1>
            `).end();
    } else {
        const decodedToken =  jwt.verify(jwtToken, 'SECRET',)
        res.send(`
            <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a><span style="white-space: pre">   </span><a href="/register">Register</a><span style="white-space: pre">   </span><a href="/profile">Profile</a><br><br>
            ${jwtToken}
            ${decodedToken}
            `).end();

    }
})

app.listen('5000', () => 'The server is listening on port 5000...')