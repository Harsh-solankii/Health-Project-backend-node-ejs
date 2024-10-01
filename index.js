const express = require('express');
const app = express();
const port = 3087;
const dotenv = require('dotenv');
var bodyParser = require('body-parser');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');


const server = app.listen(port);

dotenv.config();

app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static('public'));
app.use(router);






