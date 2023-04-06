import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';

export default component$(() => {
  return (
    <>
      <main>
        <Header />
        <section style="height: 80vh;display:flex; flex-direction:column; padding: 2em 2em 0em;">
          <Slot />
        </section>
      </main>
    </>
  );
});
