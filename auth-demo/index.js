import express from 'express';
import cookieParser from 'cookie-parser';


const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send(`
            <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a>
            <p>Home Page works!</p>
        `)
})

app.get('/login', (req, res) => {
    
    //Read cookie
    const cookie =  req.cookies;
    const cookieValue = req.cookies['isAuthenticated'];
    console.log(cookie);
    console.log(cookieValue);
    
    // Set cookie
    res.cookie('isAuthenticated', 'true');
    res.cookie('How are you', 'fine');
    
    res.send(`
            <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a>
            <p>Login Page works!</p>
        `);
        
    res.end();

})

app.listen('5000', () => 'The server is listening on port 5000...')