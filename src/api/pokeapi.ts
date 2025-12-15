export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const fullURL = `${PokeAPI.baseURL}/${pageURL}`
    const response = await fetch(fullURL);
    return response.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL = `${PokeAPI.baseURL}/${locationName}`;
    const response = await fetch(fullURL);
    return response.json()
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

type NameAndURL = {
    name: string;
    url: string;
}

export interface Location {
  encounter_method_rates: EncounterMethodRate[]
  game_index: number
  id: number
  location: NameAndURL;
  name: string
  names: Name[]
  pokemon_encounters: PokemonEncounter[]
}

export interface EncounterMethodRate {
  encounter_method: EncounterMethod
  version_details: VersionDetail[]
}

export type EncounterMethod = NameAndURL;

export type VersionDetail = {
  rate: number
  version: Version
}

export type Version = NameAndURL

export type Name = {
  language: Language
  name: string
}

export type Language = {
  name: string
  url: string
}

export type PokemonEncounter = {
  pokemon: Pokemon
  version_details: VersionDetail2[]
}

export type Pokemon = NameAndURL;

export type VersionDetail2 = {
  encounter_details: EncounterDetail[]
  max_chance: number
  version: Version2
}

export type EncounterDetail = {
  chance: number
  condition_values: any[]
  max_level: number
  method: Method
  min_level: number
}

export type Method = NameAndURL;

export type Version2 = NameAndURL;
