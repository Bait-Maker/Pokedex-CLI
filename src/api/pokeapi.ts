export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const fullURL = `${PokeAPI.baseURL}/${pageURL}`
    const response = await fetch(fullURL, {
        method: "GET",
        mode: "cors",


    })
  }

  async fetchLocation(locationName: string): Promise<Location> {
    // implement this
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
};

type Result = {
    name: string;
    url: string;
}

export type Location = {
  id: number;
  name: string;
  region: string;
};

type Region = {
    id: number;
    locations: Location[];
    name: string;
    names: string [];
}