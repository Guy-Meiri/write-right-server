import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Player } from "./types";
import { calcGameTimeByTextLeft, getWinningPlayer } from "./utils";
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
let timerIntervalToCleanUpAtGameEnd: NodeJS.Timer;

io.on("connection", socket => {
	console.log(`${socket.id} just connected`);

	socket.on("newPlayerFromClient", newPlayer => {
		console.log("new player:", newPlayer);
		socket.broadcast.emit("newPlayer", newPlayer);
		players.push(newPlayer);
		if (players.length === PLAYERS_REQUIRED_TO_START_GAME) {
			console.log("emiting gameStarted");

			const gameText = getRandomText();
			io.emit("gameStarted", gameText);
			let gameTimeLeft = calcGameTimeByTextLeft(gameText);

			io.emit("gameTick", gameTimeLeft);
			timerIntervalToCleanUpAtGameEnd = setInterval(() => {
				gameTimeLeft -= 1;
				io.emit("gameTick", gameTimeLeft);
				if (gameTimeLeft <= 0) {
					onGameOver();
				}
			}, 1000);
		}
	});

	socket.on("playerProgressUpdateFromClient", (player: Player) => {
		console.log(`player with id: ${player.id} progress update:`, player.progressStatus);
		socket.broadcast.emit("opponentProgressUpdate", player);

		if (player.progressStatus.completionPercentage > 99) {
			onGameOver();
		}
	});

	socket.on("clientAdminDisconnectAll", () => {
		console.log("in disconnectAllHandler");
		io.disconnectSockets();
		if (timerIntervalToCleanUpAtGameEnd) {
			clearInterval(timerIntervalToCleanUpAtGameEnd);
		}
	});

	socket.on("disconnect", () => {
		console.log(`${socket.id} just disconnected`);
		players = players.filter(player => player.id !== socket.id);
		socket.broadcast.emit("playerLeft", socket.id);
	});

	io.to(socket.id).emit("initial", players);
});

const onGameOver = () => {
	io.emit("playerWon", getWinningPlayer(players));
	clearInterval(timerIntervalToCleanUpAtGameEnd);
	players = [];
	io.emit("initial", players);
};
httpServer.listen(port, () => {
	console.log(`listening on port ${port}`);
});
