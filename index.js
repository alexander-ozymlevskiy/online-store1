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
  Оздоблювальні: [
    "Гіпсокартонні системи",
    "Будівельна хімія",
    "Клейові суміші",
  ],
  Загальнобудівельні: ["Сітка металева", "Цемент, пісок, щебінь", "Газоблок"],
  Покрівля: ["Бітумна черепиця", "Металочерепиця", "Водостічні системи"],
};

categoriesList.addEventListener("click", (event) => {
  if (event.target.matches(".categories_link")) {
    const category = event.target.innerText;
    productsContainer.innerHTML = listOfGoods[category]
      .map((product) => `<p>${product}</p>`)
      .join("");
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

const getFormData = () => {
  const formData = new FormData(document.getElementById("orderFormModal"));
  const entries = formData.entries();
  const data = Object.fromEntries(entries);


  if (!data.fullName || !data.city || !data.novaPoshta || !data.paymentMethod || !data.quantity) {
    alert("Будь ласка, заповніть усі обов'язкові поля.");
    return;
  }

  if (isNaN(data.quantity) || +data.quantity < 1) {
    alert("Будь ласка, введіть коректне значення для кількості продукції.");
    return;
  }

  displayOrderDetails(data);
};

document.getElementById("orderFormModal").addEventListener("submit", (e) => {
  e.preventDefault();
  getFormData();
});

const displayOrderDetails = (orderDetails) => {
  orderDetailsContainer.innerHTML = `
    <h2>Інформація про замовлення</h2>
    <p><strong>Товар:</strong> ${productName.textContent}</p>
    <p><strong>ПІБ покупця:</strong> ${orderDetails.fullName}</p>
    <p><strong>Місто:</strong> ${orderDetails.city}</p>
    <p><strong>Склад Нової пошти:</strong> ${orderDetails.novaPoshta}</p>
    <p><strong>Спосіб оплати:</strong> ${orderDetails.paymentMethod}</p>
    <p><strong>Кількість продукції:</strong> ${orderDetails.quantity}</p>
    <p><strong>Коментар до замовлення:</strong> ${orderDetails.comment}</p>
  `;

  orderDetailsContainer.style.display = "block";
  modal.style.display = "none";
  productsContainer.innerHTML = "";
  productInfo.style.display = "none";
  buyButton.style.display = "none";
};
