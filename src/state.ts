import { stdin, stdout } from "node:process";
import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./api/pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  api: PokeAPI;
  nextLocationURL: string | null;
  prevLocationURL: string | null;
};

export function initState(): State {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex >",
  });

  return {
    readline: rl,
    commands: getCommands(),
    api: new PokeAPI(),
    nextLocationURL: null,
    prevLocationURL: null,
  };
}
