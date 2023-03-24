const http = require('http');
const fs = require('fs');
const { default: axios } = require('axios');

//Did not add dotenv to gitignore because it is Only for demo purpose
require('dotenv').config()

const file = fs.readFileSync('index.html');


const server = http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.url == '/') {
        res.end(file);
    } else if (req.method == "POST" && req.url == '/api') {
        req.on('data', function (data) {
            const city = data.toString().toLowerCase().split('=')[1];
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
           
            async function makeRequest() {
                try{
                    const response = await axios.get(url);
                    const {lat, lon} = response.data.coord;
                    console.log(lat, lon);
                    
                    const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
                    const response2 = await axios.get(url2);
                    console.log(response2.data);
                    res.end(JSON.stringify(response2.data));
                } catch (error) {
                    console.log(error);
                    res.end(JSON.stringify(error));
                }
            }

            makeRequest();

        });
    } else {
        res.end('404 Not Found');
    }

});

server.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

