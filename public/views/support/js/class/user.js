class User {
    constructor(name, phone, rank) {
        this.name = name;
        this.phone = phone;
        this.rank = rank;

        if (rank == "") {
            this.rank = "Normal guest";
        }
        if (phone == "") {
            this.phone = "0911099706";
        }
    }
}