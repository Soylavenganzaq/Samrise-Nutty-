const products = [
  {
    id: 1,
    name: 'Brownie Velvet',
    description: 'Brownie intenso con relleno de fresa y chocolate oscuro.',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1544572570-7b25d6b5ae4f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Galleta Tentación',
    description: 'Galleta suave con chispas de chocolate y un toque de canela.',
    price: 9500,
    image: 'https://images.unsplash.com/photo-1585238342024-78d3d32c7f6d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Brownie Caramelo Salado',
    description: 'Textura cremosa con caramelo y sal marina para despertar los sentidos.',
    price: 13500,
    image: 'https://images.unsplash.com/photo-1599785209707-58d16c2a1ffb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Galleta Fresa & Rosa',
    description: 'Galleta delicada con aroma floral y cubierta de glaseado rosa.',
    price: 10500,
    image: 'https://images.unsplash.com/photo-1515291882623-39a81a9cf865?auto=format&fit=crop&w=800&q=80'
  }
];

const cart = [];
const productGrid = document.getElementById('productGrid');
const cartList = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');
const clearCartBtn = document.getElementById('clearCartBtn');
const orderForm = document.getElementById('orderForm');
const contactForm = document.getElementById('contactForm');

function formatCurrency(value) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
}

function renderProducts() {
  productGrid.innerHTML = products.map(product => `
    <article class="producto">
      <div class="product-image" style="background-image: url('${product.image}')" onclick="openImageModal('${product.image}','${product.name}')" role="button" tabindex="0" aria-label="Ver ${product.name}"></div>
      <div class="product-copy">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-meta">
          <span>${formatCurrency(product.price)}</span>
          <button type="button" class="ripple" onclick="addToCart(${product.id}); showClickEffect(event)">Agregar</button>
        </div>
      </div>
    </article>
  `).join('');
}

function openImageModal(src, caption) {
  const modal = document.getElementById('imageModal');
  const img = document.getElementById('modalImage');
  const cap = document.getElementById('modalCaption');
  img.src = src;
  img.alt = caption;
  cap.textContent = caption;
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  const img = document.getElementById('modalImage');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  img.src = '';
  document.body.style.overflow = '';
}

function showClickEffect(e) {
  const btn = e.currentTarget || e.target;
  const circle = document.createElement('span');
  circle.className = 'ripple-effect';
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  circle.style.width = circle.style.height = size + 'px';
  circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
  circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  if (cart.length === 0) {
    cartList.innerHTML = '<p class="empty-cart">Aún no hay productos en el carrito.</p>';
    cartTotal.textContent = formatCurrency(0);
    return;
  }
  cartList.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <p>${item.quantity} x ${formatCurrency(item.price)}</p>
        <div class="cart-controls">
          <button type="button" class="button button-secondary" onclick="changeQuantity(${item.id}, -1)">-</button>
          <button type="button" class="button button-secondary" onclick="changeQuantity(${item.id}, 1)">+</button>
          <button type="button" class="button" onclick="removeFromCart(${item.id}); showToast('Producto eliminado')">Eliminar</button>
        </div>
      </div>
      <span>${formatCurrency(item.price * item.quantity)}</span>
    </div>
  `).join('');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = formatCurrency(total);
}

function changeQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity = Math.max(0, item.quantity + delta);
  if (item.quantity === 0) removeFromCart(id);
  updateCart();
}

function removeFromCart(id) {
  const idx = cart.findIndex(i => i.id === id);
  if (idx !== -1) cart.splice(idx, 1);
  updateCart();
}

function showToast(message) {
  const toast = document.getElementById('toastMessage');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

clearCartBtn.addEventListener('click', () => {
  cart.length = 0;
  updateCart();
  showToast('Carrito vaciado.');
});

orderForm.addEventListener('submit', event => {
  event.preventDefault();
  if (cart.length === 0) {
    alert('Agrega al menos un producto al carrito antes de enviar tu pedido.');
    return;
  }
  const formData = new FormData(orderForm);
  const cliente = formData.get('nombre');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(`Gracias ${cliente}! Tu pedido se registró con un total de ${formatCurrency(total)}. Nos pondremos en contacto pronto.`);
  orderForm.reset();
  cart.length = 0;
  updateCart();
  showToast('Pedido enviado con éxito.');
});

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  alert('Tu mensaje ha sido enviado. Gracias por contactar a Samrise Nutty Bakery.');
  contactForm.reset();
  showToast('Mensaje enviado.');
});

function animateHeroPhrases() {
  const phrases = [
    'Seducimos tus noches con cada bocado.',
    'Postres atrevidos para momentos inolvidables.',
    'Dulce, sensual y perfecto para adultos.',
    'Sabores que despiertan los sentidos.'
  ];
  const heroPhrase = document.getElementById('heroPhrase');
  let index = 0;
  setInterval(() => {
    index = (index + 1) % phrases.length;
    heroPhrase.classList.remove('text-fade');
    void heroPhrase.offsetWidth;
    heroPhrase.textContent = phrases[index];
    heroPhrase.classList.add('text-fade');
  }, 4200);
}

function createHeroParticles() {
  const container = document.querySelector('.hero-particles');
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';
    const size = 10 + Math.random() * 18;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 90}%`;
    particle.style.top = `${Math.random() * 90}%`;
    particle.style.animationDuration = `${8 + Math.random() * 6}s`;
    particle.style.opacity = `${0.4 + Math.random() * 0.4}`;
    container.appendChild(particle);
  }
}

function initTestimonials() {
  const slider = document.getElementById('testimonialSlider');
  const testimonials = Array.from(slider.children);
  let currentIndex = 0;
  const updateSlide = () => {
    const offset = -currentIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;
  };
  document.getElementById('prevTestimonial').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateSlide();
  });
  document.getElementById('nextTestimonial').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateSlide();
  });
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateSlide();
  }, 5200);
}

window.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCart();
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(el => observer.observe(el));
  animateHeroPhrases();
  createHeroParticles();
  initTestimonials();

  document.querySelectorAll('.button').forEach(b => b.classList.add('ripple'));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement && document.activeElement.classList.contains('product-image')) {
      document.activeElement.click();
    }
  });
});

