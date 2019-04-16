import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';
// import { stat } from 'fs';

// * Global state of the app
// * - Search object
// * - Current recipe object
// * - Shopping list objetc
// * - Liked recipes
const state = {};

// ? SEARCH CONTROLLER ##################################################################################################
const controlSearch = async () => {

    // 1. get query from view
    const query = searchView.getInput();
    // const query = 'pizza';
    // console.log(query);

    // if ter is a query
    if (query) {
        // 2. News search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for recipes
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4. Search for recipes and await the result
            await state.search.getResults();

            // 5. Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert(`Search: #1 Error processing [${err}]`);
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// TESTING without search ---------------------------------------
// window.addEventListener('load', e => {
//     e.preventDefault();
//     controlSearch();
// });
// -------------------------------------------------------------

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

// ? RECIPE CONTROLLER ##################################################################################################
const controlRecipe = async () => {
    // get the hash value and remove # to keep just numbers
    const id = window.location.hash.replace('#', '');
    console.log(id);

    // just run if exist some value there
    if (id) {

        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Create new recipe objetc
        state.recipe = new Recipe(id);

        // TESTING --------------------------------
        // window.r = state.recipe
        // ----------------------------------------

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (err) {
            alert(`Recipe: #1 Error processing [${err}]`);
        }

    }
};

// for each event verufy if the hashtag on url was changed, if yes call recipe controller function
// window.addEventListener('hashchange', controlRecipe);
// On first load without events they will verify # and show recipe if is true
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));