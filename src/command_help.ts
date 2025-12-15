import type { CLICommand } from "./command.js";

export default function commandHelp(commands: Record<string, CLICommand>) {
    console.log();
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    for (const cmd of Object.values(commands)) {
        console.log(`${cmd.name}: ${cmd.description}`);
    }
}