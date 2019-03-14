import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    // if don't work, use crossorigin as a prefix proxy on the url
    async getResults() {
        const key = '6148fe8657b39087371ebd296d5d1d37';
        // use fetch, but axios return directly in JSON
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}