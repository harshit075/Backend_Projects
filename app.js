// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize the Express app
const app = express();
const port = 3000;

// --- Data Store ---
// For this simple app, we'll use an in-memory array.
// In a real-world app, you would use a database (e.g., MongoDB, PostgreSQL).
let todos = [
    { id: 1, task: "Learn Node.js" },
    { id: 2, task: "Build a To-Do App" },
    { id: 3, task: "Deploy the app" }
];
let nextId = 4; // To generate unique IDs for new tasks

// --- Middleware ---
// Set EJS as the templating engine
app.set('view engine', 'ejs');
// Point Express to the 'views' directory
app.set('views', path.join(__dirname, 'views'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// --- Routes ---

// GET / -> Display all to-do items
app.get('/', (req, res) => {
    // Render the 'index.ejs' file and pass the 'todos' array to it
    res.render('index', { todos: todos });
});

// POST /add -> Add a new to-do item
app.post('/add', (req, res) => {
    const newTask = req.body.task.trim(); // Get task from form body and remove whitespace
    if (newTask) { // Ensure the task is not empty
        todos.push({ id: nextId++, task: newTask });
    }
    // Redirect back to the homepage to see the updated list
    res.redirect('/');
});

// POST /delete/:id -> Delete a to-do item
app.post('/delete/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id, 10); // Get the ID from the URL
    // Filter the array to keep only the items that don't match the ID
    todos = todos.filter(todo => todo.id !== idToDelete);
    // Redirect back to the homepage
    res.redirect('/');
});

// --- Start the Server ---
app.listen(port, () => {
    console.log(`To-Do app server listening at http://localhost:${port}`);
});