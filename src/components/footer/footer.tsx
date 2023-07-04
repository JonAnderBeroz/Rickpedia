import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from './footer.css?inline';

export default component$(() => {

  useStylesScoped$(styles)
  return(
    <footer>
      <strong>Powered by </strong><a href="https://rickandmortyapi.com/">Rick & Morty API</a>
    </footer>
  )
})