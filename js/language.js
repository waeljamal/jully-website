/* ===============================
   AFRO HAIR ANKARA - LANGUAGE
   Default: Turkish
================================ */

const translations = {
  tr: {
    navHome: "Ana Sayfa",
    navAbout: "Hakkımızda",
    navGallery: "Galeri",
    navServices: "Hizmetler",
    navBooking: "Randevu Al",
    navContact: "İletişim",

    heroTitle: "Jully Afrika Style",
    heroSubtitle: "Ankara’da Profesyonel Afrika Örgü Salonu",
    heroText: "2012’den beri sertifikalı • 14+ yıl deneyim",
    heroButton: "Randevu Al",

    aboutTitle: "Hakkımızda",
    aboutText:
      "Togo’lu profesyonel kadın saç örgü uzmanı Jully, 2012 yılından beri sertifikalı bir braider olarak hizmet vermektedir. 14 yıldan fazla deneyimiyle Ankara’da kaliteli, şık ve uzun ömürlü Afrika örgü modelleri sunar.",

    galleryTitle: "Galeri",
    servicesTitle: "Hizmetler ve Fiyatlar",
    bookingTitle: "Randevu Al",

    name: "Ad",
    surname: "Soyad",
    phone: "Telefon",
    email: "E-posta",
    serviceSelect: "Hizmet Seçiniz",
    lengthSelect: "Uzunluk Seçiniz",
    note: "Not",
    paymentTitle: "Ödeme Bilgileri",
    paymentText: "Şu anda sadece IBAN ile ödeme kabul edilmektedir.",
    accountName: "Hesap Sahibi",
    iban: "IBAN",
    confirmPayment: "Ödemeyi yaptığımı onaylıyorum.",
    submitBooking: "Randevu Oluştur",

    reviewsTitle: "Müşteri Yorumları",
    contactTitle: "İletişim",
    designerTitle: "Website Designer & Programmer",
    hoursTitle: "Çalışma Saatleri",
    hoursDays: "Pazartesi - Pazar",
    hoursTime: "09:00 - 23:00",

    bookFloating: "Randevu Al"
  },

  en: {
    navHome: "Home",
    navAbout: "About Us",
    navGallery: "Gallery",
    navServices: "Services",
    navBooking: "Book Now",
    navContact: "Contact",

    heroTitle: "Jully Afrika Style",
    heroSubtitle: "Professional African Braiding Salon in Ankara",
    heroText: "Certified since 2012 • 14+ years of experience",
    heroButton: "Book Appointment",

    aboutTitle: "About Us",
    aboutText:
      "Jully is a professional female braider from Togo, certified since 2012. With more than 14 years of experience, she offers high-quality, stylish, and long-lasting African braiding services in Ankara.",

    galleryTitle: "Gallery",
    servicesTitle: "Services & Prices",
    bookingTitle: "Book Now",

    name: "First Name",
    surname: "Surname",
    phone: "Phone",
    email: "Email",
    serviceSelect: "Select Service",
    lengthSelect: "Select Length",
    note: "Note",
    paymentTitle: "Payment Information",
    paymentText: "Currently, only IBAN bank transfer payment is accepted.",
    accountName: "Account Holder",
    iban: "IBAN",
    confirmPayment: "I confirm that I have made the payment.",
    submitBooking: "Create Appointment",

    reviewsTitle: "Customer Reviews",
    contactTitle: "Contact",
    designerTitle: "Website Designer & Programmer",
    hoursTitle: "Working Hours",
    hoursDays: "Monday - Sunday",
    hoursTime: "09:00 - 23:00",

    bookFloating: "Book Now"
  }
};

function setLanguage(lang) {
  const t = translations[lang];

  const menuLinks = document.querySelectorAll("#menu a");

  if (menuLinks.length >= 6) {
    menuLinks[0].textContent = t.navHome;
    menuLinks[1].textContent = t.navAbout;
    menuLinks[2].textContent = t.navGallery;
    menuLinks[3].textContent = t.navServices;
    menuLinks[4].textContent = t.navBooking;
    menuLinks[5].textContent = t.navContact;
  }

  const heroTitle = document.querySelector(".hero-content h1");
  const heroSubtitle = document.querySelector(".hero-content h2");
  const heroText = document.querySelector(".hero-content p");
  const heroButton = document.querySelector(".hero-btn");

  if (heroTitle) heroTitle.textContent = t.heroTitle;
  if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
  if (heroText) heroText.textContent = t.heroText;
  if (heroButton) heroButton.textContent = t.heroButton;

  const aboutTitle = document.querySelector("#about h2");
  const aboutText = document.querySelector("#about p");

  if (aboutTitle) aboutTitle.textContent = t.aboutTitle;
  if (aboutText) aboutText.textContent = t.aboutText;

  const galleryTitle = document.querySelector("#gallery h2");
  const servicesTitle = document.querySelector("#services h2");
  const bookingTitle = document.querySelector("#booking h2");
  const reviewsTitle = document.querySelector("#reviews h2");

  if (galleryTitle) galleryTitle.textContent = t.galleryTitle;
  if (servicesTitle) servicesTitle.textContent = t.servicesTitle;
  if (bookingTitle) bookingTitle.textContent = t.bookingTitle;
  if (reviewsTitle) reviewsTitle.textContent = t.reviewsTitle;

  const inputs = document.querySelectorAll("#bookingForm input");
  const selects = document.querySelectorAll("#bookingForm select");
  const textarea = document.querySelector("#bookingForm textarea");

  if (inputs[0]) inputs[0].placeholder = t.name;
  if (inputs[1]) inputs[1].placeholder = t.surname;
  if (inputs[2]) inputs[2].placeholder = t.phone;
  if (inputs[3]) inputs[3].placeholder = t.email;

  if (selects[0]) selects[0].options[0].textContent = t.serviceSelect;
  if (selects[1]) selects[1].options[0].textContent = t.lengthSelect;

  if (textarea) textarea.placeholder = t.note;

  const payment = document.querySelector(".payment");

  if (payment) {
    const h3 = payment.querySelector("h3");
    const p = payment.querySelector("p");
    const h4s = payment.querySelectorAll("h4");
    const label = payment.querySelector("label");

    if (h3) h3.textContent = t.paymentTitle;
    if (p) p.textContent = t.paymentText;

    if (h4s[0]) h4s[0].textContent = `${t.accountName}: Tuğrahan Şibil`;
    if (h4s[1]) h4s[1].textContent = `${t.iban}: TR46 0011 1000 0000 0152 0406 81`;

    if (label) {
      const checkbox = label.querySelector("input");
      label.innerHTML = "";
      if (checkbox) label.appendChild(checkbox);
      label.append(` ${t.confirmPayment}`);
    }
  }

  const submitButton = document.querySelector("#bookingForm button");
  if (submitButton) submitButton.textContent = t.submitBooking;

  const floatingBook = document.querySelector(".booking-button");
  if (floatingBook) floatingBook.textContent = t.bookFloating;

  const footerTitles = document.querySelectorAll("footer h3");
  const footerTexts = document.querySelectorAll("footer p");

  if (footerTitles[0]) footerTitles[0].textContent = t.contactTitle;
  if (footerTitles[1]) footerTitles[1].textContent = t.designerTitle;
  if (footerTitles[2]) footerTitles[2].textContent = t.hoursTitle;

  if (footerTexts[3]) footerTexts[3].textContent = t.hoursDays;
  if (footerTexts[4]) footerTexts[4].textContent = t.hoursTime;

  localStorage.setItem("siteLanguage", lang);

  document.documentElement.lang = lang;
}

document.addEventListener("DOMContentLoaded", () => {
  const trBtn = document.getElementById("tr-btn");
  const enBtn = document.getElementById("en-btn");

  const savedLanguage = localStorage.getItem("siteLanguage") || "tr";
  setLanguage(savedLanguage);

  if (trBtn) {
    trBtn.addEventListener("click", () => {
      setLanguage("tr");
    });
  }

  if (enBtn) {
    enBtn.addEventListener("click", () => {
      setLanguage("en");
    });
  }
});
