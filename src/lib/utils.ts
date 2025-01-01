import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encrypt = (salt: string, text: string): string => {
  const textToChars = (text: string): number[] =>
    text.split("").map((c) => c.charCodeAt(0));

  const byteHex = (n: number): string => ("0" + Number(n).toString(16)).substr(-2);

  const applySaltToChar = (code: number): number =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map((char) => char.charCodeAt(0))
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

export const decrypt = (salt: string, encoded: string): string => {
  const textToChars = (text: string): number[] =>
    text.split("").map((c) => c.charCodeAt(0));

  const applySaltToChar = (code: number): number =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return encoded.match(/.{1,2}/g)
    ?.map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("") || "";
};
