"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const { getRandomText } = require("./resources/texts");
const port = process.env.PORT || 5001;
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
    },
});
let players = [];
const PLAYERS_REQUIRED_TO_START_GAME = 2;
// app.get("/", (req, res) => {
// 	const pathToIndex = path.join(__dirname, "..", "client", "build", "index.html");
// 	console.log(`serving file from: ${pathToIndex}`);
// 	res.sendFile(pathToIndex);
// });
// app.use(express.static(path.join(__dirname, "..", "client", "build")));
io.on("connection", socket => {
    console.log(`${socket.id} just connected`);
    socket.on("newPlayerFromClient", newPlayer => {
        console.log("new player:", newPlayer);
        socket.broadcast.emit("newPlayer", newPlayer);
        players.push(newPlayer);
        if (players.length === PLAYERS_REQUIRED_TO_START_GAME) {
            console.log("emiting gameStarted");
            io.emit("gameStarted", getRandomText());
        }
    });
    socket.on("playerProgressUpdateFromClient", (player) => {
        console.log(`player with id: ${player.id} progress update:`, player.progressStatus);
        socket.broadcast.emit("opponentProgressUpdate", player);
        if (player.progressStatus.completionPercentage > 99) {
            io.emit("playerWon", player);
        }
        //todo: implement gameover logic
    });
    socket.on("disconnect", () => {
        console.log(`${socket.id} just disconnected`);
        players = players.filter(player => player.id !== socket.id);
        socket.broadcast.emit("playerLeft", socket.id);
    });
    io.to(socket.id).emit("initial", players);
});
httpServer.listen(port, () => {
    console.log(`listening on port ${port}`);
});
