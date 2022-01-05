const homeRouter = require('./home');
const registerRouter = require('./register');

function route(app) {
  //write URL here
  app.use('/', homeRouter);
  app.use('/register', registerRouter);
}

module.exports = route;
