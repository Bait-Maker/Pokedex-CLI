export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const fullURL = pageURL || `${PokeAPI.baseURL}/location-area`;
    try {
      const response = await fetch(fullURL);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const locations: ShallowLocations = await response.json();
      return locations;
    } catch (e) {
      throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`;

    try {
      const response = await fetch(fullURL);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const location: Location = await response.json();
      return location;
    } catch (e) {
      throw new Error(
        `Error fetching location '${locationName}': ${(e as Error).message}`
      );
    }
  }
}

type NameAndURL = {
  name: string;
  url: string;
};

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: Result[];
};

type Result = NameAndURL;

export interface Location {
  encounter_method_rates: EncounterMethodRate[];
  game_index: number;
  id: number;
  location: NameAndURL;
  name: string;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
}

export interface EncounterMethodRate {
  encounter_method: EncounterMethod;
  version_details: VersionDetail[];
}

export type EncounterMethod = NameAndURL;

export type VersionDetail = {
  rate: number;
  version: Version;
};

export type Version = NameAndURL;

export type Name = {
  language: Language;
  name: string;
};

export type Language = {
  name: string;
  url: string;
};

export type PokemonEncounter = {
  pokemon: Pokemon;
  version_details: VersionDetail2[];
};

export type Pokemon = NameAndURL;

export type VersionDetail2 = {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: Version2;
};

export type EncounterDetail = {
  chance: number;
  condition_values: any[];
  max_level: number;
  method: Method;
  min_level: number;
};

export type Method = NameAndURL;

export type Version2 = NameAndURL;
