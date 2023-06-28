import { component$, useStylesScoped$, $, useSignal } from "@builder.io/qwik";
import styles from './searchbar.css?inline';
import { server$, useNavigate } from "@builder.io/qwik-city";
import { CHARACTER_API_URL } from "~/env";
import { type Characters } from "~/types/Characters";

const getCharactersDataByName = server$(async (characterName: string) => {
  const url: URL = new URL(CHARACTER_API_URL + '/?name=' + characterName);
  const data = await fetch(url).then(data => data.json());
  return data;
})


export default component$(() => {
  useStylesScoped$(styles);
  const searchOcurrences = useSignal<Characters>();
  const outputRef = useSignal<HTMLInputElement>();
  const nav = useNavigate();

  const go2Character = $(async () => {
    const form: HTMLFormElement = document.querySelector("form") ?? new HTMLFormElement();
    const characterName: string = form.elements['characterName'].value
    if (!characterName) return;
    const characters: Characters = await getCharactersDataByName(characterName);
    if (!characters) return;
    nav('/character/' + characters.results[0].id);
    searchOcurrences.value = undefined
    if(!outputRef.value) return;
    outputRef.value.value = '';
  })

  return (
    <section class='searchBarWrapper'>
      <form class="searchBar" onSubmit$={go2Character} preventdefault:submit >
        <input ref={outputRef} type="text" name='characterName' placeholder='Rick Sanchez' onKeyDown$={
          async () => {
            if (!outputRef.value?.value) {
              searchOcurrences.value = undefined;
              return;
            }
            searchOcurrences.value = await getCharactersDataByName(outputRef.value?.value);
          }
        } autoComplete="off" />
        <button type='submit' >
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
            <path d="M21 21l-6 -6"></path>
          </svg>
        </button>
      </form>
      {searchOcurrences.value?.results && <div class='searchResults'>
        <ul>
          {
            searchOcurrences.value?.results.slice(0,4).map(character => {
              const { id, image, name } = character
              return (
                <li key={id}>
                  <a href={'/character/' + id} class="characterLink">
                    <img src={image} />
                    <span>{name}</span>
                  </a>
                </li>
              )
            })
          }
        </ul>
        {searchOcurrences.value?.results.length > 4 && <a href="/searchResults" class="moreResultsButton">See more results</a>}
      </div>}
    </section>
  )
});
