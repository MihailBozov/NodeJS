import express from 'express';


const app = express();
app.get('/', (req, res) => {
    res.send(`
            <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a>
            <p>Home Page works!</p>
        `)
})

app.get('/login', (req, res) => {
    
    //Read cookie
    const cookie =  req.header('Cookie')
    console.log(cookie);
    
    // Set cookie
    res.setHeader('Set-Cookie', 'isAuthenticated=true');
    
    res.send(`
            <span style="white-space: pre">      </span><a href="/">Home<\a><span style="white-space: pre">   </span><a href="/login">Login</a>
            <p>Login Page works!</p>
        `);
        
    res.end();

})

app.listen('5000', () => 'The server is listening on port 5000...')