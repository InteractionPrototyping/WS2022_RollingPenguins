export interface IEvent {
    id: number;
    name: string;
    saved: boolean;
    description: string;
    date: string;
    picture: string;
    position: {
      lat: number;
      lng: number;
    },
    category: string;
  }