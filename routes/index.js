const homeRouter = require('./home');


function route(app) {
  //write URL here
  
  app.use('/', homeRouter);
}

module.exports = route;
