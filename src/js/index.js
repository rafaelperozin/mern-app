import Search from './models/Search';
import * as searchView from './views/searchView';
import {
    elements
} from './views/base';

// * Global state of the app
// * - Search object
// * - Current recipe object
// * - Shopping list objetc
// * - Liked recipes
const state = {};

const controlSearch = async () => {

    // 1. get query from view
    const query = searchView.getInput();
    console.log(query);

    // if ter is a query
    if (query) {
        // 2. News search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for recipes
        searchView.clearInput();
        searchView.clearResults();

        // 4. Search for recipes and await the result
        await state.search.getResults();

        // 5. Render results on UI
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})