// Array to store product objects
let products = [];

// Function to add product
function addProduct(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const productName = document.getElementById("productName").value;
  const serialNumber = document.getElementById("serialNumber").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;
  const expiryDate = document.getElementById("expiryDate").value;

  // Create product object
  const product = {
    name: productName,
    serialNumber: serialNumber,
    price: price,
    quantity: quantity,
    expiryDate: new Date(expiryDate),
  };

  // Add product to array
  products.push(product);

  // Clear form inputs
  document.getElementById("productName").value = "";
  document.getElementById("serialNumber").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("expiryDate").value = "";

  // Check if expiry date is less than one month from now
  const oneMonthBeforeExpiry = new Date(expiryDate);
  oneMonthBeforeExpiry.setMonth(oneMonthBeforeExpiry.getMonth() - 1);
  if (oneMonthBeforeExpiry < new Date()) {
    alert(
      `Product "${productName}" is already expired or expires within one month!`
    );
  }

  console.log("Product added:", product); // Log the added product
}

// Function to search for a product by serial number or name
function searchProduct() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const searchResult = products.find(
    (product) =>
      product.serialNumber.toLowerCase() === searchInput ||
      product.name.toLowerCase() === searchInput
  );
  if (searchResult) {
    const expiryTimeRemaining =
      (searchResult.expiryDate - new Date()) / (1000 * 60 * 60 * 24);
    const formattedExpiryDate = searchResult.expiryDate.toLocaleDateString();
    const productDetail = `
            Product Name: ${searchResult.name}<br>
            Serial Number: ${searchResult.serialNumber}<br>
            Price: ${searchResult.price}<br>
            Quantity: ${searchResult.quantity}<br>
            Expiry Date: ${formattedExpiryDate}<br>
            Expiry in: ${expiryTimeRemaining.toFixed(2)} days
        `;
    document.getElementById("searchResults").innerHTML = productDetail;
  } else {
    document.getElementById("searchResults").innerText = "Product not found";
  }
}

// Event listener for form submission
document.getElementById("productForm").addEventListener("submit", addProduct);

// Event listener for search button click
document
  .getElementById("searchButton")
  .addEventListener("click", searchProduct);
