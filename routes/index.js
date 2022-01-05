const homeRouter = require('./home');
const usersRouter = require('./users');
const authRouter = require('./auth.route');

function route(app) {
  //write URL here
  
  app.use('/', homeRouter);
  app.use('/users', usersRouter);
  app.use('/auth', authRouter);
}

module.exports = route;
