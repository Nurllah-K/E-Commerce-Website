const categoryList = document.querySelector("#category-list")

// console.log(categoryList)
const productsList = document.getElementById("products")

// console.log(productsList)
const openButton = document.querySelector("#open-button");
// console.log(openButton)

const closeButton = document.querySelector("#close-button");
// console.log(closeButton)

const modal = document.getElementById("modal")
// console.log(modal)

const modalList = document.querySelector(".modal-list")

const totalPrice = document.getElementById("total-price");


function fetchCategories() {
  fetch("https://fakestoreapi.com/products").then((response) => response.json())
    .then((data) => data.slice(0, 5).map((categoryy) => {
      const { category, image } = categoryy;

      const categoryDiv = document.createElement("div")
      categoryDiv.classList.add("category");
      categoryDiv.innerHTML = `  <img src=${image} alt=""/>
      <span>${category}</span>`;

      // console.log(categoryDiv)
      categoryList.appendChild(categoryDiv);
    }))
    .catch((error) => console.log(error));

}
fetchCategories();


function fetchProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => data.map((product) => {
      const { title, price, category, id, image } = product;

      const productDiv = document.createElement("div");

      productDiv.classList.add("product");
      productDiv.innerHTML = `
          <img src="${image}" alt="">
          <p>${title}</p>
          <p>${category}</p>
          <div class="product-action">
            <p>${price}$</p>
            <button onclick="addToBasket({id:${id},title:'${title}',price:${price},image:'${image}',amount:1})">Sepete Ekle</button>
          </div>`;
      productsList.appendChild(productDiv);
    })
    )
    .catch((error) => console.log(error));
}

fetchProducts();

let basket = [];
let total = 0;

function addToBasket(product) {
  // console.log(product)
  const idEleman = basket.find(
    (sepettekiEleman) => sepettekiEleman.id === product.id
  );
  //console.log(idEleman);

  if (idEleman) {
    idEleman.amount++;
  } else {
    basket.push(product);
  }
}

function showBasketItems() {
  total = 0;
  basket.map((basketProduct) => {

    const listItem = document.createElement("div");

    listItem.classList.add("list-item");


    const { image, title, price, amount, id, } = basketProduct


    listItem.innerHTML = `<img src=${image} alt="" />
<h4>${title}</h4>
<h4 class="price">${price}$</h4>
<p>Miktar: ${amount}</p>
<button class="delete-button"  onclick='deleteItem({id:${id},price:${price},amount:${amount}})'>Sil</button> `;

    modalList.appendChild(listItem);
    total += price * amount;
  });

}


openButton.addEventListener("click", () => {
  showBasketItems();
  modal.classList.add("active");

  totalPrice.innerText = total;

});

closeButton.addEventListener("click", () => {
  modal.classList.remove("active")
  modalList.innerHTML = '';
  total = 0;
});


modal.addEventListener("click", (event) => {
  // console.log(event.target)
  if (event.target.classList.contains("modal-wrapper")) {
    modal.classList.remove("active")

  }
})

function deleteItem(willDeleteItem) {
  console.log("silinmeden önce", basket)

  basket = basket.filter((eleman) => eleman.id !== willDeleteItem.id)
  console.log('sildikten sonra', basket)

  total -= willDeleteItem.price * willDeleteItem.amount
  totalPrice.innerText = total
}

modalList.addEventListener('click', (tiklamaOlayiBilgileri) => {

  if (tiklamaOlayiBilgileri.target.classList.contains('delete-button')) {


    tiklamaOlayiBilgileri.target.parentElement.remove();
  }

  if (basket.length === 0) {

    modal.classList.remove('active');
  }
});