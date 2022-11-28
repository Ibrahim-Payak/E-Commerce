let label = document.getElementById('label');
let cartItem = document.getElementById('cartItem');


let basket = JSON.parse(localStorage.getItem("data")) || [];

let cartItems = () => {
    let cartNo = document.getElementById("cartAmount");

    cartNo.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

cartItems();


let generateCart = () => {
    debugger;
    if (basket.length !== 0) {
        return (cartItem.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItems.find((z) => z.id === id) || []

            return `
            <div class="citems">
                <img width="100px" src=${search.img} alt="" srcset="">
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="price">$ ${search.price}</p>
                        </h4>
                        
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>
                    
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>

                    <h3>$ ${search.price * item}</h3>
                </div>
            </div>
            `
        }).join(""));
    }
    else {

        cartItem.innerHTML = ``;
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="main.html">
                <button>Back to Home</button>
            </a>
        `;
    }
}

generateCart();

let increment = (id) => {
    let search = basket.find((x) => x.id === id);

    if (search === undefined) {
        basket.push({
            id: id,
            item: 1
        });
    }
    else {
        search.item++;
    }

    //console.log(basket);
    update(id);
    generateCart();
    localStorage.setItem("data", JSON.stringify(basket));

};

let decrement = (id) => {
    let search = basket.find((x) => x.id === id);

    if (search === undefined)
        return
    else if (search.item === 0) {
        return;
    }
    else {
        search.item--;
    }

    // console.log(basket);
    update(id);

    basket = basket.filter((x) => x.item !== 0);
    generateCart();
    localStorage.setItem("data", JSON.stringify(basket));

};


let update = (id) => {
    let search = basket.find((z) =>
        z.id === id
    )
    document.getElementById(id).innerHTML = search.item;
    cartItems();
    totalAmount();
    
}

let removeItem = (id) => {

    console.log(id);
    basket = basket.filter((x) => x.id !== id);
    generateCart();
    totalAmount();
    cartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}


let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x;
            let search = shopItems.find((x) => x.id === id) || [];

            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        label.innerHTML =
            `
                <h3>Total Amount: $ ${amount}</h3>
                <button class="checkOut">Checkout</button>
                <button onclick="clearCart()" class="clear">Clear Cart</button>
                `
    }
    else return;


}

totalAmount();


let clearCart = () =>{
    basket = [];
    generateCart();
    cartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}