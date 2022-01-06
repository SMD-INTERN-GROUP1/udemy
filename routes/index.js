const homeRouter = require('./home');
const courseDetailRoute = require('./courses_detail');

function route(app) {
  //write URL here
  app.use('/course', courseDetailRoute);
  app.use('/', homeRouter);
}

module.exports = route;
