import commandExit from "./command_exit.js";
import { State } from "./state.js";

export function startREPL(state: State) {
  const rl = state.readline;
  rl.prompt();
  rl.on("line", async (line) => {
    const words = cleanInput(line);
    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const cmd = state.commands[commandName];
    const args = words.slice(1);
    if (!cmd) {
      console.log(
        `Unknown command: "${commandName}". Type "help" for a list of commands.`
      );
      rl.prompt();
      return;
    }

    try {
      await cmd.callback(state, ...args);
    } catch (e) {
      console.log((e as Error).message);
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
