var mysql = require('mysql');

var error = '<html> \
	<head>	\
		<title>GPS Information</title>	\
	</head>	\
	<body>	\
		<h2>Error!</h2> \
		<h3>Usage</h3>	\
		<table border="1">	\
			<thead>	\
				<tr>	\
					<td>URL</td>	\
					<td>Example</td>	\
				</tr>	\
			</thead>	\
			<tr>	\
				<td>/gps/imei</td>	\
				<td>/gps/0358911020149114</td>	\
			</tr>	\
			<tr>	\
				<td>/gps/imei/start/finish</td>	\
				<td>/gps/0358911020149114/2015-12-18 15:57:50/2015-12-18 16:09:40<br>Timestamp as year-month-date hh:mm:ss</td>	\
			</tr>	\
		</table>	\
	</body>	\
</html>';

exports.findById = function(req,res){

	var conn = mysql.createConnection({

	host 		: "mysql.truckjee.com",
	user 		: "theyounuscom",
	password	: "NLch-*iL",
	database 	: "gps_database_younus",

	});
	conn.connect();
	var record = [];
	var imei = req.params.id;
	// console.log(imei);
	conn.query('SELECT * from `'+imei+'` ORDER BY `id` DESC LIMIT 1',function(err,results){
		if(err){
			res.send(error)
		} 
		record.push({
			id 		: results[0].id,
			imei	: results[0].imei,
			lat		: results[0].lat,
			long	: results[0].long,
			speed	: results[0].speed,
			course	: results[0].course,
			mcc		: results[0].mcc,
			mnc		: results[0].mnc,
			lac		: results[0].lac,
			cell_id	: results[0].cell_id,
			server_time : results[0].server_time.toString()
		});
		res.send(record);
	});

	conn.end();
};

exports.findBetweenTimeStamps = function(req,res){

	var conn = mysql.createConnection({

	host 		: "mysql.theyounus.com",
	user 		: "theyounuscom",
	password	: "NLch-*iL",
	database 	: "gps_database_younus",
	});
	conn.connect();
	var imei 	= req.params.id;
	var start 	= req.params.start;
	var finish 	= req.params.finish;

	// res.send(imei + " "+start+ " "+finish);
	conn.query('SELECT * from `'+imei+'` WHERE `server_time` BETWEEN '+mysql.escape(start)+' AND '+mysql.escape(finish)+'', function(err,results){
		if(err){
			res.send(error);
		}
		res.send(results);
	});
}