export type characters = {
    info: {
        count: number,
        pages: number,
        next: string,
        prev: string,
    }
    results: [character]
};


export type character = {
    id: number,
    name: string,
    image: string,
}