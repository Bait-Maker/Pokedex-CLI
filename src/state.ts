import { stdin, stdout } from "node:process";
import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, Pokemon, PokemonName } from "./api/pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  api: PokeAPI;
  nextLocationURL: string;
  prevLocationURL: string;
  caughtPokemon: Record<string, Pokemon>;
};

export function initState(cacheInterval: number): State {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex >",
  });

  return {
    readline: rl,
    commands: getCommands(),
    api: new PokeAPI(cacheInterval),
    nextLocationURL: "",
    prevLocationURL: "",
    caughtPokemon: {},
  };
}
