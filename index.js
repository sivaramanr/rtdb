var net = require('net');
const conf = {
  host: '127.0.0.1',
  port: 1337,
  encoding: 'utf8'
};
const connections = [];
const cachedata = [];
const subtopics = [];
var server = net.createServer(function (socket) {
  let connectionId = Date.now().toString();
  connections[connectionId] = {
    socket,
    idleSince: Date.now(),
    subscriptions: []
  };
  socket.setEncoding(conf.encoding);
  socket.on("data", function (data) {
    let cdata = data.slice(0,data.length-1);
    let cmd = cdata.split(" ");
    switch (cmd[0].toUpperCase()){
      case "HELP":
        socket.write("Available commands: SET, GET, DELETE, SUBSCRIBE, UNSUBSCRIBE, PUBLISH, QUIT\n");
        break;
      case "SET":
        if (cmd[1] && cmd[2]){
          cachedata[cmd[1]] = cmd[2];
          socket.write("OK\n");
        }else{
          socket.write("ERR\n");
        }
        break;
      case "GET":
        if (cmd[1]){
          socket.write(cachedata[cmd[1]]+"\n");
        }
        break;
      case "DELETE":
        if (cmd[1]){
          delete cachedata[cmd[1]];
          socket.write("OK\n");
        }
        break;
      case "SUBSCRIBE":
        if (cmd[1]){
          if (!subtopics[cmd[1]]){
            subtopics[cmd[1]] = {
              createdAt: Date.now(),
              subscribers: []
            };
          }
          let topics = subtopics[cmd[1]];
          topics.subscribers[connectionId] = 1;
          connections[connectionId].subscriptions[cmd[1]] = 1;
          socket.write("OK\n");
          console.log("subtopics", subtopics);
          console.log("connections", connections);
        }
        break;
      case "UNSUBSCRIBE":
        if (cmd[1]){
          if (subtopics[cmd[1]]){
            delete subtopics[cmd[1]].subscribers[connectionId];
            delete connections[connectionId].subscriptions[cmd[1]];
            socket.write("OK\n");
            console.log("subtopics", subtopics);
            console.log("connections", connections);
          }
        }
        break;
      case "PUBLISH":
        if (subtopics[cmd[1]]){
          let topics = subtopics[cmd[1]];
          console.log(topics);
          for(key in topics.subscribers){
            if (connections[key].socket) {
              let [p1, p2, ...rt] = cmd;
              connections[key].socket.write(rt.join(" ")+"\n");
            }
          }
        }
        break;
      case "QUIT":
        socket.end((err)=>{
          delete connections[connectionId];
        });
        break;
      default:
        socket.write("Unknown command\n");
        break;
    }
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The memory consumption is approximately ${Math.round(used * 100) / 100} MB`);
  });
  socket.on("close", function (err) {
    delete connections[connectionId];
  });
});
server.listen(conf.port, conf.host);