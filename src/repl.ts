export function cleanInput(input: string): string[] {
    return input
    .toLocaleLowerCase()
    .trim()
    .split(" ")
    .filter((item) => item !== "");
}