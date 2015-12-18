module.exports = function(app){

	var gpsData = require('./controllers/gpsData');
	app.get('/gps/:id', gpsData.findById);
	app.get('/gps/:id/:start/:finish',gpsData.findBetweenTimeStamps);
}