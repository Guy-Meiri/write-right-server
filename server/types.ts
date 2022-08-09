export interface ProgressStatus {
	accuracy: number;
	completionPercentage: number;
	coloredPixelsStatus: ColoredPixelsStatus;
}

export interface ColoredPixelsStatus {
	numPositivePoints: number;
	numNegativePoints: number;
	numMediumMistakePoints: number;
	totalPoints: number;
}

export interface Player {
	id: string;
	name: string;
	progressStatus: ProgressStatus;
	bgcolor: string;
}
