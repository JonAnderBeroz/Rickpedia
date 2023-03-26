export type characters = {
    info: {
        count: number,
        pages: number,
        next: string,
        prev: string,
    }
    results: [
        {
            name: string,
            image: string,
        }
    ]
};