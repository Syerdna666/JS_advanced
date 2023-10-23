// Функция для добавления отзыва в LocalStorage
function addReview() {
  const productName = document.getElementById("product-name").value;
  const reviewText = document.getElementById("review-text").value;

  if (productName && reviewText) {
    const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    existingReviews.push({ productName, reviewText });
    localStorage.setItem("reviews", JSON.stringify(existingReviews));

    // Очистить введенные данные
    document.getElementById("product-name").value = "";
    document.getElementById("review-text").value = "";
    alert("Отзыв успешно добавлен!");
  } else {
    alert("Пожалуйста, заполните все поля перед добавлением отзыва.");
  }
}

// Функция для отображения списка продуктов
function displayProducts() {
  const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  const products = [
    ...new Set(existingReviews.map((review) => review.productName)),
  ];

  for (const product of products) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<a href="#" class="product-link">${product}</a>`;
    productList.appendChild(listItem);

    // Добавить обработчик событий для перехода к отзывам по продукту
    listItem.querySelector(".product-link").addEventListener("click", () => {
      displayReviewsForProduct(product);
    });
  }
}

// Функция для отображения отзывов по конкретному продукту
function displayReviewsForProduct(productName) {
  const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const reviewList = document.getElementById("product-list");
  reviewList.innerHTML = "";

  for (const review of existingReviews) {
    if (review.productName === productName) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `${review.reviewText} <button class="delete-review">Удалить</button>`;
      reviewList.appendChild(listItem);

      // Добавить обработчик событий для удаления отзыва
      listItem.querySelector(".delete-review").addEventListener("click", () => {
        deleteReview(productName, review.reviewText);
      });
    }
  }
}

// Функция для удаления отзыва из LocalStorage
function deleteReview(productName, reviewText) {
  const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const updatedReviews = existingReviews.filter(
    (review) =>
      !(review.productName === productName && review.reviewText === reviewText)
  );
  localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  displayReviewsForProduct(productName);
}

// Добавить обработчики событий
document
  .getElementById("add-review-button")
  .addEventListener("click", addReview);
displayProducts();
