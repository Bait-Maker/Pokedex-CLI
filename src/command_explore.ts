import { State } from "./state.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length !== 1) {
    throw new Error("you must provide a location name");
  }

  const locationName = args[0];
  console.log(`Exploring ${locationName}...`);

  const result = await state.api.fetchLocation(locationName);

  console.log("Pokemon found:");
  result.pokemon_encounters.map((encounter) => {
    console.log(` - ${encounter.pokemon.name}`);
  });
}
