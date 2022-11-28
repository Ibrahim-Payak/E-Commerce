let shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem("data")) || [];


let generateItem = () => {
    return (shop.innerHTML = shopItems.map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x)=> x.id === id) || [];
        return `
        <div id="product-id-${id}" class="item">
                <img width="225px" src=${img} alt="" srcset="">
                <h2>${name}</h2>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        `
    }).join("")

    );
}



generateItem();

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
    localStorage.setItem("data",JSON.stringify(basket));
    update(id);
};

let decrement = (id) => {
    let search = basket.find((x) => x.id === id);

    if(search === undefined) 
        return
    else if (search.item === 0) {
        return;
    }
    else {
        search.item--;
    }

    // console.log(basket);
    update(id);
    basket = basket.filter((x)=>x.item!==0);
    localStorage.setItem("data",JSON.stringify(basket));
    
};


let update = (id) => {
    let search = basket.find((z) =>
        z.id === id
    )
    document.getElementById(id).innerHTML = search.item;
    cartItems();
}


let cartItems = () => {
    let cartNo = document.getElementById("cartAmount");

    cartNo.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

cartItems();