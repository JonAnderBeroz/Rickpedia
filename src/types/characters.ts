import type { Character } from "./Character";

export type Characters = {
    info: {
        count: number,
        pages: number,
        next: string,
        prev: string,
    }
    results: Character[]
};