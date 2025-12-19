import { Cache } from "../pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const fullURL = pageURL || `${PokeAPI.baseURL}/location-area`;

    try {
      const cachedLocation = this.cache.get<ShallowLocations>(fullURL);
      if (cachedLocation) {
        return cachedLocation;
      }
      const response = await fetch(fullURL);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const locations: ShallowLocations = await response.json();
      this.cache.add(fullURL, locations);
      return locations;
    } catch (e) {
      throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`;

    try {
      const cachedLocation = this.cache.get<Location>(fullURL);
      if (cachedLocation) {
        return cachedLocation;
      }
      const response = await fetch(fullURL);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const location: Location = await response.json();
      this.cache.add(fullURL, location);
      return location;
    } catch (e) {
      throw new Error(
        `Error fetching location '${locationName}': ${(e as Error).message}`
      );
    }
  }
  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const fullURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    try {
      const cached = this.cache.get<Pokemon>(fullURL);
      if (cached) {
        return cached;
      }

      const response = await fetch(fullURL);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const pokemon = await response.json();
      this.cache.add(fullURL, pokemon);
      return pokemon;
    } catch (e) {
      throw new Error(
        `Error fetching Pokemon ${pokemonName}: ${(e as Error).message}`
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
  pokemon: PokemonName;
  version_details: VersionDetail2[];
};

export type PokemonName = NameAndURL;

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

export type Pokemon = {
  abilities: Ability[];
  base_experience: number;
  cries: Cries;
  forms: Form[];
  game_indices: Index[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Mfe[];
  name: string;
  order: number;
  past_abilities: PastAbility[];
  past_types: any[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
};

export type Ability = {
  ability: Ability2;
  is_hidden: boolean;
  slot: number;
};

export type Ability2 = {
  name: string;
  url: string;
};

export type Cries = {
  latest: string;
  legacy: string;
};

export type Form = {
  name: string;
  url: string;
};

export type Index = {
  game_index: number;
  version: Version;
};

export type HeldItem = {
  item: Item;
  version_details: VersionDetail[];
};

export type Item = {
  name: string;
  url: string;
};

export type Mfe = {
  move: Move;
  version_group_details: VersionGroupDetail[];
};

export type Move = {
  name: string;
  url: string;
};

export type VersionGroupDetail = {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  order?: number;
  version_group: VersionGroup;
};

export type MoveLearnMethod = {
  name: string;
  url: string;
};

export type VersionGroup = {
  name: string;
  url: string;
};

export type PastAbility = {
  abilities: Ability3[];
  generation: Generation;
};

export type Ability3 = {
  ability: any;
  is_hidden: boolean;
  slot: number;
};

export type Generation = {
  name: string;
  url: string;
};

export type Species = {
  name: string;
  url: string;
};

export type Sprites = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: Other;
  versions: Versions;
};

export type Other = {
  dream_world: DreamWorld;
  home: Home;
  "official-artwork": OfficialArtwork;
  showdown: Showdown;
};

export type DreamWorld = {
  front_default: string;
  front_female: any;
};

export type Home = {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

export type OfficialArtwork = {
  front_default: string;
  front_shiny: string;
};

export type Showdown = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

export type Versions = {
  "generation-i": GenerationI;
  "generation-ii": GenerationIi;
  "generation-iii": GenerationIii;
  "generation-iv": GenerationIv;
  "generation-ix": GenerationIx;
  "generation-v": GenerationV;
  "generation-vi": GenerationVi;
  "generation-vii": GenerationVii;
  "generation-viii": GenerationViii;
};

export type GenerationI = {
  "red-blue": RedBlue;
  yellow: Yellow;
};

export type RedBlue = {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
};

export type Yellow = {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
};

export type GenerationIi = {
  crystal: Crystal;
  gold: Gold;
  silver: Silver;
};

export type Crystal = {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
};

export type Gold = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
};

export type Silver = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
};

export type GenerationIii = {
  emerald: Emerald;
  "firered-leafgreen": FireredLeafgreen;
  "ruby-sapphire": RubySapphire;
};

export type Emerald = {
  front_default: string;
  front_shiny: string;
};

export type FireredLeafgreen = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
};

export type RubySapphire = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
};

export type GenerationIv = {
  "diamond-pearl": DiamondPearl;
  "heartgold-soulsilver": HeartgoldSoulsilver;
  platinum: Platinum;
};

export type DiamondPearl = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

export type HeartgoldSoulsilver = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

export type Platinum = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

export type GenerationIx = {
  "scarlet-violet": ScarletViolet;
};

export type ScarletViolet = {
  front_default: string;
  front_female: any;
};

export type GenerationV = {
  "black-white": BlackWhite;
};

export type BlackWhite = {
  animated: Animated;
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

export type Animated = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

export type GenerationVi = {
  "omegaruby-alphasapphire": OmegarubyAlphasapphire;
  "x-y": XY;
};

export type OmegarubyAlphasapphire = {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

export type XY = {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

export type GenerationVii = {
  icons: Icons;
  "ultra-sun-ultra-moon": UltraSunUltraMoon;
};

export type Icons = {
  front_default: string;
  front_female: any;
};

export type UltraSunUltraMoon = {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

export type GenerationViii = {
  "brilliant-diamond-shining-pearl": BrilliantDiamondShiningPearl;
  icons: Icons2;
};

export type BrilliantDiamondShiningPearl = {
  front_default: string;
  front_female: any;
};

export type Icons2 = {
  front_default: string;
  front_female: string;
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: Stat2;
};

export type Stat2 = {
  name: string;
  url: string;
};

export type Type = {
  slot: number;
  type: Type2;
};

export type Type2 = {
  name: string;
  url: string;
};
