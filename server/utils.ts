import { findAncestor } from "typescript";
import { Player } from "./types";

export const calcGameTimeByTextLeft = (gameText: string) => {
	return Math.floor(gameText.length);
};

export const getWinningPlayer = (players: Player[]) => {
	return players.sort(
		(player1, player2) => player2.progressStatus.completionPercentage - player1.progressStatus.completionPercentage
	)[0];
};
