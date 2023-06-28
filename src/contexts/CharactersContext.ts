import { type Characters } from '~/types/Characters';
import { type Signal, createContextId } from "@builder.io/qwik"

export const ChractersContext = createContextId<Signal<Characters>>(
  'characer.characters'
);