const express = require('express');
const app = express();
const port = 3000;
const basicAuth = require('basic-auth-connect');

// Set up basic authentication middleware
const auth = basicAuth('admin', '123456');

app.use(auth); // Protect all routes with basic authentication

// A simple blocking function that simulates CPU usage.
const blockingFunction = (duration) => {
    const end = Date.now() + duration;
    while (Date.now() < end) {
        // This will block the event loop for `duration` milliseconds,
        // simulating heavy CPU usage.
    }
};

app.get('/', (req, res) => {
    const text = "Welcome to Load CPU and Memory APP /load/cpu , load/memory, load/both and load/cpu?duration=5000 . ";
    res.send(text);
});

app.get('/load/cpu', (req, res) => {
    const duration = parseInt(req.query.duration, 10);

    // Simulate CPU load
    blockingFunction(duration);

    res.send(`Simulated a CPU load for ${duration} milliseconds.`);
});

app.get('/load/memory', (req, res) => {
    const memory = parseInt(req.query.memory, 10);

    // Simulate memory usage
    const buffer = Buffer.alloc(memory * 1024 * 1024); // Allocates 'memory' MB of RAM

    res.send(`Used ${memory} MB of memory.`);
});

app.get('/load/both', (req, res) => {
    const duration = parseInt(req.query.duration, 10);
    const memory = parseInt(req.query.memory, 10);

    // Simulate CPU load
    blockingFunction(duration);

    // Simulate memory usage
    const buffer = Buffer.alloc(memory * 1024 * 1024); // Allocates 'memory' MB of RAM

    res.send(`Simulated a CPU load for ${duration} milliseconds and used ${memory} MB of memory.`);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
