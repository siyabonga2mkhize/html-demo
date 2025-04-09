let iconCart = document.querySelector('.icon-cart');
let close = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');


let listProducts =[];
let carts = [];

document.querySelector('.icon-cart').addEventListener('click', () => {
    document.body.classList.add('showCart');
  });
  
  document.querySelector('.close').addEventListener('click', () => {
    document.body.classList.remove('showCart');
  });
  

const addDataToHtml = () => 
    {
    listProductHTML.innerHTML = '';
    if (listProducts.length > 0)
        {
        listProducts.forEach(product => 
            {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}" alt="White tee">
                <h2>${product.name} </h2>
                <div class="price">${product.price}</div>
                <button class="addCart">
                Add to Cart
                </button>
            `;
            listProductHTML.appendChild(newProduct);
            
        });
    }

}  

listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart'))
            {
                let product_id = positionClick.parentElement.dataset.id;
                addToCart(product_id);        
            }
    })
        
const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0 ||  positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        })
    }else {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    console.log(carts);
    addToCartToHtml();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('carts', JSON.stringify(carts));
}

const addToCartToHtml = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (carts.length > 0){
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let product = listProducts.find(product => product.id == cart.product_id);
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            newCart.innerHTML = `
                <div class="image">
        <img src= ${product.image} alt="">
      </div>
    <div class="name"> 
      ${product.name}
    </div>
      <div class="totalPrice">
        ${product.price * cart.quantity}
      </div>
      <div class="quantity" data-id="${cart.product_id}">
        <span class="minus"><</span>
        <span>${cart.quantity}</span>
        <span class="plus">></span>
            `;
            listCartHTML.appendChild(newCart);
    })
    }
    iconCartSpan.innerHTML = totalQuantity;
}
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.dataset.id;
        console.log(product_id);
        let type = 'minus'
        if(positionClick.classList.contains('plus')){
            type = 'plus'
        }
        changeQuantity(product_id, type);

    }
})
const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0){
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;
        
            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if(valueChange > 0){
                    carts[positionItemInCart].quantity = valueChange;
                }else{
                    carts.splice(positionItemInCart, 1);
                }
                break;
            }
        }
        addCartToMemory();
        addToCartToHtml();
}

const initApp = () => 
    {
    //get data from json 
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHtml(listProducts);

        //get cart from memory
        if(localStorage.getItem('carts')){
            carts = JSON.parse(localStorage.getItem('carts'));
            addToCartToHtml();
        }
    });
};

initApp();