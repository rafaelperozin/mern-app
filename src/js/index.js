import Search from './models/Search';

// * Global state of the app
// * - Search object
// * - Current recipe object
// * - Shopping list objetc
// * - Liked recipes
const state = {};

const controlSearch = async () => {

    // 1. get query from view
    const query = 'pizza'; // !TODO

    // if ter is a query
    if (query) {
        // 2. News search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for recipes

        // 4. Search for recipes and await the result
        await state.search.getResults();

        // 5. Render results on UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})