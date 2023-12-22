const cartItems = JSON.parse(localStorage.getItem("flashSale")) || [];
const listItemsCart = document.querySelector(".main__cart-body");
const subtotal = document.querySelectorAll(".totalPrice");
const wishListItems = JSON.parse(localStorage.getItem("wishlist")) || [];

export function updateNumberItems() {
  const totalItems = document.querySelector("#totalItems > p");
  const numberOfCare = document.querySelector(".user__heart > span");
  const numberOfCart = document.querySelector(".user__cart > span");
  return { totalItems, numberOfCare, numberOfCart };
}

export function updateStatus(items) {
  const { totalItems, numberOfCare, numberOfCart } = updateNumberItems();
  totalItems.innerHTML = `${items.length || 0} items in your bag`;
  numberOfCare.innerHTML = wishListItems.length || 0;
  numberOfCart.innerHTML = items.length || 0;

  subtotal.forEach((item) => {
    item.innerHTML = totalBill(items);
  });
}

function render(items) {
  if (items.length > 0) {
    listItemsCart.innerHTML = items
      .map((item) => {
        const totalPriceItem = item.quantity * item.newPrice;
        return `
          <ul class="main__cart-item">
            <li>${item.name}</li>
            <li>${item.newPrice}</li>
            <li>
              <div class="item__change-quantity">
                <p>${item.quantity}</p>
                <div class="btn-icon">
                  <i class="fa-solid fa-chevron-up" data-id=${item.id}></i>
                  <i class="fa-solid fa-chevron-down" data-id=${item.id}></i>
                </div>
              </div>
            </li>
            <li>${totalPriceItem}</li>
          </ul>`;
      })
      .join("");
    updateStatus(items);
  } else {
    listItemsCart.innerHTML = `
        <ul class="main__cart-none">
          <p>Bạn chưa thêm sản phẩm nào vào giỏ hàng !! :(( </p>
        </ul>
      `;
    updateStatus(items);
  }
}

render(cartItems);

// Total Bill
function totalBill(items) {
  const totalPriceCart = items.reduce(
    (total, num) => total + num.newPrice * num.quantity,
    0
  );
  return totalPriceCart;
}

const updateCart = document.getElementById("updateCart");
const checkoutBtn = document.getElementById("checkout-done");

// Update Cart
updateCart.addEventListener("click", () => {
  console.log("Updated cart");
  render(cartItems);
  setTimeout(() => {
    alert("Đã cập nhật sản phẩm thành công");
  }, 1000);
});

//Checkout Cart
checkoutBtn.addEventListener("click", () => {
  const confirm = window.confirm("Bạn có muốn chắc chắn thanh toán không? ");
  if (confirm) {
    localStorage.setItem("flashSale", JSON.stringify([]));
    render([]);
    console.log("Checkout Done !");
  }
});

const decreaseBtns = document.querySelectorAll(".btn-icon > .fa-chevron-down");
const increaseBtns = document.querySelectorAll(".btn-icon > .fa-chevron-up");

decreaseBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-id");
    const index = cartItems.findIndex((item) => item.id === +id);
    if (index !== -1) {
      const cartItem = cartItems[index];
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
        console.log(cartItem);
      } else {
        const confirm = window.confirm("Are you sure you want ?");
        if (confirm) {
          cartItems.splice(index, 1);
        }
      }
    }
    render(cartItems);
    localStorage.setItem("flashSale", JSON.stringify(cartItems));
  });
});

increaseBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-id");
    const index = cartItems.findIndex((item) => item.id === +id);
    if (index !== -1) {
      const cartItem = cartItems[index];
      if (cartItem.quantity !== 0) {
        cartItem.quantity++;
        render(cartItems);
        localStorage.setItem("flashSale", JSON.stringify(cartItems));
      }
    }
  });
});
