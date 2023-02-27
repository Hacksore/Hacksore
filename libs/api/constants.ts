export const DISCORD_API_BASE = "https://discord.com";
export const GITHUB_API_BASE = "https://api.github.com";

// TODO: move to file
const rgbToDecimal = (r: number, g: number, b: number): number => {
  return r * 65536 + g * 256 + b;
}

export enum Colors {
  Red = 13264986,
  Green = 6280543,
  Orange = 15439161,
  Gray = 3289650,
  Blue = 220,
}