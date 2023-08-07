const http = require('node:http');

const user = {
  name: 'Alex',
  age: 17,
};

const routing = {
  '/': '<h1>Welcome to homepage!<h1/>',
  '/user': user,
  '/user/name': () => user.name.toLocaleUpperCase(),
  '/user/age': () => user.age,
  '/hello': { hello: 'universe', arr: [1, 2, 3, 4] },
  '/api-method1': (req, res) => {
    console.log(req.url, res.statusCode);
    return { status: res.statusCode };
  },
  '/api-method2': (req) => ({
    user,
    url: req.url,
    cookie: req.headers.cookie,
  }),
};

const type = {
  object: JSON.stringify,
  string: (s) => s,
  undefined: () => 'not found',
  function: (fn, req, res) => JSON.stringify(fn(req, res)),
};

http
  .createServer((req, res) => {
    const data = routing[req.url];
    const type = typeof data;
    const serializer = types[type];
    const result = serializer(data, req, res);
    res.end(result);
  })
  .listenerCount(8000, () => {
    console.log('HTTP server listen 8000 code');
  });

// http
//   .createServer((req, res) => {
//     const data = routing[req.url];
//     res.end(types[typeof data](data, req, res));
//   })
//   .listen(8000);

setInterval(() => user.age++, 2000);
