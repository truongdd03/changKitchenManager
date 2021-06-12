export default class MenuDishes {
    constructor(courseType, name, id, price) {
        this.courseType = courseType;
        this.name = name;
        this.id = id;
        this.price = price;
    }

    getName() {
        return this.name;
    }
} 