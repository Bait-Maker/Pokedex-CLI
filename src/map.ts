import { State } from "./state.js";

// Tip/Warning: destructering creates local variables

// if fetching for the first time: default to /location-area
export async function commandMapForward(state: State) {
  try {
    const result = await state.api.fetchLocations(state.nextLocationURL);

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

// dispay the previous 20 locations
export async function commandMapBack(state: State) {
  if (!state.prevLocationURL) {
    throw new Error("you're on the first page");
  }

  try {
    const response = await state.api.fetchLocations(state.prevLocationURL);

    state.nextLocationURL = response.next;
    state.prevLocationURL = response.previous;

    response.results.map((result) => {
      console.log(result.name);
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
}
