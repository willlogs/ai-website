// mongoose requirments
const mongoose = require('mongoose');
const cors = require('cors');

const pass = encodeURIComponent('#p4s5#();');
const localDB = 'mongodb://127.0.0.1:27017/test'
const siteDB = `mongodb://mamatosen:${pass}@185.81.96.80/admin`;

const curDBURI = localDB;

// requiring models
const User = require('./models/userModel');

// Establishing mongoose connection
mongoose.connect(curDBURI, { useNewUrlParser: true })
  .then(result => {
    console.log('successfully connected to mongodb');
  })
  .catch(err => {
    console.log(err);
});

// express app requirment
const express = require('express');
const session = require('express-session');

// express app init
const app = express();
app.disable('x-powered-on');

// setting up helmet
const helmet = require('helmet');
app.use(helmet());

// setting up parsers
const parser = require('body-parser');
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// setting up session coockies
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: curDBURI,
  collection: 'sessions',
});

app.use(
  session({
    name: "sessions-name",
    secret: "!@#$%^FGGF@#$%^CGF@#$",
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV == "production"
    },
    store: store
  })
);

// routing
const apiRouter = require('./routes/apiRouter');
const regRouter = require('./routes/regRouter');
const loginRouter = require('./routes/loginRouter');

app.use('/api', apiRouter);
app.use('/register', regRouter);
app.use('/login', loginRouter);
app.use(cors())

// put up the express app
app.listen(3001, (res) => {
  console.log("up on port 3001!");
});