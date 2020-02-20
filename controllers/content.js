const contentRouter = require('express').Router();
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const { secret } = require('../utils/config.js');

const APIURL = 'http://localhost:3001/api/content';

contentRouter.get('/', async (request, response) => {
  try {
    const subresponse = await fetch(APIURL, { method: 'GET' });
    const jsonData = await subresponse.json();
    console.log(jsonData);
    response.status(subresponse.status).json(jsonData);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

const handleToken = (token) => {
  if (!token) {
    return false;
  }
  const decodedToken = jwt.verify(token, secret);
  console.log(decodedToken);
  const { username, id } = decodedToken;
  if (!username || !id) {
    return false;
  }
  return { username, id };
};

contentRouter.post('/', async (request, response) => {
  try {
    const { body } = request;
    const { token } = body;
    const isTokenOk = handleToken(token);
    if (!isTokenOk) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }
    const { username, id } = isTokenOk;
    const subresponse = await fetch(APIURL, {
      method: 'POST',
      body: JSON.stringify({ ...body, username, userId: id }),
      headers: { 'Content-Type': 'application/json' },
    });
    const jsonData = await subresponse.json();
    return response.status(subresponse.status).json(jsonData);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = contentRouter;
