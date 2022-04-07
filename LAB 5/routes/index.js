const userRoutes = require('./userApi');

const constructorMethod = (app) => {
  app.use('/', userRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Enter a valid url' });
  });
};

module.exports = constructorMethod;