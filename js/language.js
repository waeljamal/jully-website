const translations = {
  tr: {
    navHome: "Ana Sayfa",
    navAbout: "Hakkımızda",
    navGallery: "Galeri",
    navServices: "Hizmetler",
    navBooking: "Randevu Al",
    navContact: "İletişim",

    heroEyebrow: "Ankara’da Premium Afrika Örgü",
    heroTitle: "Jully Afrika Style",
    heroSubtitle: "Ankara’da Profesyonel Afrika Örgü Salonu",
    heroText: "2012’den beri sertifikalı • 14+ yıl deneyim",
    heroButton: "Randevu Al",
    galleryButton: "Galeriyi Gör",

    aboutSmall: "Hikayemiz",
    aboutTitle: "Hakkımızda",
    aboutText:
      "Togo’lu profesyonel kadın saç örgü uzmanı Jully, 2012 yılından beri sertifikalı bir braider olarak hizmet vermektedir. 14 yıldan fazla deneyimiyle Ankara’da kaliteli, şık ve uzun ömürlü Afrika örgü modelleri sunar.",

    experience: "Yıl Deneyim",
    certified: "Sertifikalı",
    quality: "Profesyonel Hizmet",

    gallerySmall: "Çalışmalarımız",
    galleryTitle: "Galeri",

    servicesSmall: "Modeller & Fiyatlar",
    servicesTitle: "Hizmetler",

    bookingSmall: "Online Randevu",
    bookingTitle: "Randevu Al"
  },

  en: {
    navHome: "Home",
    navAbout: "About Us",
    navGallery: "Gallery",
    navServices: "Services",
    navBooking: "Book Now",
    navContact: "Contact",

    heroEyebrow: "Premium African Braids in Ankara",
    heroTitle: "Jully Afrika Style",
    heroSubtitle: "Professional African Braiding Salon in Ankara",
    heroText: "Certified since 2012 • 14+ years of experience",
    heroButton: "Book Now",
    galleryButton: "View Gallery",

    aboutSmall: "Our Story",
    aboutTitle: "About Us",
    aboutText:
      "Jully is a professional female braider from Togo, certified since 2012. With more than 14 years of experience, she offers high-quality, stylish, and long-lasting African braiding services in Ankara.",

    experience: "Years Experience",
    certified: "Certified Since",
    quality: "Professional Service",

    gallerySmall: "Our Work",
    galleryTitle: "Gallery",

    servicesSmall: "Styles & Prices",
    servicesTitle: "Services",

    bookingSmall: "Online Booking",
    bookingTitle: "Book Now"
  }
};

function setLanguage(lang) {
  const selected = translations[lang];

  document.querySelectorAll("[data-key]").forEach((element) => {
    const key = element.getAttribute("data-key");

    if (selected[key]) {
      element.textContent = selected[key];
    }
  });

  document.documentElement.lang = lang;
  localStorage.setItem("afroHairLang", lang);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  const activeBtn = document.getElementById(`${lang}-btn`);
  if (activeBtn) activeBtn.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("afroHairLang") || "tr";

  setLanguage(savedLanguage);

  const trBtn = document.getElementById("tr-btn");
  const enBtn = document.getElementById("en-btn");

  if (trBtn) {
    trBtn.addEventListener("click", () => setLanguage("tr"));
  }

  if (enBtn) {
    enBtn.addEventListener("click", () => setLanguage("en"));
  }
});
