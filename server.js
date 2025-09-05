const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

let users = {};

wss.on("connection", ws => {
  ws.on("message", msg => {
    let data = JSON.parse(msg);
    if (data.to && users[data.to]) {
      users[data.to].send(JSON.stringify({...data, from: ws.id}));
    }
  });

  ws.id = Math.random().toString(36).substr(2,9);
  users[ws.id] = ws;

  ws.on("close", () => { delete users[ws.id]; });
});
