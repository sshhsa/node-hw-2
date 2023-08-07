const express = require('express');

const app = express();
app.use(express.urlencoded({ extented: true }));

const HOSTNAME = '127.0.0.1';
const PORT = 8000;
const TIMEOUT = 4000;

const contacts = {
  alex: {
    name: 'Alex',
    age: 17,
    city: Mykolayv,
  },
  bill: {
    name: 'Bill',
    age: 20,
    city: 'Kyiv',
  },
  linda: {
    name: 'Linda',
    age: 30,
    city: 'Odessa',
  },
};

app.get('/', (req, res, next) => {
  console.log('GET /');
  res.setHeader('Content-type', 'text/html');
  res.statusCode = 200;
  res.end(`
    <form action="/login" method="POST">
        <label for="email">Email<label/>
        <input type="text" name="email" id="email"/>
        <label for="password">Password<label/>
        <input type="text" name="password" id="password"/>
        <button type="submit">
            Sign in
        <button/>
    <form/>
    `);
});

app.get('/contacts', (req, res) => {
  console.log('GET /ontacts');
  res.json(contacts);
});

app.use((req, res, next) => {
  console.time('Middleware execution...');
  console.log('Middleware starting');
  setTimeout(() => {
    console.log('Middleware finished!');
    console.timeEnd('Middleware execution...');
    next();
  }, TIMEOUT);
});

app.get('/hello', (req, res) => {
  console.log('GET /hello');
  res.send('Hello universe!');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(`Email: ${email}, Password: ${password}`);
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Express app is running at ${HOSTNAME}:${PORT}`);
});
