import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Player } from "./types";
const { getRandomText } = require("./resources/texts");

const port = process.env.PORT || 5001;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "*",
	},
});
let players: Player[] = [];
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

	socket.on("playerProgressUpdateFromClient", (player: Player) => {
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
