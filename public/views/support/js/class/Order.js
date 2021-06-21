class Order {
    constructor(id, pickUpTime, status, cost, uid, dishes) {
        this.id = id;
        this.pickUpTime = pickUpTime;
        this.status = status;
        this.cost = cost;
        this.uid = uid;
        this.dishes = dishes;
    }

    get reformatTime() {
        var time = this.pickUpTime;
        var res = "";
        for (i = 0; i < 6; ++i) {
            res += time[i];
            if (i % 2 == 1 && i != 5) res += '/';
        }

        res += ', ' + time[6] + time[7] + ':' + time[8] + time[9];
        return res;
    }
}