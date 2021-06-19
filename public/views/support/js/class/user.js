class User {

    get calculateRank() {

    }

    constructor(name, phone, numberOfOrders) {
        this.name = name;
        this.phone = phone;

        var str = "Son";
        if (numberOfOrders <=1) {
            str = "First-time";
        } else if (this.numberOfOrders <= 3) {
            str = "Normal";
        } else if (this.numberOfOrders <= 10) {
            str =  "Silver";
        } else if (this.numberOfOrders <= 20) {
            str = "Gold"
        } else if (this.numberOfOrders <= 50) {
            str = "Platinum";
        }
        this.rank = str;
    }
}