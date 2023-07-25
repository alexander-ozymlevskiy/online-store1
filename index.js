// Визначення констант і вибір елементів з DOM
const productsContainer = document.querySelector(".products");
const categoriesList = document.querySelector(".categories");
const productInfo = document.querySelector(".product-info");
const productName = document.querySelector(".product-name");
const buyButton = document.querySelector(".buy-button");
const orderFormModal = document.querySelector("#orderFormModal");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");
const orderDetailsContainer = document.getElementById("orderDetails");
const ordersButton = document.getElementById("ordersButton");

// Категорії та відповідні їм товари
const listOfGoods = {
  Оздоблювальні: [
    "Гіпсокартонні системи",
    "Будівельна хімія",
    "Клейові суміші",
  ],
  Загальнобудівельні: ["Сітка металева", "Цемент, пісок, щебінь", "Газоблок"],
  Покрівля: ["Бітумна черепиця", "Металочерепиця", "Водостічні системи"],
};

// Обробник подій категорій
categoriesList.addEventListener("click", (event) => {
  if (event.target.matches(".categories_link")) {
    const category = event.target.innerText;

    // виводимо товари обраної категорії
    productsContainer.innerHTML = listOfGoods[category]
      .map((product) => `<p>${product}</p>`)
      .join("");
  }
});

// Обробник подій товарів
productsContainer.addEventListener("click", (event) => {
  if (event.target.matches("p")) {
    productName.textContent = event.target.textContent;
    productInfo.style.display = "block";
    buyButton.style.display = "block";
  }
});

// Обробник події на кнопку "buyButton"
buyButton.addEventListener("click", () => {
  // Показуєм модальне вікно
  modal.style.display = "block";
});

// Додаємо обробник події для кліку на кнопку "closeButton" у модальному вікні
closeButton.addEventListener("click", () => {
  // Закриваємо модальне вікно
  modal.style.display = "none";
});

// Функція для отримання даних з форми замовлення
const getFormData = () => {
  const formData = new FormData(document.getElementById("orderFormModal"));
  const entries = formData.entries();
  const data = Object.fromEntries(entries);
  // Перевірка, чи всі обов'язкові поля заповнені
  if (
    !data.fullName ||
    !data.city ||
    !data.novaPoshta ||
    !data.paymentMethod ||
    !data.quantity
  ) {
    alert("Будь ласка, заповніть усі обов'язкові поля.");
    return;
  }
  // Перевірка, чи введено коректну кількість продукції
  if (isNaN(data.quantity) || +data.quantity < 1) {
    alert("Будь ласка, введіть коректне значення для кількості продукції.");
    return;
  }

  const price = 9999;

  // Створення об'єкта для представлення замовлення
  const order = {
    date: new Date().toLocaleString(),
    price: price,
    ...data,
  };
  // Зберігаємо замовлення в локальному сховищі
  saveOrderToLocalStorage(order);
  // Показуємо повідомлення про успішне здійснення замовлення
  alert("Замовлення успішно здійснено!");
  modal.style.display = "none";
  productsContainer.innerHTML = "";
  productInfo.style.display = "none";
  buyButton.style.display = "none";
};

// Додаємо обробник події "submit" на формі замовлення
document.getElementById("orderFormModal").addEventListener("submit", (e) => {
  e.preventDefault();
  getFormData();
});

// Функція для відображення деталей замовлення
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
};

//////////////////////

// Додамо обробник події для кнопки "Мої замовлення"
ordersButton.addEventListener("click", showMyOrders);
// Функція для відображення списку замовлень користувача
function showMyOrders() {
  categoriesList.style.display = "none";
  productsContainer.style.display = "none";
  productInfo.style.display = "none";
  // Отримуємо всі замовлення з локального сховища
  const allOrders = getAllOrders();
  // Створюємо HTML-код для кожного замовлення у вигляді карточки та об'єднуємо їх у рядок
  orderDetailsContainer.innerHTML = allOrders
    .map(
      (order, index) => `
    <div class="order-card" data-index="${index}">
      <p><strong>Дата:</strong> ${order.date}</p>
      <p><strong>Ціна:</strong> ${order.price}</p>
      <button class="delete-order-btn" data-index="${index}">Видалити</button>
    </div>
  `
    )
    .join("");
  // Додаємо обробник події для кліку на карточку замовлення або кнопку "Видалити"
  orderDetailsContainer.addEventListener("click", (event) => {
    // Отримуємо батьківську карточку замовлення, якщо клікнули на кнопку "Видалити" або саму карточку
    const orderCard = event.target.closest(".order-card");
    if (!orderCard) return; // Якщо клік не на карточку замовлення, ігноруємо подію
    // Отримуємо індекс замовлення з атрибута "data-index"
    const orderIndex = orderCard.dataset.index;
    // Викликаємо функцію для видалення замовлення за індексом
    if (event.target.matches(".delete-order-btn")) {
      deleteOrder(orderIndex);
      showMyOrders();
    } else {
      // Відображення деталей замовлення
      const order = allOrders[orderIndex];
      displayOrderDetails(order);
    }
  });
  // Відображення контейнера зі списком замовлень
  orderDetailsContainer.style.display = "block";
}
// Функція для отримання всіх замовлень з локального сховища
function getAllOrders() {
  return JSON.parse(localStorage.getItem("orders"));
}

// Функція для збереження замовлення до локального сховища
function saveOrderToLocalStorage(order) {
  const allOrders = getAllOrders();
  allOrders.push(order);
  localStorage.setItem("orders", JSON.stringify(allOrders));
}

// Функція для видалення замовлення за індексом з локального сховища
function deleteOrder(orderIndex) {
  const allOrders = getAllOrders();
  allOrders.splice(orderIndex, 1);
  localStorage.setItem("orders", JSON.stringify(allOrders));
}
