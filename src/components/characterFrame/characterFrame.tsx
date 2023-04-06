import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './characterFrame.css?inline';
export const CharacterFrame = component$((props: { name: string, image: string }) => {
    useStylesScoped$(styles);
    return (
        <div class="caja">
            <img src={props.image} />
            <a href="/character">{props.name}</a>
        </div>
    );
});