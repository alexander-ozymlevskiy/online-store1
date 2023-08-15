"use strict";
function _typeof(t) {
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    _typeof(t)
  );
}
function ownKeys(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    e &&
      (o = o.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })),
      r.push.apply(r, o);
  }
  return r;
}
function _objectSpread(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = null != arguments[e] ? arguments[e] : {};
    e % 2
      ? ownKeys(Object(r), !0).forEach(function (e) {
          _defineProperty(t, e, r[e]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
      : ownKeys(Object(r)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
        });
  }
  return t;
}
function _defineProperty(t, e, r) {
  return (
    (e = _toPropertyKey(e)) in t
      ? Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[e] = r),
    t
  );
}
function _toPropertyKey(t) {
  var e = _toPrimitive(t, "string");
  return "symbol" === _typeof(e) ? e : String(e);
}
function _toPrimitive(t, e) {
  if ("object" !== _typeof(t) || null === t) return t;
  var r = t[Symbol.toPrimitive];
  if (void 0 !== r) {
    var o = r.call(t, e || "default");
    if ("object" !== _typeof(o)) return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === e ? String : Number)(t);
}
var productsContainer = document.querySelector(".products"),
  categoriesList = document.querySelector(".categories"),
  productInfo = document.querySelector(".product-info"),
  productName = document.querySelector(".product-name"),
  buyButton = document.querySelector(".buy-button"),
  orderFormModal = document.querySelector("#orderFormModal"),
  modal = document.querySelector(".modal"),
  closeButton = document.querySelector(".close-button"),
  orderDetailsContainer = document.getElementById("orderDetails"),
  ordersButton = document.getElementById("ordersButton"),
  listOfGoods = {
    Оздоблювальні: [
      "Гіпсокартонні системи",
      "Будівельна хімія",
      "Клейові суміші",
    ],
    Загальнобудівельні: ["Сітка металева", "Цемент, пісок, щебінь", "Газоблок"],
    Покрівля: ["Бітумна черепиця", "Металочерепиця", "Водостічні системи"],
  };
categoriesList.addEventListener("click", function (t) {
  if (t.target.matches(".categories_link")) {
    var e = t.target.innerText;
    productsContainer.innerHTML = listOfGoods[e]
      .map(function (t) {
        return "<p>".concat(t, "</p>");
      })
      .join("");
  }
}),
  productsContainer.addEventListener("click", function (t) {
    t.target.matches("p") &&
      ((productName.textContent = t.target.textContent),
      (productInfo.style.display = "block"),
      (buyButton.style.display = "block"));
  }),
  buyButton.addEventListener("click", function () {
    modal.style.display = "block";
  }),
  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });
var getFormData = function () {
  var t = new FormData(document.getElementById("orderFormModal")).entries(),
    e = Object.fromEntries(t);
  if (e.fullName && e.city && e.novaPoshta && e.paymentMethod && e.quantity)
    if (isNaN(e.quantity) || +e.quantity < 1)
      alert("Будь ласка, введіть коректне значення для кількості продукції.");
    else {
      saveOrderToLocalStorage(
        _objectSpread({ date: new Date().toLocaleString(), price: 9999 }, e)
      ),
        alert("Замовлення успішно здійснено!"),
        (modal.style.display = "none"),
        (productsContainer.innerHTML = ""),
        (productInfo.style.display = "none"),
        (buyButton.style.display = "none");
    }
  else alert("Будь ласка, заповніть усі обов'язкові поля.");
};
document
  .getElementById("orderFormModal")
  .addEventListener("submit", function (t) {
    t.preventDefault(), getFormData();
  });
var displayOrderDetails = function (t) {
  (orderDetailsContainer.innerHTML =
    "\n    <h2>Інформація про замовлення</h2>\n    <p><strong>Товар:</strong> "
      .concat(
        productName.textContent,
        "</p>\n    <p><strong>ПІБ покупця:</strong> "
      )
      .concat(t.fullName, "</p>\n    <p><strong>Місто:</strong> ")
      .concat(t.city, "</p>\n    <p><strong>Склад Нової пошти:</strong> ")
      .concat(t.novaPoshta, "</p>\n    <p><strong>Спосіб оплати:</strong> ")
      .concat(
        t.paymentMethod,
        "</p>\n    <p><strong>Кількість продукції:</strong> "
      )
      .concat(
        t.quantity,
        "</p>\n    <p><strong>Коментар до замовлення:</strong> "
      )
      .concat(t.comment, "</p>\n  ")),
    (orderDetailsContainer.style.display = "block");
};
function showMyOrders() {
  (categoriesList.style.display = "none"),
    (productsContainer.style.display = "none"),
    (productInfo.style.display = "none");
  var t = getAllOrders();
  (orderDetailsContainer.innerHTML = t
    .map(function (t, e) {
      return '\n    <div class="order-card" data-index="'
        .concat(e, '">\n      <p><strong>Дата:</strong> ')
        .concat(t.date, "</p>\n      <p><strong>Ціна:</strong> ")
        .concat(
          t.price,
          '</p>\n      <button class="delete-order-btn" data-index="'
        )
        .concat(e, '">Видалити</button>\n    </div>\n  ');
    })
    .join("")),
    orderDetailsContainer.addEventListener("click", function (e) {
      var r = e.target.closest(".order-card");
      if (r) {
        var o = r.dataset.index;
        if (e.target.matches(".delete-order-btn"))
          deleteOrder(o), showMyOrders();
        else {
          var n = t[o];
          displayOrderDetails(n);
        }
      }
    }),
    (orderDetailsContainer.style.display = "block");
}
function getAllOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}
function saveOrderToLocalStorage(t) {
  var e = getAllOrders();
  e.push(t), localStorage.setItem("orders", JSON.stringify(e));
}
function deleteOrder(t) {
  var e = getAllOrders();
  e.splice(t, 1), localStorage.setItem("orders", JSON.stringify(e));
}
ordersButton.addEventListener("click", showMyOrders);
