import cluster from 'cluster';
const cluster = require('cluster');
const cpuCount = require('os').cpus().length;
const cluster = require('cluster');
const os = require('os');

if (Cluster.isMaster) {
  const cpus = os.cpus().length;

  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i<cpus; i++) {
    cluster.fork();
  }
  Object.values(cluster.workers).forEach(worker => {
    worker.send(`Hello Worker ${worker.id}`);
  });
  cluster.on('exit', (worker, code, signal) => {
      if(code !== 0 &&!worker.exitedAfterDisconnect){
          console.log(`worker ${worker.process.pid} died` + 'Starting a new worker...');
          cluster.fork();
      }
    // console.log(`worker ${worker.process.pid} died`);
  });
} else {
  require('./server');
}



// import cluster from 'node:cluster';
// import http from 'node:http';
// import { cpus } from 'node:os';
// import process from 'node:process';

// const numCPUs = cpus().length;

// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {
//   // Workers can share any TCP connection
//   // In this case it is an HTTP server
//   http.createServer((req, res) => {
//     res.writeHead(200);
//     res.end('hello world\n');
//   }).listen(8080);

//   console.log(`Worker ${process.pid} started`);
// }