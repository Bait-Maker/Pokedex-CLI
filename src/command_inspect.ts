import { State } from "./state.js";

export async function commandInspect(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length !== 1) {
    throw new Error("Please enter a Pokemon name to inspect");
  }

  const name = args[0];

  const pokemon = state.caughtPokemon[name];

  if (!pokemon) {
    throw new Error(`you haven't caught that pokemon`);
  }

  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log("Stats:");
  pokemon.stats.map((stat) => {
    console.log(`   -${stat.stat.name}: ${stat.base_stat}`);
  });
  console.log("Types:");
  pokemon.types.map((type) => {
    console.log(` - ${type.type.name}`);
  });
}
