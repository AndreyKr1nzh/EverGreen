// Страница товара

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  if (productId && productsData[productId]) {
    renderProductPage(productsData[productId]);
    initImageGallery();
    initReviews(productId);
    setupReviewForm(productId);
  }
});

function renderProductPage(product) {
  document.querySelector('.product-title').textContent = product.name;
  document.querySelector('.product-price').textContent = product.price;
  document.querySelector('.product-description').innerHTML = product.description;
  
  const mainImage = document.getElementById('mainImage');
  mainImage.src = product.mainImage;
  mainImage.alt = product.name;
  
  const photosContainer = document.querySelector('.photos');
  photosContainer.innerHTML = '';

  product.images.forEach((imgSrc, index) => {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = `${product.name} - фото ${index + 1}`;
    img.className = 'photo' + (index === 0 ? ' active' : '');
    photosContainer.appendChild(img);
  });
}

function initImageGallery() {
  document.querySelector('.photos').addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
      document.querySelectorAll('.photos .photo').forEach(img => {
        img.classList.remove('active');
      });
      
      e.target.classList.add('active');
      
      document.getElementById('mainImage').src = e.target.src;
    }
  });
}

// Отзывы

function initReviews(productId) {
  const reviews = getReviews(productId);
  renderReviews(reviews);
}

function getReviews(productId) {
  const allReviews = JSON.parse(localStorage.getItem('productReviews')) || {};
  return allReviews[productId] || [];
}

function saveReviews(productId, reviews) {
  const allReviews = JSON.parse(localStorage.getItem('productReviews')) || {};
  allReviews[productId] = reviews;
  localStorage.setItem('productReviews', JSON.stringify(allReviews));
}

function renderReviews(reviews) {
  const container = document.querySelector('.reviews-container');
  if (!container) return;
  
  container.innerHTML = reviews.length 
    ? reviews.map(review => `
        <div class="review">
          <div class="review-author">${review.author || 'Аноним'}</div>
          <div class="review-text">${review.text || 'Без текста'}</div>
          </div>`).join('')
    : '<div class="no-reviews">Пока нет отзывов.</div>';
}

function setupReviewForm(productId) {
  const form = document.querySelector('.review-form');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const author = form.querySelector('[name="author"]').value.trim();
    const text = form.querySelector('[name="text"]').value.trim();
    
    if (!text) {
      alert('Пожалуйста, введите текст отзыва');
      return;
    }
    
    const review = {
      author: author || 'Аноним',
      text
    };
    
    const reviews = getReviews(productId);
    reviews.unshift(review);
    saveReviews(productId, reviews);
    renderReviews(reviews);
    
    form.reset();
  });
}