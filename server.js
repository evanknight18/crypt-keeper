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