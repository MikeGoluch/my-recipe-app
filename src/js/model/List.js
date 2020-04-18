import uniqid from 'uniqid';


class List {
    constructor() {
        this.elements = [];
    }

    addElement(amount, unit, description) {
        const element = {
            id: uniqid(),
            amount,
            unit,
            description
        };
        this.elements.push(element);
        return element;
    }

    deleteElement(id) {
        const index = this.elements.findIndex((el) => {
            el.id === id;
        });
        this.elements.splice(index, 1);
    }
}

export default List