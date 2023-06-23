import { component$, useStylesScoped$, $, useSignal, QwikChangeEvent } from "@builder.io/qwik";
import styles from './searchbar.css?inline';
import { server$, useNavigate } from "@builder.io/qwik-city";
import { CHARACTER_API_URL } from "~/env";
import { type Characters } from "~/types/Characters";

const getCharactersDataByName = server$(async (characterName: string) => {
  const url: URL = new URL(CHARACTER_API_URL + '/?name=' + characterName);
  const data = await fetch(url).then(data => data.json());
  return data;
})

const go2Character = $(async () => {
  const nav = useNavigate();
  const form: HTMLFormElement = document.querySelector("form") ?? new HTMLFormElement();
  const characterName: string = form.elements['characterName'].value
  if (!characterName) return;
  const characters: Characters = await getCharactersDataByName(characterName);
  if (!characters) return;
  nav('/character/' + characters.results[0].id);
})

export default component$(() => {
  useStylesScoped$(styles);
  const searchOcurrences = useSignal<Characters>();
  const outputRef = useSignal<Element>();
 
  return (
    <section class='searchBarWrapper'>
      <form class="searchBar" onSubmit$={go2Character} preventdefault:submit >
        <input ref={outputRef} type="text" name='characterName' placeholder='Rick Sanchez' onKeyDown$={
          async (e) => {
            if(!outputRef.value?.value){
              searchOcurrences.value = undefined;
              return;
            }
            searchOcurrences.value = await getCharactersDataByName(outputRef.value?.value);
          }
        } autoComplete="off"  />
        <button type='submit' >
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
            <path d="M21 21l-6 -6"></path>
          </svg>
        </button>
      </form>
      {searchOcurrences.value?.results && <div class='box'>
        <ul>
          {
            searchOcurrences.value?.results?.map(character => {
              return (
                <li key={character.id}>
                  <a href={`character/${character.id}`}>{character.name}</a>
                </li>
              )
            })
          }
        </ul>
      </div> }
    </section>
  )
});
