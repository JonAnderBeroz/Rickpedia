import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Characters from '~/components/characters';

export default component$(() => {
  return (
    <Characters></Characters>
  );
});

export const head: DocumentHead = {
  title: 'Rickpedia',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
