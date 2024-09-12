
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");
var productSearch = document.getElementById("productSearch");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var productSearch = document.getElementById("productSearch");
addBtn.addEventListener('click', addProduct);
updateBtn.addEventListener('click', updateProduct);
productSearch.addEventListener("input", searchProduct);




var productContainer;
if (localStorage.getItem("proudcts") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem('proudcts'));
  displayProduct(productContainer);
}


function addProduct() {
  var product = {
    code: productName.value,
    price: productPrice.value,
    category: productCat.value,
    description: productDesc.value,
    image: "GGGGG",
  };
  if (
    productName.classList.contains("is-valid") &&
    productPrice.classList.contains("is-valid") &&
    productCat.classList.contains("is-valid") &&
    productDesc.classList.contains("is-valid")
  ) {
    productContainer.push(product);
    localStorage.setItem("proudcts", JSON.stringify(productContainer));

    displayProduct(productContainer);
    clearProduct();
    productName.classList.remove("is-valid");
    productPrice.classList.remove("is-valid");
    productCat.classList.remove("is-valid");
    productDesc.classList.remove("is-valid");
  }
  else {
     boxModal.classList.remove("d-none");
  }
}

function clearProduct() {
  productName.value =null;
  productPrice.value =null;
  productCat.value = null;
  productDesc.value = null;
}

function displayProduct(arr) {

  var cartona = ''
  for (var i = 0; i < arr.length; i++) { 
    cartona += `<div class="col-md-2 text-center border border-1 rounded-2 p-2 me-2 bg-light text-darkshadow-lg">
    <h5>product name</h5>
<p>${arr[i].code}</p>
    <h5>product price</h5>
<p>${arr[i].price}</p>
    <h5>product category</h5>
<p>${arr[i].category}</p>
    <h5>product description</h5>
<p>${arr[i].description}</p>
    <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
    <button onclick="setFormForUpdate(${i})" class="btn update">update</button>
    </div>`; 
  }

document.getElementById('demo').innerHTML=cartona

}

function deleteProduct(index) {
  productContainer.splice(index, 1);
  localStorage.setItem('proudcts',JSON.stringify(productContainer))
  displayProduct(productContainer);
}


function searchProduct() { 
  var term = productSearch.value;
  var searchArr = []
  for (var i = 0; i < productContainer.length; i++) {
    if (productContainer[i].code.toLowerCase().includes(term.toLowerCase())) { 
searchArr.push(productContainer[i]);
  }

}
displayProduct(searchArr)
  
}
var myIndex;
function setFormForUpdate(index) {
myIndex = index
addBtn.classList.add('d-none')
  updateBtn.classList.remove('d-none')
  productName.value = productContainer[index].code
  productPrice.value = productContainer[index].price
  productCat.value = productContainer[index].category
  productDesc.value = productContainer[index].description
}

function updateProduct() { 
     validation(productName);
     validation(productPrice);
     validation(productCat);
     validation(productDesc);
  if (
    productName.classList.contains("is-valid") &&
    productPrice.classList.contains("is-valid") &&
    productCat.classList.contains("is-valid") &&
    productDesc.classList.contains("is-valid")
  ) {
    productContainer[myIndex].code = productName.value;
    productContainer[myIndex].price = productPrice.value;
    productContainer[myIndex].category = productCat.value;
    productContainer[myIndex].description = productDesc.value;
    displayProduct(productContainer);
    localStorage.setItem("proudcts", JSON.stringify(productContainer));

    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");

    clearProduct();
        productName.classList.remove("is-valid");
        productPrice.classList.remove("is-valid");
        productCat.classList.remove("is-valid");
        productDesc.classList.remove("is-valid");
  } else {
    boxModal.classList.remove("d-none");
  }
}

function validation(element) {
  var regex = {
    productName: /^[a-zA-Z0-9 ]{3,50}$/,
    productPrice: /^\d+(\.\d{1,2})?$/,
    productDesc: /^.{4,500}$/,
    productCat: /^(tv|Android|laptop|iphone|Tv|Android|Laptop|Iphone)$/,
  };
    if (regex[element.id].test(element.value) == true) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      element.nextElementSibling.classList.replace("d-block", "d-none");
    } else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
element.nextElementSibling.classList.replace('d-none','d-block')
    }
}

function closeModal() {
  boxModal.classList.add("d-none");
}
closeBtn.addEventListener("click", closeModal);

