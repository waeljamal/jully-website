const galleryItems = [
  { type: "image", src: "images/gallery/photo1.jpg.jpg", alt: "Jully Afrika Style photo 1" },
  { type: "image", src: "images/gallery/photo2.jpg.jpg", alt: "Jully Afrika Style photo 2" },
  { type: "image", src: "images/gallery/photo3.jpg.jpg", alt: "Jully Afrika Style photo 3" },
  { type: "image", src: "images/gallery/photo4.jpg.jpg", alt: "Jully Afrika Style photo 4" },
  { type: "image", src: "images/gallery/photo5.jpg.jpg", alt: "Jully Afrika Style photo 5" },
  { type: "image", src: "images/gallery/photo6.jpg.jpg", alt: "Jully Afrika Style photo 6" },
  { type: "image", src: "images/gallery/photo7.jpg.jpg", alt: "Jully Afrika Style photo 7" },
  { type: "image", src: "images/gallery/photo8.jpg.jpg", alt: "Jully Afrika Style photo 8" }
];

document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.querySelector(".gallery-grid");
  if (!galleryGrid) return;

  let currentIndex = 0;

  galleryGrid.innerHTML = "";

  galleryItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "gallery-item";
    card.innerHTML = `
      <img src="${item.src}" alt="${item.alt}" loading="lazy">
      <div class="gallery-hover">
        <span>View</span>
      </div>
    `;

    card.addEventListener("click", () => openLightbox(index));
    galleryGrid.appendChild(card);
  });

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close">×</button>
    <button class="lightbox-prev">‹</button>
    <div class="lightbox-content"></div>
    <button class="lightbox-next">›</button>
  `;
  document.body.appendChild(lightbox);

  const content = lightbox.querySelector(".lightbox-content");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");

  function openLightbox(index) {
    currentIndex = index;
    renderLightbox();
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
    content.innerHTML = "";
  }

  function renderLightbox() {
    const item = galleryItems[currentIndex];

    if (item.type === "image") {
      content.innerHTML = `<img src="${item.src}" alt="${item.alt}">`;
    } else {
      content.innerHTML = `
        <video controls autoplay playsinline>
          <source src="${item.src}" type="video/mp4">
        </video>
      `;
    }
  }

  function nextItem() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    renderLightbox();
  }

  function prevItem() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    renderLightbox();
  }

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", nextItem);
  prevBtn.addEventListener("click", prevItem);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("show")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextItem();
    if (e.key === "ArrowLeft") prevItem();
  });
});
