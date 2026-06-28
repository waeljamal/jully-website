/* ===============================
   AFRO HAIR ANKARA - BOOKING
================================ */

const services = {
  "İki Kornrows": {
    category: "Kornrows Koleksiyonu",
    price: 3500,
    lengths: ["Standart"]
  },
  "Erkek 5'li Kornrows": {
    category: "Kornrows Koleksiyonu",
    price: 3500,
    lengths: ["Standart"]
  },
  "Full Arkaya Doğru Kornrows": {
    category: "Kornrows Koleksiyonu",
    price: 5500,
    lengths: ["Standart"]
  },
  "Klasik Afrika Örgü": {
    category: "Klasik Afrika Örgü",
    prices: {
      "Göğüs Üstü": 4500,
      "Bel Hizası": 6800,
      "Popo Üstü": 7500
    }
  },
  "Afro Örgü": {
    category: "Afro Örgü",
    prices: {
      "Göğüs Üstü": 4500,
      "Bel Hizası": 6800,
      "Popo Üstü": 7500
    }
  },
  "Mini Box Braids": {
    category: "Mini Box Braids",
    prices: {
      "Göğüs Üstü": 7000,
      "Bel Hizası": 8000
    }
  }
};

const ibanInfo = {
  name: "Tuğrahan Şibil",
  iban: "TR46 0011 1000 0000 0152 0406 81",
  whatsapp: "905396637406"
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  const inputs = form.querySelectorAll("input");
  const selects = form.querySelectorAll("select");
  const textarea = form.querySelector("textarea");

  const firstName = inputs[0];
  const surname = inputs[1];
  const phone = inputs[2];
  const email = inputs[3];
  const date = inputs[4];
  const time = inputs[5];
  const paymentCheckbox = form.querySelector(".payment input[type='checkbox']");

  const serviceSelect = selects[0];
  const lengthSelect = selects[1];

  serviceSelect.innerHTML = `<option value="">Hizmet Seçiniz</option>`;
  lengthSelect.innerHTML = `<option value="">Uzunluk Seçiniz</option>`;

  Object.keys(services).forEach((serviceName) => {
    const option = document.createElement("option");
    option.value = serviceName;
    option.textContent = serviceName;
    serviceSelect.appendChild(option);
  });

  const priceBox = document.createElement("div");
  priceBox.className = "booking-price-box";
  priceBox.innerHTML = `
    <h3>Toplam Tutar</h3>
    <p id="selectedPrice">Lütfen hizmet seçiniz</p>
  `;

  form.insertBefore(priceBox, form.querySelector(".payment"));

  serviceSelect.addEventListener("change", () => {
    const selectedService = services[serviceSelect.value];

    lengthSelect.innerHTML = `<option value="">Uzunluk Seçiniz</option>`;

    if (!selectedService) {
      updatePrice();
      return;
    }

    if (selectedService.price) {
      selectedService.lengths.forEach((length) => {
        const option = document.createElement("option");
        option.value = length;
        option.textContent = length;
        lengthSelect.appendChild(option);
      });
    }

    if (selectedService.prices) {
      Object.keys(selectedService.prices).forEach((length) => {
        const option = document.createElement("option");
        option.value = length;
        option.textContent = `${length} - ${selectedService.prices[length].toLocaleString("tr-TR")} TL`;
        lengthSelect.appendChild(option);
      });
    }

    updatePrice();
  });

  lengthSelect.addEventListener("change", updatePrice);

  function getSelectedPrice() {
    const selectedService = services[serviceSelect.value];
    const selectedLength = lengthSelect.value;

    if (!selectedService || !selectedLength) return null;

    if (selectedService.price) return selectedService.price;

    if (selectedService.prices && selectedService.prices[selectedLength]) {
      return selectedService.prices[selectedLength];
    }

    return null;
  }

  function updatePrice() {
    const price = getSelectedPrice();
    const selectedPrice = document.getElementById("selectedPrice");

    if (!selectedPrice) return;

    if (price) {
      selectedPrice.textContent = `${price.toLocaleString("tr-TR")} TL`;
    } else {
      selectedPrice.textContent = "Lütfen hizmet ve uzunluk seçiniz";
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const price = getSelectedPrice();

    if (!firstName.value.trim()) {
      showBookingMessage("Lütfen adınızı yazınız.", "error");
      firstName.focus();
      return;
    }

    if (!surname.value.trim()) {
      showBookingMessage("Lütfen soyadınızı yazınız.", "error");
      surname.focus();
      return;
    }

    if (!phone.value.trim()) {
      showBookingMessage("Lütfen telefon numaranızı yazınız.", "error");
      phone.focus();
      return;
    }

    if (!serviceSelect.value) {
      showBookingMessage("Lütfen hizmet seçiniz.", "error");
      serviceSelect.focus();
      return;
    }

    if (!lengthSelect.value) {
      showBookingMessage("Lütfen uzunluk seçiniz.", "error");
      lengthSelect.focus();
      return;
    }

    if (!date.value) {
      showBookingMessage("Lütfen tarih seçiniz.", "error");
      date.focus();
      return;
    }

    if (!time.value) {
      showBookingMessage("Lütfen saat seçiniz.", "error");
      time.focus();
      return;
    }

    if (!paymentCheckbox.checked) {
      showBookingMessage("Randevu onayı için ödeme yaptığınızı işaretleyiniz.", "error");
      return;
    }

    const bookingDetails = `
Yeni Randevu Talebi

Ad Soyad: ${firstName.value} ${surname.value}
Telefon: ${phone.value}
E-posta: ${email.value || "Belirtilmedi"}

Hizmet: ${serviceSelect.value}
Uzunluk: ${lengthSelect.value}
Tutar: ${price.toLocaleString("tr-TR")} TL

Tarih: ${date.value}
Saat: ${time.value}

Not: ${textarea.value || "Yok"}

Ödeme:
IBAN ile ödeme yapıldı olarak işaretlendi.
Hesap Sahibi: ${ibanInfo.name}
IBAN: ${ibanInfo.iban}
`;

    showBookingMessage("Randevu bilgileri hazırlandı. WhatsApp açılıyor...", "success");

    const whatsappUrl =
      `https://wa.me/${ibanInfo.whatsapp}?text=${encodeURIComponent(bookingDetails)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 900);

    form.reset();
    updatePrice();
  });
});

function showBookingMessage(message, type) {
  let box = document.querySelector(".booking-message");

  if (!box) {
    box = document.createElement("div");
    box.className = "booking-message";
    document.body.appendChild(box);
  }

  box.textContent = message;
  box.className = `booking-message ${type} show`;

  setTimeout(() => {
    box.classList.remove("show");
  }, 3500);
}
