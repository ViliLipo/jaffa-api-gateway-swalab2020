const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const { secret } = require('../utils/config.js');

loginRouter.post('/', async (request, response) => {
  const { body } = request;
  const { username, password } = body;
  const [user] = await User.findAll({ where: { username } });
  console.log(user);
  if (user) {
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (passwordCorrect) {
      console.log('passwordmatch');
      const userForToken = {
        username,
        id: user.id,
      };
      const token = jwt.sign(userForToken, secret);
      response.status(200).send({ token, username });
    } else {
      response.status(401).send({ error: 'Invalid password' });
    }
  } else {
    response.status(401).send({ error: 'Invalid username' });
  }
});

module.exports = loginRouter;
