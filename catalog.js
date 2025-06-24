const products = [
  {
    id: 1, 
    image: "imgs/цветок1.webp",
    name: "Табак крылатый",
    type: "Цветы",
    price: "960p",
    link: "product.html?id=1"
  },
  {
    id: 2,
    image: "imgs/яблоня.jpg",
    name: "Яблоня Штрейфлинг",
    type: "Деревья",
    price: "1500p",
    link: "product.html?id=2"
  },
  {
    id: 3,
    image: "imgs/цветок3.jpg",
    name: "Аквилегия красная",
    type: "Цветы",
    price: "1300p",
    link: "product.html?id=3"
  },
  {
    id: 4,
    image: "imgs/слива.jpg",
    name: "Слива Тульская",
    type: "Деревья",
    price: "900p",
    link: "product.html?id=4"
  },
  {
    id: 5,
    image: "imgs/шиповник.jpg",
    name: "Шиповник обычный",
    type: "Кустарники",
    price: "1000p",
    link: "product.html?id=5"
  },
  {
    id: 6,
    image: "imgs/Цветок2.jpg",
    name: "Гацания",
    type: "Цветы",
    price: "1200p",
    link: "product.html?id=6"
  },
  {
    id: 7,
    image: "imgs/Малина.jpg",
    name: "Малина красная",
    type: "Кустарники",
    price: "1300p",
    link: "product.html?id=7"
  },
  {
    id: 8,
    image: "imgs/смородина.jpg",
    name: "Смородина",
    type: "Кустарники",
    price: "850p",
    link: "product.html?id=8"
  }
];

const itemsPerPage = 4;
let currentPage = 1;

function createProductCard(product) {
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Вид: ${product.type}</p>
      <p>Цена: ${product.price}</p>
      <a href="${product.link}" class="product-link">Перейти к товару</a>
    </div>
  `;
}

function getFilteredProducts() {
  const searchInput = document.querySelector('.search input');
  const categoryFilter = document.querySelector('[data-filter="category"]');
  const minPriceInput = document.querySelector('[data-filter="min-price"]');
  const maxPriceInput = document.querySelector('[data-filter="max-price"]');

  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const minPrice = minPriceInput.value ? parseInt(minPriceInput.value) : 0;
  const maxPrice = maxPriceInput.value ? parseInt(maxPriceInput.value) : Infinity;

  return products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === 'Все' || product.type === selectedCategory;
    const productPrice = parseInt(product.price);
    const matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });
}

function displayProducts() {
  const productsContainer = document.querySelector('.products');
  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToShow = filteredProducts.slice(startIndex, endIndex);

  productsContainer.innerHTML = productsToShow.map(createProductCard).join('');

  updatePagination(totalPages);
  updatePageButtons();
}

// Обновление пагинации
function updatePagination(totalPages) {
  const paginationContainer = document.querySelector('.pagination');
  if (!paginationContainer) return;

  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.className = 'page-btn';
    pageButton.dataset.page = i;
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      displayProducts();
    });
    paginationContainer.appendChild(pageButton);
  }
}

function updatePageButtons() {
  const pageButtons = document.querySelectorAll('.page-btn');
  pageButtons.forEach(button => {
    const pageNumber = parseInt(button.dataset.page);
    button.classList.toggle('active', pageNumber === currentPage);
  });
}

function eventlist() {
  document.querySelector('.search input').addEventListener('input', () => {
    currentPage = 1;
    displayProducts();
  });

  document.querySelector('.filters button').addEventListener('click', () => {
    currentPage = 1;
    displayProducts();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  eventlist();
  displayProducts();
});