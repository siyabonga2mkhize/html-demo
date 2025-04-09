let iconCart = document.querySelector('.icon-cart');
let close = document.querySelector('.close');
let body = document.querySelector('body');
let listProductsHTML = document.querySelector('.listProduct');


let listProducts =[];

document.querySelector('.icon-cart').addEventListener('click', () => {
    document.body.classList.add('showCart');
  });
  
  document.querySelector('.close').addEventListener('click', () => {
    document.body.classList.remove('showCart');
  });
  

const addDataToHtml = () => 
    {
    listProductsHTML.innerHTML = '';
    if (listProducts.length > 0)
        {
        listProducts.forEach(product => 
            {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <img src="${product.image}" alt="White tee">
                <h2>${product.name} </h2>
                <div class="price">${product.price}</div>
                <button class="addCart">
                Add to Cart
                </button>
            `;
            listProductsHTML.appendChild(newProduct);
            
        });
    }

}  
const initApp = () => 
    {
    //get data from json 
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHtml(listProducts);
    });
};

initApp();