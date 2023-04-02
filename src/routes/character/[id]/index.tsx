import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { server$, useLocation } from "@builder.io/qwik-city";
import { CHARACTER_API_URL } from "~/env";
import type { character } from "~/types/characters";

export default component$(() => {
    const loc = useLocation();
    const character = useSignal<character>();
    useTask$(async () => {
        character.value = await characterData(+loc.params.id);
    })
    return(
        <>
        <p>characterId: {loc.params.id}</p>
        <p>{character.value?.name}</p>
        </>
    );
})


const characterData = server$(async (characterId: number) => {
    const url: URL = new URL(CHARACTER_API_URL + '/' + characterId);
    const data = await fetch(url).then(data => data.json());
    return data;
})