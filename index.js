const express = require('express');
const bodyParser = require('body-parser');
const contentRouter = require('./controllers/content.js');
const loginRouter = require('./controllers/login.js');
const userRouter = require('./controllers/user.js');
const database = require('./models/database.js');


const allowCORS = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
};


const app = express();
app.use(allowCORS);
app.use(bodyParser.json());
app.use('/api/content', contentRouter);
app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);
const port = 3005;


database
  .authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
