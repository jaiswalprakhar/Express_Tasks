const products = [];
module.exports = class Product {
    constructor(product_name, size) {
        this.product_name = product_name;
        this.size = size;
    }

    save() {
        products.push(this.product_name, this.size);
    }

    static fetchAll() {
        return products;
    }
}