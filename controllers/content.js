const contentRouter = require('express').Router();
const fetch = require('node-fetch');

const APIURL = 'http://localhost:3001/api/content';

contentRouter.get('/', async (request, response) => {
  try {
    const subresponse = await fetch(APIURL, { method: 'GET', headers: request.headers });
    const jsonData = await subresponse.json();
    response.status(subresponse.status).json(jsonData);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

contentRouter.post('/', async (request, response) => {
  try {
    const requestData = request.body;
    const subresponse = await fetch(APIURL, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: request.headers,
    });
    const jsonData = await subresponse.json();
    response.status(subresponse.status).json(jsonData);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = contentRouter;
