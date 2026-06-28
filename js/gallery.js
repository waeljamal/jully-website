const galleryItems = [
  {
    type: "image",
    src: "images/gallery/photo1.jpeg",
    alt: "Afrika örgü modeli"
  },
  {
    type: "image",
    src: "images/gallery/photo2.jpeg",
    alt: "Cornrows saç modeli"
  },
  {
    type: "image",
    src: "images/gallery/photo3.jpeg",
    alt: "Afro örgü modeli"
  },
  {
    type: "image",
    src: "images/gallery/photo4.jpeg",
    alt: "Mini box braids"
  },
  {
    type: "image",
    src: "images/gallery/photo5.jpeg",
    alt: "Klasik Afrika örgü"
  },
  {
    type: "image",
    src: "images/gallery/photo6.jpeg",
    alt: "Profesyonel saç örgü"
  },
  {
    type: "image",
    src: "images/gallery/photo7.jpeg",
    alt: "Ankara Afrika örgü"
  },
  {
    type: "image",
    src: "images/gallery/photo8.jpeg",
    alt: "Jully Afrika Style saç modeli"
  },
  {
    type: "video",
    src: "videos/hero.mp4",
    alt: "Jully Afrika Style video"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.querySelector(".gallery-grid");

  if (!galleryGrid) return;

  galleryGrid.innerHTML = "";

  galleryItems.forEach((item) => {
    const box = document.createElement("div");
    box.className = "gallery-item fade";

    if (item.type === "image") {
      box.innerHTML = `
        <img src="${item.src}" alt="${item.alt}" loading="lazy">
      `;
    }

    if (item.type === "video") {
      box.innerHTML = `
        <video controls muted playsinline>
          <source src="${item.src}" type="video/mp4">
        </video>
      `;
    }

    galleryGrid.appendChild(box);
  });
});
