const wrapper = document.querySelector(".wrapper");
const loading = document.querySelector(".loading");
const btn = document.querySelector(".btn");
const category = document.querySelector(".category");

const BASE_URL = "https://dummyjson.com/products";
const limitCount = 5;
let offset = 1;
let currentCategory = "";

async function getData(endpoint, count) {
    loading.style.display = "block";

    try {
        const response = await fetch(`${BASE_URL}/${endpoint}?limit=${limitCount}&skip=${(count - 1) * limitCount}`);
        const res = await response.json();
        createProduct(res);
    } catch (err) {
        console.log(err);
    } finally {
        loading.style.display = "none";
    }
}

getData("", offset);

function createProduct(data) {
    data.products.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${product.thumbnail}" alt="">
          <h3>${product.title}</h3>
          <strong>$${product.price}</strong>
          <button class = "bTn" >Buy now</button>
        `;
        wrapper.appendChild(card);
    });
}

btn.addEventListener("click", () => {
    offset++;
    getData(currentCategory ? `category/${currentCategory}` : "", offset);
});

async function getCategory() {
    const response = await fetch(`${BASE_URL}/categories`);
    const data = await response.json();
    createCategory(data);
}

function createCategory(data) {
    data.forEach(item => {
        const liEL = document.createElement("li");
        const dataEL = document.createElement("data");
        liEL.className = "category__item";

        dataEL.innerHTML = item.name;
        dataEL.setAttribute("value", item.name);

        dataEL.addEventListener("click", (e) => {
            const categoryValue = e.target.getAttribute("value");
            currentCategory = categoryValue;
            offset = 1;
            wrapper.innerHTML = '';
            getData(`category/${categoryValue}`, offset);
        });

        liEL.appendChild(dataEL);
        category.appendChild(liEL);
    });
}

getCategory();
