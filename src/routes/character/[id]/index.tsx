import { component$, useSignal, useStylesScoped$, useTask$ } from "@builder.io/qwik";
import { server$, useLocation } from "@builder.io/qwik-city";
import { CHARACTER_API_URL } from "~/env";
import type { Character } from "~/types/Character";
import type { Location } from "~/types/Location";
import styles from './character.css?inline';
import { Alive } from "~/components/icons/alive";
import type { JSX } from "@builder.io/qwik/jsx-runtime";
import { Dead } from "~/components/icons/dead";
import { Unknown } from "~/components/icons/unknown";
import { Genderless } from "~/components/icons/genderless";
import { Female } from "~/components/icons/female";
import { Male } from "~/components/icons/male";

export const status: Map<string, JSX.Element> = new Map([
    ['Alive', Alive()],
    ['Dead', Dead()],
    ['unknown', Unknown()]
])

export const gender: Map<string, JSX.Element> = new Map([
    ['Male', Male()],
    ['Female', Female()],
    ['Genderless', Genderless()],
    ['unknown', Unknown()]
])

export default component$(() => {
    useStylesScoped$(styles);
    const loc = useLocation();
    const character = useSignal<Character>();
    const lastKnwonLocation = useSignal<Location>();
    useTask$(async () => {
        character.value = await getCharacterData(+loc.params.id);
        if (!character.value) return;
        lastKnwonLocation.value = await getCharacterLocation(character.value.location.url);
        console.log(lastKnwonLocation);
    })
    return (
        <>
            <section class="characterHeader">
                <img class="characterPreview" src={character.value?.image}></img>
                <div class="characterDetails">
                    <strong class="characterTitle">{character.value?.name}</strong>
                    <strong>Status:  {character.value?.status} {status.get(character.value?.status ?? 'unknown')}</strong>
                    <strong>Gender: {character.value?.gender} {gender.get(character.value?.gender ?? 'unknown')}</strong>
                    <strong>Species: {character.value?.species}</strong>
                    {character.value?.type && <strong> Type: {character.value?.type}</strong>}
                </div>
            </section>
            <section class="characterDetails" >
                <strong>Species: {lastKnwonLocation.value?.name}</strong>
                <strong>Species: {lastKnwonLocation.value?.dimension}</strong>
                <strong>Species: {lastKnwonLocation.value?.residents.length}</strong>
            </section>
            <section class="characterDetails" >
                <strong>Species: {lastKnwonLocation.value?.name}</strong>
                <strong>Species: {lastKnwonLocation.value?.dimension}</strong>
                <strong>Species: {lastKnwonLocation.value?.residents.length}</strong>
            </section>
        </>
    );
})


const getCharacterData = server$(async (characterId: number) => {
    const url: URL = new URL(CHARACTER_API_URL + '/' + characterId);
    const data = await fetch(url).then(data => data.json());
    return data;
})

const getCharacterLocation = server$(async (url: string) => {
    const Url: URL = new URL(url);
    const data = await fetch(Url).then(data => data.json());
    return data;
})