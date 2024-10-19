import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res. send('The app works');
    res.end();
})

app.listen(5000, () => console.log('The server is running on port 5000!'))