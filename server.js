// const res = require('express/lib/response');
const connectDB = require('./config/db');
const http = require('http');
const pid = process.pid;


// connected database
connectDB();

http.createServer((req, res) => {
    for(let i=0; i<1e7; i++);
    res.end(`Handled by process ${pid}`);
}).listen(8080, () => { 
    console.log(`Started Process ${pid}`);
});
process.on('message', msg => {
    console.log(`Message from master: ${msg}`);
  });

// const PORT = process.env.PORT || 3000;
