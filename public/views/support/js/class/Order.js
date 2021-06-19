const { number } = require("prop-types");

class Order {

    calculateRank(numberOfOrders) {
        if (numberOfOrders <=1) {
            return "First-time";
        } else if (numberOfOrders <= 3) {
            return "Normal";
        } else if (numberOfOrders <= 10) {
            return "Silver";
        } else if (numberOfOrders <= 20) {
            return "Gold"
        } else if (numberOfOrders <= 50) {
            return "Platinum";
        } else {
            return "Son";
        }
    }

    constructor(id, pickUpTime, status, cost, uid, dish) {
        this.id = id;
        this.pickUpTime = pickUpTime;
        this.status = status;
        this.cost = cost;
        this.uid = uid;
        this.dish = dish;
    }
}