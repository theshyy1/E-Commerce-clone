// const flashSaleItems = [
//   {
//     id: 1,
//     name: "HAVIT HV-G92 Gamepad",
//     oldPrice: 160,
//     newPrice: 120,
//     image: "https://picsum.photos/190/180",
//     stock: 88,
//     sales: 40,
//     star: 4,
//   },
//   {
//     id: 2,
//     name: "AK-900 Wired Keyboard",
//     oldPrice: 960,
//     newPrice: 1160,
//     image: "https://picsum.photos/190/180",
//     stock: 75,
//     sales: 35,
//     star: 5,
//   },
//   {
//     id: 3,
//     name: "IPS LCD Gaming Monitor",
//     oldPrice: 370,
//     newPrice: 400,
//     image: "https://picsum.photos/190/180",
//     stock: 99,
//     sales: 25,
//     star: 2,
//   },
//   {
//     id: 4,
//     name: "S-Series Comfort Chair ",
//     oldPrice: 375,
//     newPrice: 400,
//     image: "https://picsum.photos/190/180",
//     stock: 102,
//     sales: 30,
//     star: 3,
//   },
//   {
//     id: 5,
//     name: "S-Series Comfort Chair ",
//     oldPrice: 130,
//     newPrice: 90,
//     image: "https://picsum.photos/190/180",
//     stock: 64,
//     sales: 25,
//     star: 3,
//   },
// ];
const limit = 8;
async function getData(page, limit) {
  const res = await axios.get(
    `http://localhost:3000/flashSaleItems?_page=${page}&_limit=${limit}`
  );
  return res;
}

const flashSaleItems = await getData(1, limit);

const totalItems = Number(flashSaleItems.headers["x-total-count"]) || 0;
const totalPages = Number(Math.ceil(totalItems / limit) || 1);

const listItems = document.getElementById("main__list");
const itemInCart = document.querySelector(".user__cart > span");
const itemInWishList = document.querySelector(".user__heart > span");

function renderStarRating(star) {
  const maxStars = 5;
  const filledStars = Math.min(star, maxStars);

  const starIcons = Array(maxStars)
    .fill('<li><i class="fa-solid fa-star"></i></li>')
    .map((icon, index) =>
      index < filledStars ? icon : '<li><i class="fa-regular fa-star"></i></li>'
    )
    .join("");

  return `
    <ul class="products__body-star">
      ${starIcons}
    </ul>`;
}

function render(items) {
  listItems.innerHTML = items
    .map((item) => {
      const starRating = renderStarRating(item.star);
      return `
        <div class="main__products-item">
          <div class="products__img">
            <img src="${item.image}" alt="" />
            <span class="products__img-saleoff">-${item.sales}%</span>
            <div class="products__body-care" data-id=${item.id}>
              <i class="fa-regular fa-heart"></i>
            </div>
            <div class="products__body-show">
              <i class="fa-regular fa-eye"></i>
            </div>
            <button class="addToCart" data-id=${item.id}>Add To Cart</button>
          </div>
          <div class="products__body">
            <h3>${item.name}</h3>
            <p>$${item.newPrice} <span>$${item.oldPrice}</span></p>
            <ul class="products__body-star">
              ${starRating}      
              <span>(${item.stock})</span>
            </ul>
          </div>
       </div>`;
    })
    .join("");
}

render(flashSaleItems.data);

const pagination = document.querySelector(".pagination");
pagination.innerHTML = Array(totalPages)
  .fill(0)
  .map((_, index) => {
    const pageNumber = index + 1;
    return `<li class="page-item" data-id=${pageNumber}>
        <a class="page-link">${pageNumber}</a>
      </li>`;
  })
  .join("");

const pageItems = document.querySelectorAll(".pagination > .page-item");

pageItems.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const id = btn.getAttribute("data-id");
    const flashSaleItems = await getData(id, limit);
    render(flashSaleItems.data);
  });
});

// Storage Cart
const addToCart = document.querySelectorAll(".addToCart");
const cartItems = JSON.parse(localStorage.getItem("flashSale")) || [];
const wishItems = JSON.parse(localStorage.getItem("wishlist")) || [];
itemInCart.innerHTML = cartItems.length || 0;

addToCart.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productId = btn.getAttribute("data-id");
    const product = flashSaleItems.data.find((item) => item.id === +productId);

    const cartItem = cartItems.findIndex((item) => item.id === +productId);
    if (cartItem !== -1) {
      cartItems[cartItem].quantity += 1;
    } else {
      cartItems.unshift({ ...product, quantity: 1 });
    }
    localStorage.setItem("flashSale", JSON.stringify(cartItems));
    itemInCart.innerHTML = cartItems.length || 0;
  });
});

// Storage Wishlist
const wishListItem = document.querySelectorAll(".products__body-care");
itemInWishList.innerHTML = wishItems.length || 0;

wishListItem.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productId = btn.getAttribute("data-id");
    console.log(productId);
    const product = flashSaleItems.data.find((item) => item.id === +productId);
    // console.log(product);

    const wishItem = wishItems.findIndex((item) => item.id === +productId);
    if (wishItem !== -1) {
      return;
    } else {
      wishItems.unshift(product);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishItems));
    itemInWishList.innerHTML = wishItems.length || 0;
  });
});

const app = document.getElementById("root");
