
const products = [
  {
    id: 1,
    name: "سرم آبرسان هیالورونیک",
    en: "Hyaluronic Acid Serum",
    description: "کمک به حفظ رطوبت و لطافت پوست",
    enDescription: "Helps keep skin hydrated and soft",
    price: 450000,
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=500&q=80",
    tag: "پرفروش"
  },
  {
    id: 2,
    name: "کرم مرطوب‌کننده",
    en: "Moisturizing Cream",
    description: "مناسب برای روتین روزانه پوست",
    enDescription: "For your daily skincare routine",
    price: 380000,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=500&q=80",
    tag: "محبوب"
  },
  {
    id: 3,
    name: "شوینده ملایم صورت",
    en: "Gentle Facial Cleanser",
    description: "پاکسازی ملایم آلودگی‌های روزانه",
    enDescription: "Gently removes everyday impurities",
    price: 290000,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=500&q=80",
    tag: "روزانه"
  },
  {
    id: 4,
    name: "ضدآفتاب روزانه",
    en: "Daily Sunscreen",
    description: "برای محافظت روزانه از پوست",
    enDescription: "Daily protection for your skin",
    price: 520000,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=500&q=80",
    tag: "ضروری"
  },
  {
    id: 5,
    name: "سرم روشن‌کننده پوست",
    en: "Brightening Serum",
    description: "برای داشتن ظاهری شاداب‌تر",
    enDescription: "For a fresh-looking complexion",
    price: 610000,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80",
    tag: "جدید"
  },
  {
    id: 6,
    name: "ماسک مراقبت صورت",
    en: "Facial Care Mask",
    description: "بخشی آرامش‌بخش از روتین هفتگی",
    enDescription: "A relaxing part of your weekly routine",
    price: 250000,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=500&q=80",
    tag: "ویژه"
  },
  {
    id: 7,
    name: "تونر آبرسان",
    en: "Hydrating Toner",
    description: "تکمیل‌کننده روتین مراقبت پوست",
    enDescription: "An extra step in your skincare routine",
    price: 340000,
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=500&q=80",
    tag: "محبوب"
  },
  {
    id: 8,
    name: "کرم دور چشم",
    en: "Eye Cream",
    description: "برای مراقبت از پوست اطراف چشم",
    enDescription: "Care for the delicate eye area",
    price: 430000,
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=500&q=80",
    tag: "ویژه"
  }
];

let cart = [];
let language = "fa";

const $ = (selector) => document.querySelector(selector);

const productGrid = $("#productGrid");
const cartDialog = $("#cartDialog");
const toast = $("#toast");

function formatPrice(price) {
  if (language === "fa") {
    return price.toLocaleString("fa-IR") + " تومان";
  }
  return price.toLocaleString("en-US") + " Toman";
}

function renderProducts(items = products) {
  productGrid.innerHTML = "";

  $("#emptyMessage").hidden = items.length !== 0;

  items.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageBox = document.createElement("div");
    imageBox.className = "product-image";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = language === "fa" ? product.name : product.en;
    image.loading = "lazy";

    const tag = document.createElement("span");
    tag.className = "product-tag";
    tag.textContent = language === "fa" ? product.tag : "Featured";

    imageBox.append(image, tag);

    const title = document.createElement("h3");
    title.textContent = language === "fa" ? product.name : product.en;

    const description = document.createElement("p");
    description.className = "description";
    description.textContent = language === "fa"
      ? product.description
      : product.enDescription;

    const rating = document.createElement("div");
    rating.className = "rating";
    rating.textContent = "★★★★★";
    rating.setAttribute("aria-label", "5 stars");

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = formatPrice(product.price);

    const button = document.createElement("button");
    button.className = "add-btn";
    button.textContent = language === "fa"
      ? "＋ افزودن به سبد خرید"
      : "＋ Add to Cart";

    button.addEventListener("click", () => addToCart(product.id));

    card.append(imageBox, title, description, rating, price, button);
    productGrid.appendChild(card);
  });
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }

  renderCart();
  showToast(language === "fa"
    ? "محصول به سبد خرید اضافه شد 🌸"
    : "Product added to cart 🌸");
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  $("#cartCount").textContent = count.toLocaleString(
    language === "fa" ? "fa-IR" : "en-US"
  );

  const cartItems = $("#cartItems");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = language === "fa"
      ? "سبد خریدت هنوز خالی است 🌱"
      : "Your cart is empty 🌱";
    cartItems.appendChild(empty);
  }

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    const line = document.createElement("div");
    line.className = "cart-line";

    const name = document.createElement("span");
    name.textContent =
      `${language === "fa" ? product.name : product.en} × ${item.quantity}`;

    const price = document.createElement("strong");
    price.textContent = formatPrice(product.price * item.quantity);

    const remove = document.createElement("button");
    remove.textContent = language === "fa" ? "حذف" : "Remove";
    remove.addEventListener("click", () => removeFromCart(item.id));

    line.append(name, price, remove);
    cartItems.appendChild(line);
  });

  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);

  $("#cartTotal").textContent = formatPrice(total);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function changeLanguage() {
  language = language === "fa" ? "en" : "fa";

  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  document.body.dir = language === "fa" ? "rtl" : "ltr";

  $("#languageBtn").textContent = language === "fa" ? "EN" : "فا";

  document.querySelectorAll("[data-fa][data-en]").forEach(element => {
    element.textContent = language === "fa"
      ? element.dataset.fa
      : element.dataset.en;
  });

  document.querySelectorAll("[data-fa-placeholder][data-en-placeholder]")
    .forEach(element => {
      element.placeholder = language === "fa"
        ? element.dataset.faPlaceholder
        : element.dataset.enPlaceholder;
    });

  $("#searchInput").value = "";
  $("#checkoutBtn").textContent = language === "fa"
    ? "ثبت سفارش"
    : "Place Order";

  renderProducts();
  renderCart();
}

$("#languageBtn").addEventListener("click", changeLanguage);

$("#cartBtn").addEventListener("click", () => {
  cartDialog.showModal();
});

$("#closeCart").addEventListener("click", () => {
  cartDialog.close();
});

cartDialog.addEventListener("click", event => {
  if (event.target === cartDialog) {
    cartDialog.close();
  }
});

$("#searchInput").addEventListener("input", event => {
  const query = event.target.value.trim().toLocaleLowerCase();

  const filtered = products.filter(product => {
    const searchable = [
      product.name,
      product.en,
      product.description,
      product.enDescription,
      product.tag
    ].join(" ").toLocaleLowerCase();

    return searchable.includes(query);
  });

  renderProducts(filtered);
});

$("#checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast(language === "fa"
      ? "سبد خریدت خالی است!"
      : "Your cart is empty!");
    return;
  }

  showToast(language === "fa"
    ? "این نسخه آزمایشی است؛ پرداخت آنلاین فعال نیست."
    : "Demo version: online checkout is not available.");
});

$("#year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
