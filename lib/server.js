'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const sighnUpRouter = require('../routs/signup');
const sighnInRouter = require('../routs/signin');
const usersList = require('../routs/users');
const handler_404 = require('../middleware/error404');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


app.use(sighnUpRouter);
app.use(sighnInRouter);
app.use(usersList);
app.get('*', handler_404);


module.exports = {
  server: app,
  start: () => {
    const PORT = process.env.PORT || 3030;
    app.listen(PORT, () => { console.log(`listining on PORT ${PORT}`); });
  },
};