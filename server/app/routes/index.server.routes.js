// Load the 'index' controller
const index = require('../controllers/index.server.controller');

// Define the routes module' method
module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index', {
            info: "see the results in console window"
        })
    });

    app.post('/run', index.trainAndPredict);

};
