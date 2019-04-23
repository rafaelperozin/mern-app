import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        // discover where the current id is locate
        const index = this.items.findIndex(el => el.id === id);
        // [2,4,8] splice(1, 2) -> return [4,8], original array is [2]
        // [2,4,8] slice(1, 2) -> return 4, original array is [2,4,8]
        // remove item from the array
        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        // loop in array and count all ids
        this.items.find(el => el.id === id).count = newCount;
    }
}