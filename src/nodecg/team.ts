export interface Team {
  name: string;
  players: {
    name: string;
    twitch?: string;
    nico?: string;
    twitter?: string;
  }[];
}
