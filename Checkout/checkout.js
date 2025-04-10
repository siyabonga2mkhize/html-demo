//download receipt
function downloadReceipt() {
    const cartItems = JSON.parse(localStorage.getItem('carts')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const receiptNumber = document.getElementById('receiptNumber').textContent;
    
    let content = "Receipt from Woolworths\n\n";
    content += `Receipt Number: ${receiptNumber}\n`;
    content += `Order Date: ${new Date().toLocaleDateString()}\n\n`;
    content += "Items:\n";

    let subtotal = 0;
    cartItems.forEach(cart => {
        const product = products.find(p => p.id == cart.product_id);
        if (product) {
            const itemTotal = product.price * cart.quantity;
            subtotal += itemTotal;
            content += `${product.name} - Quantity: ${cart.quantity}, Price: R${product.price}, Subtotal: R${itemTotal.toFixed(2)}\n`;
        }
    });

    const vat = (subtotal * 15.5) / 100;
    const total = subtotal + vat;

    content += `\nSubtotal: R${subtotal.toFixed(2)}\n`;
    content += `VAT (15.5%): R${vat.toFixed(2)}\n`;
    content += `Total: R${total.toFixed(2)}\n`;
    content += "Thank you for shopping with us!";
    let blob = new Blob([content], { type: "text/plain" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "receipt.txt";
    a.click();
}

function showMessage() {
    alert("This button works!");
}

window.onload = function () {
    const cartListContainer = document.querySelector('#cartItems'); 
    const cartItems = JSON.parse(localStorage.getItem('carts')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
  
    let totalPrice = 0;
    let totalQuantity = 0;
  
    cartListContainer.innerHTML = '';
  
    cartItems.forEach(cart => {
      const product = products.find(p => p.id == cart.product_id);
      const subtotal = product.price * cart.quantity;
  
      totalPrice += subtotal;
      totalQuantity += cart.quantity;
  
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('itemcheckout');
      itemDiv.innerHTML = `
        <img src="../${product.image}" alt="${product.name}">
        <div class="name">${product.name}</div>
        <div class="price">R${product.price}</div>
        <div class="quantity">Quantity: ${cart.quantity}</div>
        <div class="subtotal">Subtotal: R${subtotal}</div>
      `;
      cartListContainer.appendChild(itemDiv);
    });
  
    document.querySelector('.totalQuantity').innerText = totalQuantity;
    document.querySelector('.totalPrice').innerText = "R" + totalPrice;
};

function generateReceiptNumber() {
    return 'REC-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}

function calculateSummary() {
    const cartItems = JSON.parse(localStorage.getItem('carts')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    let subtotal = 0;
    cartItems.forEach(cart => {
        const product = products.find(p => p.id == cart.product_id);
        if (product) {
            subtotal += product.price * cart.quantity;
        }
    });

    const vat = (subtotal * 15.5) / 100;
    const total = subtotal + vat;

    document.getElementById('receiptNumber').textContent = generateReceiptNumber();
    document.getElementById('orderDate').textContent = new Date().toLocaleDateString();
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('vat').textContent = vat.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}
calculateSummary();


/*go to cart and collection policy*/
    function goToCart() {
        // Navigate to the Cart page
        window.location.href = '/index.html';
    }

    function goToCollection() {
        // Navigate to the Collection Policy page
        window.location.href = '/Checkout/collection.html';
    }
