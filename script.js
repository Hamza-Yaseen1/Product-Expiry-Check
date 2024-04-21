let products = [];

function addProduct(event) {
    event.preventDefault(); 

    const productName = document.getElementById('productName').value;
    const serialNumber = document.getElementById('serialNumber').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    const expiryDate = document.getElementById('expiryDate').value;

    const product = {
        name: productName,
        serialNumber: serialNumber,
        price: price,
        quantity: quantity,
        expiryDate: new Date(expiryDate)
    };

    products.push(product);

    document.getElementById('productName').value = '';
    document.getElementById('serialNumber').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('expiryDate').value = '';

    const oneMonthBeforeExpiry = new Date(expiryDate);
    oneMonthBeforeExpiry.setMonth(oneMonthBeforeExpiry.getMonth() - 1);
    if (oneMonthBeforeExpiry < new Date()) {
        alert(`Product "${productName}" is already expired or expires within one month!`);
    }

    console.log('Product added:', product);
}

function sellProduct(event) {
    event.preventDefault(); 

    const sellProductName = document.getElementById('sellProductName').value;
    const sellQuantity = parseInt(document.getElementById('sellQuantity').value);

    const productIndex = products.findIndex(product => product.name.toLowerCase() === sellProductName.toLowerCase());

    if (productIndex !== -1) {
        if (products[productIndex].quantity >= sellQuantity) {
            products[productIndex].quantity -= sellQuantity;
            console.log(`Sold ${sellQuantity} units of ${sellProductName}`);
            alert(`Sold ${sellQuantity} units of ${sellProductName}`);
        } else {
            alert(`Not enough quantity of ${sellProductName} available`);
        }
    } else {
        alert(`${sellProductName} not found in inventory`);
    }

    document.getElementById('sellProductName').value = '';
    document.getElementById('sellQuantity').value = '';
}

function searchProduct() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const searchResult = products.find(product => 
        product.serialNumber.toLowerCase() === searchInput || 
        product.name.toLowerCase() === searchInput
    );
    if (searchResult) {
        const expiryTimeRemaining = (searchResult.expiryDate - new Date()) / (1000 * 60 * 60 * 24);
        const formattedExpiryDate = searchResult.expiryDate.toLocaleDateString();
        const productDetail = `
            Product Name: ${searchResult.name}<br>
            Serial Number: ${searchResult.serialNumber}<br>
            Price: ${searchResult.price}<br>
            Quantity: ${searchResult.quantity}<br>
            Expiry Date: ${formattedExpiryDate}<br>
            Expiry in: ${expiryTimeRemaining.toFixed(2)} days
        `;
        document.getElementById('searchResults').innerHTML = productDetail;
    } else {
        document.getElementById('searchResults').innerText = 'Product not found';
    }
}

document.getElementById('productForm').addEventListener('submit', addProduct);
document.getElementById('sellForm').addEventListener('submit', sellProduct);
document.getElementById('searchButton').addEventListener('click', searchProduct);
