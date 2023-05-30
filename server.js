// Import necessary packages
const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection'); // Sequelize database connection
const routes = require('./controllers'); // Import API routes
const exphbs = require('express-handlebars'); // Import Handlebars
const helpers = require('./utils/helpers'); //import utils/helpers functions
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '/public'))); // Serve static files from the 'public' directory

const SequelizeStore = require('connect-session-sequelize')(session.Store);

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

const hbs = exphbs.create({ helpers });

// Set up Handlebars.js engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add routes, both API and home
app.use(routes);

// Start server after DB connection
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  });