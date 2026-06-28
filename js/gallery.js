const galleryItems = [
  { type: "image", src: "images/gallery/photo1.jpg", alt: "Afrika örgü modeli" },
  { type: "image", src: "images/gallery/photo2.jpg", alt: "Cornrows saç modeli" },
  { type: "image", src: "images/gallery/photo3.jpg", alt: "Afro örgü modeli" },
  { type: "image", src: "images/gallery/photo4.jpg", alt: "Mini box braids" },
  { type: "image", src: "images/gallery/photo5.jpg", alt: "Klasik Afrika örgü" },
  { type: "image", src: "images/gallery/photo6.jpg", alt: "Profesyonel saç örgü" },
  { type: "image", src: "images/gallery/photo7.jpg", alt: "Ankara Afrika örgü" },
  { type: "image", src: "images/gallery/photo8.jpg", alt: "Jully Afrika Style" },
  { type: "video", src: "videos/hero.mp4", alt: "Jully Afrika Style video" }
];

document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.querySelector(".gallery-grid");
  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";

  galleryItems.forEach((item) => {
    const div = document.createElement("div");
    div.className = "gallery-item";

    if (item.type === "image") {
      div.innerHTML = `<img src="${item.src}" alt="${item.alt}" loading="lazy">`;
    } else {
      div.innerHTML = `
        <video controls muted playsinline>
          <source src="${item.src}" type="video/mp4">
        </video>
      `;
    }

    galleryGrid.appendChild(div);
  });
});
