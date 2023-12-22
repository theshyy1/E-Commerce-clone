const flashSaleItems = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    oldPrice: 160,
    newPrice: 120,
    image: "https://picsum.photos/190/180",
    stock: 88,
    sales: 40,
    star: 4,
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    oldPrice: 960,
    newPrice: 1160,
    image: "https://picsum.photos/190/180",
    stock: 75,
    sales: 35,
    star: 5,
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    oldPrice: 370,
    newPrice: 400,
    image: "https://picsum.photos/190/180",
    stock: 99,
    sales: 25,
    star: 2,
  },
  {
    id: 4,
    name: "S-Series Comfort Chair ",
    oldPrice: 375,
    newPrice: 400,
    image: "https://picsum.photos/190/180",
    stock: 102,
    sales: 30,
    star: 3,
  },
  {
    id: 5,
    name: "S-Series Comfort Chair ",
    oldPrice: 130,
    newPrice: 90,
    image: "https://picsum.photos/190/180",
    stock: 64,
    sales: 25,
    star: 3,
  },
];

const wishListItems = JSON.parse(localStorage.getItem("wishlist")) || [];
const cartItems = JSON.parse(localStorage.getItem("flashSale")) || [];
const wishItems = document.querySelector(".main__products-list");

// Query elements
function getQuery() {
  const cartItems = JSON.parse(localStorage.getItem("flashSale")) || [];
  const numberOfCare = document.querySelector(".user__heart > span");
  const numberOfCart = document.querySelector(".user__cart > span");
  const wishListNumber = document.querySelector(".wishListNumber");
  return { numberOfCare, numberOfCart, wishListNumber, cartItems };
}

// Update newest status number
function updateStatusWishList(items) {
  const { numberOfCare, numberOfCart, wishListNumber, cartItems } = getQuery();
  numberOfCart.innerHTML = cartItems.length || 0;
  numberOfCare.innerHTML = items.length || 0;
  wishListNumber.innerHTML = `(${items.length || 0})`;
}

function render(items) {
  wishItems.innerHTML = items
    .map((item) => {
      return `
        <div class="main__products-item">
          <div class="products__img">
            <img src="${item?.image}" alt="" />
            <span class="products__img-saleoff">-${item?.sales}%</span>
            <div class="products__body-care" data-id=${item?.id}>
              <i class="fa-solid fa-trash-can"></i>
            </div>
            <span class="addToCart" data-id=${item?.id}
              ><i class="fa-solid fa-cart-shopping"></i> Add To Cart</span
            >
          </div>
          <div class="products__body">
            <h3>${item?.name}</h3>
            <p>$${item?.newPrice}<span>$${item?.oldPrice}</span></p>
          </div>
        </div>`;
    })
    .join("");
  updateStatusWishList(items);
}

render(wishListItems);

// Add a wish list to cart
const items = document.querySelectorAll(".addToCart");
items.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productId = btn.getAttribute("data-id");
    const product = flashSaleItems.find((item) => item.id === +productId);

    const cartItem = cartItems.findIndex((item) => item.id === +productId);
    if (cartItem !== -1) {
      cartItems[cartItem].quantity += 1;
    } else {
      cartItems.unshift({ ...product, quantity: 1 });
    }
    localStorage.setItem("flashSale", JSON.stringify(cartItems));
  });
});

// Move All wishlist to cart
const moveAllTobag = document.getElementById("moveAllTobag");
moveAllTobag.addEventListener("click", () => {
  const allItemsCare = [
    ...cartItems,
    ...wishListItems.map((item) => ({ ...item, quantity: 1 })),
  ];
  const uniqueItems = new Set(allItemsCare.map((item) => item.id));
  const myLastItems = [...uniqueItems].map((id) =>
    allItemsCare.find((obj) => obj.id === id)
  );

  localStorage.setItem("flashSale", JSON.stringify(myLastItems));

  localStorage.setItem("wishlist", JSON.stringify([]));
  render([]);
});

const trashItems = document.querySelectorAll(".products__body-care");

trashItems.forEach((btn) => {
  btn.addEventListener("click", () => {
    const wishListItems = JSON.parse(localStorage.getItem("wishlist")) || [];

    const productId = btn.getAttribute("data-id");
    const index = wishListItems.findIndex((item) => item.id === +productId);

    if (index !== -1) {
      wishListItems.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishListItems));
      render(wishListItems);
    }
  });
});
