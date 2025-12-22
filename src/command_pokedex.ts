import { State } from "./state.js";

export async function commandPokedex(
  state: State,
  ...args: string[]
): Promise<void> {
  console.log("Your Pokedex");
  for (let [key, value] of Object.entries(state.caughtPokemon)) {
    console.log(` - ${value.name}`);
  }
}
