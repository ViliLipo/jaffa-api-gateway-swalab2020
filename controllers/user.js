const { hash } = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user.js');

userRouter.post('/', async (request, response) => {
  try {
    const { body } = request;
    console.log(body);
    const { username, password } = body;
    const matchingUsers = await User.findAll({ where: { username } });
    if (matchingUsers.length > 0) {
      response.status(400).json({ error: 'Username must be unique' });
      return;
    }
    if (password.length < 8) {
      response.status(400).json({ error: 'Password needs to be atleast 8 characters long' });
      return;
    }
    const saltRounds = 10;
    const passwordHash = await hash(password, saltRounds);
    const user = await User.create({ username, passwordHash });
    console.log(user.getJsonRepresentation());
    response.status(200).json(user.getJsonRepresentation());
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server mishap' });
  }
});

module.exports = userRouter;
