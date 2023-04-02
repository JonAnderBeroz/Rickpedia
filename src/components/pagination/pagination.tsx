import type { Signal } from "@builder.io/qwik";
import { component$, useSignal, useStylesScoped$, $ } from "@builder.io/qwik";
import styles from './pagination.css?inline'


export default component$((props: { maxCharacterPages: number, currentPage:Signal<number> }) => {
    useStylesScoped$(styles)
    const pages = useSignal<number[]>([1, 2, 3, 4, 5]);
    const {currentPage } = props;
    const pageStep = 5;
    const selectedPage = useSignal(currentPage.value);

    const nextPage = $(() => {
        if (currentPage.value === props.maxCharacterPages) return;
        currentPage.value++;
    });

    const previousPage = $(() => {
        if (currentPage.value === 1) return;
        currentPage.value--;
    });

    const getPages = $(() => {
        if (currentPage.value > pages.value[pageStep - 1]) {
            pages.value = []
            for (let i = 0; i < pageStep && currentPage.value + i <= props.maxCharacterPages; i++) {
                pages.value.push(currentPage.value + i);
            }
        }
        if (currentPage.value < pages.value[0]) {
            pages.value = []
            for (let i = pageStep - 1; i > -1; i--) {
                pages.value.push(currentPage.value - i);
            }
        }
        return (
            pages.value.map(page =>
                <button key={page} type="button" class={{
                    page: true,
                    selected: page === currentPage.value,
                }} onClick$={() => currentPage.value = page} >{page}</button>
            )
        )
    });

    return (
        <div class="pagination">
            <button type="button" class="paginationAction" onClick$={previousPage}>&lt;</button>
            {
                getPages()
            }
            <button type="button" class="paginationAction" onClick$={nextPage}>&gt;</button>
        </div>
    )
})

