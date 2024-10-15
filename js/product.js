const content = document.querySelector(".content");
const review = document.querySelector(".review");
const BASE_URL = "https://dummyjson.com/products";

async function getData() {
    let query = new URLSearchParams(window.location.search);
    let id = query.get("q");

    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        const res = await response.json();
        createContent(res);
    } catch (err) {
        console.log(err);
    }
}

getData();
function createContent(data) {
    console.log(data);
    content.innerHTML = `
        <div>
            <div>
               <img src="${data.images[0]}" class="content__image main__image" alt="${data.title}">
            </div>

            <div>
                ${data.images.map(i => `<img src="${i}" class="image__item" alt="${data.title}">`).join('')}
            </div>
        </div>
        <div>
            <h1>${data.title}</h1>
            <h2>$${data.price}</h2>
            <p>${data.description}</p>
            <button>Buy now</button>
            <ul>
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
                <li>Lorem, ipsum dolor.</li>
            </ul>
        </div>
    `;

    if (data.reviews && data.reviews.length > 0) {
        data.reviews.forEach(item => {
            const divEL = document.createElement("div");
            divEL.className = "review__item";
            divEL.innerHTML = `
                <h3>${item.comment}</h3>
                <p>Reviewer: ${item.reviewerName}</p>
                <div>
                    ${'<i class="fa-solid fa-star"></i>'.repeat(item.rating)}  
                    ${'<i class="fa-regular fa-star"></i>'.repeat(5 - item.rating)}
                </div>
            `;
            review.appendChild(divEL);
        });
    } else {
        review.innerHTML = '<p>No reviews available.</p>';
    }
}
