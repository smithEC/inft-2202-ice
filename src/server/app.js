import express from 'express';
import myDefaultRouter from './routes/router.js';
import animalsRouter from './routes/animals.js';

console.log("A better http server");

// Create the server
const PORT = 3000;
const app = express();

// Configure routes
app.use('/api', myDefaultRouter);
app.use('/api', animalsRouter);

app.use('*', (req, res, next) => {
    res.status(404);
    res.json({ error: 'Page not found' });
});

// Setup global error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
    res.json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
