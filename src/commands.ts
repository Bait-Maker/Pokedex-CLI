import commandExit from "./command_exit.js";
import commandHelp from "./command_help.js";
import { commandExplore } from "./command_explore.js";
import { commandMapForward, commandMapBack } from "./map.js";
import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    explore: {
      name: "explore",
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
