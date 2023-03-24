const http = require('http');
const fs = require('fs');

//Did not add dotenv to gitignore because it is Only for demo purpose
require('dotenv').config()

const file = fs.readFileSync('index.html');


const server = http.createServer(function (req, res) {  

    res.writeHead(200, { 'Content-Type': 'text/html' });
    
    if(req.url == '/'){
        res.end(file);
    }else if(req.method=="POST" && req.url == '/api'){
        req.on('data', function (data) {
            const city = data.toString().toLowerCase().split('=')[1];
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
            fetch(url).then(res => res.json()).then(data => {
                console.log(data)
                res.end(JSON.stringify(data));  
            }).catch(err => {
                res.end(JSON.stringify(err));
            });          
        });  
    }else{
        res.end('404 Not Found');
    }

});

server.listen(process.env.PORT || 5000);

