import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import Characters from "~/components/characters/characters";

export default component$(() => {
  const loc = useLocation();
  return(
    <Characters characterName={loc.params.characterName}></Characters>
  )
})