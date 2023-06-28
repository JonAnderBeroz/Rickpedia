import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './characterFrame.css?inline';
import type { Character } from "~/types/Character";
export const CharacterFrame = component$((props: { character: Character }) => {
    useStylesScoped$(styles);
    const { name, image, id } = props.character
    return (
        <div class="container">
            <img src={image} />
            <a href={'/character/' + id}>{name}</a>
        </div>
    );
});