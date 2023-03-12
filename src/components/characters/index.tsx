import { component$, Resource, useResource$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { CharacterFrame } from "~/components/characterFrame/characterFrame";
import styles from './characters.css?inline';

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

export default component$(() => {
    const currentPage = useSignal(1);
    const maxChacterPages = useSignal(1);
    useStylesScoped$(styles);
    const resource = useResource$<characters>(async ({ track }) => {
        track(() => currentPage.value);
        const result = await fetch('https://rickandmortyapi.com/api/character?page=' + currentPage.value);
        const characters = result.json()
        return characters
    });

    return (
        <>
            <div class="characters">
                <Resource
                    value={resource}
                    onPending={() => <div>Loading...</div>}
                    onRejected={() => <div>Failed to load weather</div>}
                    onResolved={(characters) => {
                        maxChacterPages.value = characters.info.pages
                        return (
                            <>
                                {
                                    characters.results.map(result =>
                                        <CharacterFrame name={result.name} image={result.image}></CharacterFrame>
                                    )
                                }
                            </>
                        )
                    }}
                />
            </div>
            <div class="pagination">
                <button type="button" preventdefault:click onClick$={() => {
                    if (currentPage.value === 1) return
                    currentPage.value--;
                }}>&lt;</button>
                {currentPage.value}
                <button type="button" preventdefault:click onClick$={() => {
                    if (currentPage.value === maxChacterPages.value) return;
                    currentPage.value++;
                }}>&gt;</button>
            </div>
        </>
    );
});