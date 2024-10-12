const wrapper = document.querySelector(".wrapper");
const loading = document.querySelector(".loading");
const btn = document.querySelector(".btn");

const BASE_URL = "https://dummyjson.com/products";
const limitCount = 5
let offset = 1

async function getData(endpoint, count) {
    loading.style.display = "block";

    try {
        const response = await fetch(`${BASE_URL}?limit=${limitCount}&skip=${(count - 1) * limitCount}`);
        const res = await response.json();
        createProduct(res);
    } catch (err) {
        console.log(err)
    } finally {
        loading.style.display = "none";
    }
}

getData("", offset)

function createProduct(data) {
    data.products.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}" style="width:100px; height:100px">
          <h3>${product.title}</h3>
          <strong>$${product.price}</strong>
          <button>Buy now</button>
        `;
        wrapper.appendChild(card)
    });
}

btn.addEventListener("click", () => {
    offset++
    getData("", offset)
});
