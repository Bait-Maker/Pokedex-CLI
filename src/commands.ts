import commandExit from "./command_exit.js";
import commandHelp from "./command_help.js";
import { commandExplore } from "./command_explore.js";
import { commandMapForward, commandMapBack } from "./map.js";
import type { CLICommand } from "./state.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    inspect: {
      name: "inspect <pokemon_name>",
      description:
        "Lists name, height, weight, stats and type(s) of the Pokemon.",
      callback: commandInspect,
    },
    catch: {
      name: "catch <pokemon_name>",
      description:
        "Throws a pokeball at a Pokemon with percentage chance to catch",
      callback: commandCatch,
    },
    explore: {
      name: "explore <location_name>",
      description: "Lists all Pokemon encounters for the provided area",
      callback: commandExplore,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 location areas.",
      callback: commandMapBack,
    },
    map: {
      name: "map",
      description:
        "Displays the names of 20 location areas in the Pokemon world.",
      callback: commandMapForward,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    // can add more commands here
  };
}
