import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Same as shadcn's `cn` — shadcn projects already have this file. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
