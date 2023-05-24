// Import necessary packages
const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection'); // Sequelize database connection
const routes = require('./controllers'); // Import API routes
const exphbs = require('express-handlebars'); // Import Handlebars

const app = express();
const PORT = process.env.PORT || 3001;