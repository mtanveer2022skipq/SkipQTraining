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
            
            //used fetch in the first and axios in the 2nd project
            axios.get(url)
                .then((response) => {
                    const {lat, lon} = response.data.coord;
                    console.log(lat, lon);
                    
                    const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
                    axios.get(url2)
                        .then((response) => {
                            console.log(response.data);
                            res.end(JSON.stringify(response.data));
                            
                            /*
                                *Ultraviolet index is Deprecated in the free version of the API
                                *So I commented out the code for the 3rd API call
                                *It is included in the subscription version of the API
                            */

                                
                            // const url3 = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${process.env.API_KEY}`
                            // axios.get(url3)
                            //     .then((response) => {
                            //         console.log(response.data);
                            //         res.end(JSON.stringify(response.data));
                            //     })
                            //     .catch((error) => {
                            //         console.log(error);
                            //         res.end(JSON.stringify(error));
                            //     })
                            
                        }).catch((error) => {
                            console.log(error);
                            res.end(JSON.stringify(error));
                        })

                })
                .catch((error) => {
                    res.end(JSON.stringify(error));
                })

        });
    } else {
        res.end('404 Not Found');
    }

});

server.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

