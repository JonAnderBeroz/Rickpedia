import { component$, Resource, useResource$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { CharacterFrame } from "~/components/characterFrame/characterFrame";
import { CHARACTER_LIST_API_URL } from "~/env";
import type { characters } from "~/types/Characters";
import Pagination from "../pagination/pagination";
import styles from './characters.css?inline';


export default component$(() => {
    useStylesScoped$(styles);
    const currentPage = useSignal(1);
    const maxCharacterPages = useSignal(1);
    const characterResource = useResource$<characters>(async ({ track }) => {
        track(() => currentPage.value);
        const result = await fetch(`${CHARACTER_LIST_API_URL}${currentPage.value}`);
        const characters = result.json();
        return characters
    });

    return (
        <>
            <div class="characters">
                <Resource
                    value={characterResource}
                    onPending={() => <div>Loading...</div>}
                    onRejected={() => <div>Failed to load characters</div>}
                    onResolved={(characters) => {
                        maxCharacterPages.value = characters.info.pages
                        return (
                            <>
                                {
                                    characters.results.map(character =>
                                        <CharacterFrame key={character.id} character={character}></CharacterFrame>
                                    )
                                }
                            </>
                        )
                    }}
                />
            </div>
            <Pagination maxCharacterPages={maxCharacterPages.value} currentPage={currentPage}></Pagination>
        </>
    );
});