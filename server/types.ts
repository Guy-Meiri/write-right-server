export interface ProgressStatus {
	accuracy: number;
	completionPercentage: number;
}

export interface Player {
	id: string;
	name: string;
	progressStatus: ProgressStatus;
	bgcolor: string;
}
