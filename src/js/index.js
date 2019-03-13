import axios from 'axios';

// if don't work, use crossorigin as a prefix proxy on the url
async function getResults(query) {
    const key = '6148fe8657b39087371ebd296d5d1d37';
    // use fetch, but axios return directly in JSON
    try {
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes);
    } catch (error) {
        alert(error);
    }
}
getResults('tomato pasta');