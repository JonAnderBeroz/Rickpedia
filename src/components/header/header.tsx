import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Logo } from '../icons/logo';
import styles from './header.css?inline';
import Searchbar from '../searchbar/searchbar';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="logo">
        <a href='/'><Logo /></a>
        <h1>Rickpedia</h1>
      </div>
      <Searchbar></Searchbar>
    </header>
  );
});
