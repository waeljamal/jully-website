const galleryItems = [
  { type: "image", src: "images/gallery/photo1.jpg", alt: "Photo 1" },
  { type: "image", src: "images/gallery/photo2.jpg", alt: "Photo 2" },
  { type: "image", src: "images/gallery/photo3.jpg", alt: "Photo 3" },
  { type: "image", src: "images/gallery/photo4.jpg", alt: "Photo 4" },
  { type: "image", src: "images/gallery/photo5.jpg", alt: "Photo 5" },
  { type: "image", src: "images/gallery/photo6.jpg", alt: "Photo 6" },
  { type: "image", src: "images/gallery/photo7.jpg", alt: "Photo 7" },
  { type: "image", src: "images/gallery/photo8.jpg", alt: "Photo 8" }
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
document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.querySelector(".gallery-grid");
  if (!galleryGrid) return;

  const leftArrow = document.createElement("button");
  const rightArrow = document.createElement("button");

  leftArrow.className = "gallery-arrow gallery-left";
  rightArrow.className = "gallery-arrow gallery-right";

  leftArrow.innerHTML = "‹";
  rightArrow.innerHTML = "›";

  galleryGrid.parentElement.appendChild(leftArrow);
  galleryGrid.parentElement.appendChild(rightArrow);

  leftArrow.addEventListener("click", () => {
    galleryGrid.scrollBy({ left: -360, behavior: "smooth" });
  });

  rightArrow.addEventListener("click", () => {
    galleryGrid.scrollBy({ left: 360, behavior: "smooth" });
  });

  let isDown = false;
  let startX;
  let scrollLeft;

  galleryGrid.addEventListener("mousedown", (e) => {
    isDown = true;
    galleryGrid.classList.add("dragging");
    startX = e.pageX - galleryGrid.offsetLeft;
    scrollLeft = galleryGrid.scrollLeft;
  });

  galleryGrid.addEventListener("mouseleave", () => {
    isDown = false;
    galleryGrid.classList.remove("dragging");
  });

  galleryGrid.addEventListener("mouseup", () => {
    isDown = false;
    galleryGrid.classList.remove("dragging");
  });

  galleryGrid.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - galleryGrid.offsetLeft;
    const walk = (x - startX) * 1.7;
    galleryGrid.scrollLeft = scrollLeft - walk;
  });
});
