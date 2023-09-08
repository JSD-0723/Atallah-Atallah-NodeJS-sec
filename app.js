const express = require('express');
const app = express();
const path = require('path');
const books = require('./routes/books')

// Pug view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/books', books)

app.use((req, res) => {
  res.status(404).send('404: Resource Not Found');
});

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`);
});
