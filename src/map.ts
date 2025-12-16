import { State } from "./state.js";

// Tip/Warning: destructering creates local variables

// if fetching for the first time: default to /location-area
export default async function commandMap(state: State) {
  let pageURL = state.nextLocationURL ? state.nextLocationURL : "location-area";

  try {
    const result = await state.api.fetchLocations(pageURL);
    state.nextLocationURL = result.next;
    state.prevLocationURL = result.previous;
    result.results.map((result) => {
      console.log(result.name);
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error("Something went wrong:", e.message);
    }
  }
}
