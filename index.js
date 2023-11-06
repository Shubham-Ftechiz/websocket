const { createServer } = require("http");
const staticHandler = require("serve-handler");
const { WebSocketServer } = require("ws");
const ws = require("ws");
const server = createServer((req, res) => {
  return staticHandler(req, res, { public: "public" });
});

const wss = new WebSocketServer({ server });
wss.on("connection", (client) => {
  console.log("Client connected !");
  client.on("message", (msg) => {
    console.log(`Message:${msg}`);
    broadcast(msg);
  });
});
function broadcast(msg) {
  for (const client of wss.clients) {
    if (client.readyState === ws.OPEN) {
      client.send(msg);
    }
  }
}
server.listen(process.argv[2] || 8080, () => {
  console.log(`server listening...`);
});
