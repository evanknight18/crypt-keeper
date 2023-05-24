// Import necessary packages
const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection'); // Sequelize database connection
const routes = require('./controllers'); // Import API routes
const exphbs = require('express-handlebars'); // Import Handlebars

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions with Sequelize
const sess = {
    secret: process.env.SESS_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(session(sess));

// Set up Handlebars.js engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

// Add routes, both API and view
app.use(routes);

// Start server after DB connection
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  });