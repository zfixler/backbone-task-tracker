const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
let db = require('./tasks.json');

const app = express();

app.use(express.json());

const PORT = 3333;

// Start server
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`, server.address().port);
});

// Create task
app.post('/tasks', async (req, res) => {
  try {
    req.body.id = uuidv4();
    req.body.dateCreated = new Date().toISOString();
    req.body.dateUpdated = new Date().toISOString();

    db.push(req.body);
    fs.writeFileSync('./tasks.json', JSON.stringify(db, null, 4));

    res.json(req.body);
  } catch {
    res.status(500).end();
  }
});

// Update task
app.put('/tasks/:id', async (req, res) => {
  try {
    const entry = db.find((x) => x.id.toString() === req.body.id.toString());

    req.body.dateUpdated = new Date().toISOString();

    Object.assign(entry, req.body);
    fs.writeFileSync('./tasks.json', JSON.stringify(db, null, 4));

    res.json(req.body);
  } catch {
    res.status(500).end();
  }
});

// Delete task
app.delete('/tasks/:id', async (req, res) => {
  try {
    db = db.filter((x) => x.id.toString() !== req.params.id.toString());
    fs.writeFileSync('./tasks.json', JSON.stringify(db, null, 4));
    res.status(200);
  } catch {
    res.status(500).end();
  }
});

// Fetch all tasks
app.get('/tasks', async (req, res) => {
  try {
    res.json(db);
  } catch {
    res.status(500).end();
  }
});

// Close server
server.on('close', () => {
  server.close(() => {
    process.exit(0);
  });
});
