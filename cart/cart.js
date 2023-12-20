// const cartItems = [
//   {
//     id: 1,
//     name: "HAVIT HV-G92 Gamepad",
//     oldPrice: 160,
//     newPrice: 120,
//     image: "https://picsum.photos/190/180",
//     stock: 88,
//     sales: 40,
//     quantity: 2,
//   },
//   {
//     id: 2,
//     name: "AK-900 Wired Keyboard",
//     oldPrice: 960,
//     newPrice: 1160,
//     image: "https://picsum.photos/190/180",
//     stock: 75,
//     sales: 35,
//     quantity: 2,
//   },
//   {
//     id: 5,
//     name: "S-Series Comfort Chair ",
//     oldPrice: 130,
//     newPrice: 90,
//     image: "https://picsum.photos/190/180",
//     stock: 64,
//     sales: 25,
//     quantity: 3,
//   },
// ];

const cartItems1 = JSON.parse(localStorage.getItem("flashSale")) || [];
const listItemsCart = document.querySelector(".main__cart-body");
const subtotal = document.querySelectorAll(".totalPrice");

listItemsCart.innerHTML = cartItems1
  .map((item) => {
    return `
    <ul class="main__cart-item">
    <li>${item.name}</li>
    <li>${item.newPrice}</li>
    <li>
      <div class="item__change-quantity">
        <p>${item.quantity}</p>
        <div class="btn-icon">
          <i class="fa-solid fa-chevron-up"></i>
          <i class="fa-solid fa-chevron-down"></i>
        </div>
      </div>
    </li>
    <li>${item.newPrice * item.quantity}</li>
  </ul>`;
  })
  .join("");

const totalPriceCart = cartItems1.reduce(
  (total, num) => total + num.newPrice * num.quantity,
  0
);

subtotal.forEach((item) => {
  item.innerHTML = totalPriceCart;
});
