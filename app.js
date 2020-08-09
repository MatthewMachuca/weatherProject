const express = require('express');
const https = require('https');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
	const querey = 'https://api.openweathermap.org/data/2.5/weather?q=';
	const city = req.body.cityName;
	const apiKey = '1a687b8d1dc5ae7636358ae1c5cff9b5';
	const units = 'imperial';

	const url = `${querey}${city}&appid=${apiKey}&units=${units}`;

	https.get(url, function(response) {
		response.on('data', function(data) {
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const weatherDescription = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

			res.write(`<p>The weather is currently ${weatherDescription} </p>`);
			res.write(`<h1>The tempreature in ${city} is currently ${temp} degrees Farenheight.</h1>`);
			res.write(`<img src="${imageURL}">`);
			res.send();
		});
	});
});

app.listen(3000, function() {
	console.log('server on 3000');
});

// const querey = 'https://api.openweathermap.org/data/2.5/weather?q=';
// 	const city = 'manteca,california';
// 	const apiKey = '1a687b8d1dc5ae7636358ae1c5cff9b5';
// 	const units = 'imperial';

// 	const url = `${querey}${city}&appid=${apiKey}&units=${units}`;

// 	https.get(url, function(response) {
// 		response.on('data', function(data) {
// 			const weatherData = JSON.parse(data);
// 			const temp = weatherData.main.temp;
// 			const weatherDescription = weatherData.weather[0].description;
// 			const icon = weatherData.weather[0].icon;
// 			const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

// 			res.write(`<p>The weather is currently ${weatherDescription} </p>`);
// 			res.write(`<h1>The tempreature in ${city} is currently ${temp} degrees Farenheight.</h1>`);
// 			res.write(`<img src="${imageURL}">`);
// 			res.send();
// });
