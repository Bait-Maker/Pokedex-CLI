import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import commandExit from "./command_exit.js"

export function startREPL() {
    const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex >",
    });
    rl.prompt();
    rl.on("line", async (line) => {
        const words = cleanInput(line);
        if(words.length === 0) {
            rl.prompt();
            return;
        }
        
        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input
    .toLocaleLowerCase()
    .trim()
    .split(" ")
    .filter((item) => item !== "");
}