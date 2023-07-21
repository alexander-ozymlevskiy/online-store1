const productsContainer = document.querySelector(".products");
const categoriesList = document.querySelector(".categories");
const productInfo = document.querySelector(".product-info");
const productName = document.querySelector(".product-name");
const buyButton = document.querySelector(".buy-button");
const orderFormModal = document.querySelector("#orderFormModal");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");
const orderDetailsContainer = document.getElementById("orderDetails");

const listOfGoods = {
  Оздоблювальні: ["Гіпсокартонні системи", "Будівельна хімія", "Клейові суміші"],
  Загальнобудівельні: ["Сітка металева", "Цемент, пісок, щебінь", "Газоблок"],
  Покрівля: ["Бітумна черепиця", "Металочерепиця", "Водостічні системи"],
};

categoriesList.addEventListener("click", (event) => {
  if (event.target.matches(".categories_link")) {
    const category = event.target.innerText;
    productsContainer.innerHTML = listOfGoods[category].map((product) => `<p>${product}</p>`).join("");
  }
});

productsContainer.addEventListener("click", (event) => {
  if (event.target.matches("p")) {
    productName.textContent = event.target.textContent;
    productInfo.style.display = "block";
    buyButton.style.display = "block";
  }
});

buyButton.addEventListener("click", () => {
  modal.style.display = "block";
});

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

function closeModal() {
  modal.style.display = "none";
}

orderFormModal.addEventListener("submit", (event) => {
  event.preventDefault();
  orderDetailsContainer.style.display = "block";

  const orderDetails = {
    product: productName.textContent,
    fullName: document.getElementById("fullName").value,
    city: document.getElementById("city").value,
    novaPoshta: document.getElementById("novaPoshta").value,
    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
    quantity: document.getElementById("quantity").value,
    comment: document.getElementById("comment").value,
  };

  orderDetailsContainer.innerHTML = `
    <h2>Інформація про замовлення</h2>
    <p><strong>Товар:</strong> ${orderDetails.product}</p>
    <p><strong>ПІБ покупця:</strong> ${orderDetails.fullName}</p>
    <p><strong>Місто:</strong> ${orderDetails.city}</p>
    <p><strong>Склад Нової пошти:</strong> ${orderDetails.novaPoshta}</p>
    <p><strong>Спосіб оплати:</strong> ${orderDetails.paymentMethod}</p>
    <p><strong>Кількість продукції:</strong> ${orderDetails.quantity}</p>
    <p><strong>Коментар до замовлення:</strong> ${orderDetails.comment}</p>
  `;

  modal.style.display = "none";
  productsContainer.innerHTML = "";
  productInfo.style.display = "none";
  buyButton.style.display = "none";
});