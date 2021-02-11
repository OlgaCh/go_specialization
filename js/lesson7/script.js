"use strict";


class Product {
    constructor (img, name, price){
        this.img = img;
        this.name = name;
        this.price = price;
    }

    format(){
        return `<img src="${this.img}" alt="${this.name}"/>
                <p class="align-center">${this.name}</p>
                <a href="#" class="btn btn-buy" onclick="buyProduct('${this.name}')">Купить</a>`
    }

    addToHTML(){
        let content = this.format();
        const productDiv = document.createElement("div");
        productDiv.className = "event";
        productDiv.innerHTML = content;

        let eventsDiv = document.querySelector('.events');
        eventsDiv.appendChild(productDiv);
    }
}


class BasketItem extends Product {
    constructor(img, name, price, quantity){
        super(img, name, price);
        this.quantity = quantity;
    }

    format(){
        return `<div class="col col-pro layout-inline"><img src="${this.img}" alt="${this.name}"/>
                <p>${this.name}</p></div>
                <div class="col col-price col-numeric align-center "><p>${this.price}</p></div>
                <div class="col col-qty layout-inline">
                <a href="#" class="qty qty-minus" onclick="removeProduct('${this.name}')">-</a>
                <p>${this.quantity}</p><a href="#" class="qty qty-plus" onclick="buyProduct('${this.name}')">+</a></div>
                <div class="col col-total col-numeric"><p>${this.quantity*this.price}</p></div>`
    }

    addToHTML() {
        let content = this.format();
        const productDiv = document.createElement("div");
        productDiv.className = "layout-inline row product-row";
        productDiv.innerHTML = content;

        let footerDiv = document.querySelector('.tf');
        footerDiv.before(productDiv);
    }
}


class Basket {
    constructor(items) {
        this.items = items;
    }

    add(itemName) {
        let product = productDict[itemName];
        let toAdd = true;

        this.items.forEach(
            function(item) {
                if (item.name === product.name) {
                    item.quantity++;
                    toAdd = false;
                }
            }
         )

        if (toAdd === true) {
            let bi = new BasketItem(product.img, product.name, product.price, 1);
            this.items.push(bi);
        }
    }

    remove(itemName) {
        let product = productDict[itemName];
        let toRemoveIdx = null;

        this.items.forEach(
            function(item, idx) {
                if (item.name === product.name) {
                    item.quantity -= 1;
                    if (item.quantity === 0){
                        toRemoveIdx = idx;
                    }
                }
            }
        )

        if (toRemoveIdx != null) {
            this.items.splice(toRemoveIdx, 1);
        }
    }

    countPrice() {
        return this.items.reduce((total, unit) => total + unit.quantity * unit.price, 0);
    }

    cleanOldView() {
        try {
            document.querySelectorAll(".product-row").forEach(el => el.remove());
        } catch (TypeError) {
            console.log("No products in the basket.");
        }

        let totalEl = document.querySelector('.total-price');
        totalEl.innerHTML = `<p></p>`;
    }

    display() {
        let basketPrice = this.countPrice();

        this.cleanOldView();
        this.items.forEach(item => item.addToHTML());

        let totalEl = document.querySelector('.total-price');
        totalEl.innerHTML = `<p>${basketPrice}</p>`;
    }

    clear(){
        this.items = [];
        this.cleanOldView();
    }
}


let p1 = new Product("img/linkin_park.jpeg", "Linkin Park. Aug 2021 Show", 1500);
let p2 = new Product("img/skillet.jpeg", "Skillet. 2021 in Moscow", 999);
let p3 = new Product("img/анимация.png", "АнимациЯ. Возвращение в Воронеж", 750);

[p1, p2, p3].forEach(p => p.addToHTML())

// Here should map to product IDs instead

let productDict = {
    "Linkin Park. Aug 2021 Show": p1,
    "Skillet. 2021 in Moscow": p2,
    "АнимациЯ. Возвращение в Воронеж": p3
};

let basket = new Basket([]);


function buyProduct(itemName){
    basket.add(itemName);
    basket.display();
};

function removeProduct(itemName){
    basket.remove(itemName);
    basket.display();
};


function clearBasket(){
    basket.clear();
};

function displayNext(el){
    let parentClassName = el.parentNode.className;
    let parentElement = document.querySelector(`.${parentClassName}`);
    let nextElement = parentElement.nextElementSibling;

    parentElement.style.display = "none";
    nextElement.style.display = "block";
};
