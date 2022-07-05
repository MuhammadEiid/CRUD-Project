// Regex Variables
var myRegex = /^[A-Z]/; //pattern

// Global Variables
var pNameInput = document.getElementById("pName");
var pPriceInput = document.getElementById("pPrice");
var pCatInput = document.getElementById("pCat");
var pDescInput = document.getElementById("pDesc");
var searchInput = document.getElementById("searchForProduct");

if (localStorage.getItem("storage") == null) {

    var cartona = [];

} else {

    var cartona = JSON.parse(localStorage.getItem("storage"));

    displayProducts(cartona);
}



function addProduct() {

    var oneProduct = {
        pName: pNameInput.value,
        pPrice: pPriceInput.value,
        pCat: pCatInput.value,
        pDesc: pDescInput.value,
    }

    cartona.push(oneProduct);

    displayProducts(cartona);

    clearInputs();

    localStorage.setItem("storage", JSON.stringify(cartona));
}


function deleteProduct(productIndex) {

    cartona.splice(productIndex, 1);

    localStorage.setItem('storage', JSON.stringify(cartona));

    displayProducts(cartona);
}

function reviewProduct(productIndex) {
    pNameInput.value = cartona[productIndex].pName;
    pPriceInput.value = cartona[productIndex].pPrice;
    pCatInput.value = cartona[productIndex].pCat;
    pDescInput.value = cartona[productIndex].pDesc;

    document.getElementById("buttons-area").innerHTML = `
    <button onclick="updateProduct(${productIndex})" class="btn btn-warning text-white">Update Product</button>
    `
}


function updateProduct(productIndex) {
    cartona[productIndex].pName = pNameInput.value;
    cartona[productIndex].pPrice = pPriceInput.value;
    cartona[productIndex].pDesc = pDescInput.value;
    cartona[productIndex].pCat = pCatInput.value;

    displayProducts(cartona);
    clearInputs();
    localStorage.setItem("storage", JSON.stringify(cartona));

    document.getElementById("buttons-area").innerHTML = `
    <button onclick="addProduct()" class="btn btn-warning text-white">Update Product</button>
    `
}

function displayProducts(requiredArray) {
    var products = ``;

    for (i = 0; i < requiredArray.length; i++) {

        products += `<tr>
    <td>${requiredArray[i].pName}</td>
    <td>${requiredArray[i].pPrice}</td>
    <td>${requiredArray[i].pCat}</td>
    <td>${requiredArray[i].pDesc}</td>

    <td>
    <button onclick="reviewProduct(${i})" class="btn btn-warning text-light">Update</button>
    </td>

    <td>
    <button onclick="deleteProduct(${i})" class="btn btn-danger text-light">Delete</button>
    </td>
    </tr>`
    }

    document.getElementById('tBody').innerHTML = products;

}


function clearInputs() {
    pNameInput.value = "";
    pPriceInput.value = "";
    pCatInput.value = "";
    pDescInput.value = "";
}


function searchBar() {
    var searchProduct = searchInput.value;
    var foundProducts = [];

    for (var i = 0; i < cartona.length; i++) {
        if (cartona[i].pName.includes(searchProduct))
        {
            foundProducts.push(cartona[i]);
        }
    }

    displayProducts(foundProducts);
}