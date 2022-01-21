/* Defines a reusable Event Interface for all Angular components */
export interface IEvent {
	id: number;
	name: string;
	saved: boolean;
	description: string;
	time: string;
	date: string;
	picture: string;
	position: {
		lat: number;
		lng: number;
	},
	category: string;
}