class User {

    get calculateRank() {

    }

    constructor(name, phone, numberOfOrders) {
        this.name = name;
        this.phone = phone;

        var str = "Son";
        if (numberOfOrders <=1) {
            str = "First-time";
        } else if (numberOfOrders <= 3) {
            str = "Normal";
        } else if (numberOfOrders <= 10) {
            str =  "Silver";
        } else if (numberOfOrders <= 20) {
            str = "Gold"
        } else if (numberOfOrders <= 50) {
            str = "Platinum";
        }
        this.rank = str;
    }
}