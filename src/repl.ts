import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { getCommands } from './command_registry.js';

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

        const commandName = words[0];
        const commands = getCommands();
        const cmd = commands[commandName]
        if (!cmd){
            console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`,
            );
            rl.prompt();
            return;
        }

        try {
            cmd.callback(commands)
        } catch (e) {
            console.log(e);
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