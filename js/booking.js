const bookingServices = {
  "İki Kornrows": { price: 3500, lengths: ["Standart"] },
  "Erkek 5'li Kornrows": { price: 3500, lengths: ["Standart"] },
  "Full Arkaya Doğru Kornrows": { price: 5500, lengths: ["Standart"] },

  "Klasik Afrika Örgü": {
    prices: {
      "Göğüs Üstü": 4500,
      "Bel Hizası": 6800,
      "Popo Üstü": 7500
    }
  },

  "Afro Örgü": {
    prices: {
      "Göğüs Üstü": 4500,
      "Bel Hizası": 6800,
      "Popo Üstü": 7500
    }
  },

  "Mini Box Braids": {
    prices: {
      "Göğüs Üstü": 7000,
      "Bel Hizası": 8000
    }
  }
};

const bookingConfig = {
  whatsapp: "905396637406",
  accountName: "Tuğrahan Şibil",
  iban: "TR46 0011 1000 0000 0152 0406 81"
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  const nameInput = form.querySelector('[name="name"]');
  const surnameInput = form.querySelector('[name="surname"]');
  const phoneInput = form.querySelector('[name="phone"]');
  const emailInput = form.querySelector('[name="email"]');
  const serviceSelect = form.querySelector('[name="service"]');
  const lengthSelect = form.querySelector('[name="length"]');
  const dateInput = form.querySelector('[name="date"]');
  const timeInput = form.querySelector('[name="time"]');
  const noteInput = form.querySelector('[name="note"]');
  const paymentCheck = form.querySelector('.payment input[type="checkbox"]');

  serviceSelect.innerHTML = `<option value="">Hizmet Seçiniz</option>`;
  lengthSelect.innerHTML = `<option value="">Uzunluk Seçiniz</option>`;

  Object.keys(bookingServices).forEach((serviceName) => {
    const option = document.createElement("option");
    option.value = serviceName;
    option.textContent = serviceName;
    serviceSelect.appendChild(option);
  });

  const summary = document.createElement("div");
  summary.className = "booking-price-box";
  summary.innerHTML = `
    <h3>Randevu Özeti</h3>
    <p id="bookingSummary">Hizmet seçiniz</p>
  `;

  form.insertBefore(summary, form.querySelector(".payment"));

  serviceSelect.addEventListener("change", () => {
    const service = bookingServices[serviceSelect.value];

    lengthSelect.innerHTML = `<option value="">Uzunluk Seçiniz</option>`;

    if (!service) {
      updateSummary();
      return;
    }

    if (service.price) {
      service.lengths.forEach((length) => {
        const option = document.createElement("option");
        option.value = length;
        option.textContent = `${length} - ${service.price.toLocaleString("tr-TR")} TL`;
        lengthSelect.appendChild(option);
      });
    }

    if (service.prices) {
      Object.entries(service.prices).forEach(([length, price]) => {
        const option = document.createElement("option");
        option.value = length;
        option.textContent = `${length} - ${price.toLocaleString("tr-TR")} TL`;
        lengthSelect.appendChild(option);
      });
    }

    updateSummary();
  });

  [lengthSelect, dateInput, timeInput].forEach((input) => {
    input.addEventListener("change", updateSummary);
  });

  [nameInput, surnameInput, phoneInput].forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim()) input.classList.add("valid-field");
      else input.classList.remove("valid-field");
    });
  });

  function getPrice() {
    const service = bookingServices[serviceSelect.value];
    const length = lengthSelect.value;

    if (!service || !length) return null;

    if (service.price) return service.price;

    if (service.prices && service.prices[length]) {
      return service.prices[length];
    }

    return null;
  }

  function updateSummary() {
    const price = getPrice();
    const summaryBox = document.getElementById("bookingSummary");

    if (!summaryBox) return;

    if (!serviceSelect.value) {
      summaryBox.textContent = "Hizmet seçiniz";
      return;
    }

    if (!lengthSelect.value) {
      summaryBox.textContent = "Uzunluk seçiniz";
      return;
    }

    summaryBox.innerHTML = `
      <strong>${serviceSelect.value}</strong><br>
      ${lengthSelect.value}<br>
      ${price.toLocaleString("tr-TR")} TL
      ${dateInput.value ? `<br>${dateInput.value}` : ""}
      ${timeInput.value ? ` - ${timeInput.value}` : ""}
    `;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    clearErrors();

    const price = getPrice();

    if (!validateField(nameInput, "Lütfen adınızı yazınız.")) return;
    if (!validateField(surnameInput, "Lütfen soyadınızı yazınız.")) return;
    if (!validateField(phoneInput, "Lütfen telefon numaranızı yazınız.")) return;
    if (!validateField(serviceSelect, "Lütfen hizmet seçiniz.")) return;
    if (!validateField(lengthSelect, "Lütfen uzunluk seçiniz.")) return;
    if (!validateField(dateInput, "Lütfen tarih seçiniz.")) return;
    if (!validateField(timeInput, "Lütfen saat seçiniz.")) return;

    if (!paymentCheck.checked) {
      showBookingToast("Lütfen IBAN ödemesini yaptığınızı onaylayınız.", "error");
      return;
    }

    const message = `
Yeni Randevu Talebi

Ad Soyad: ${nameInput.value.trim()} ${surnameInput.value.trim()}
Telefon: ${phoneInput.value.trim()}
E-posta: ${emailInput.value.trim() || "Belirtilmedi"}

Hizmet: ${serviceSelect.value}
Uzunluk: ${lengthSelect.value}
Tutar: ${price.toLocaleString("tr-TR")} TL

Tarih: ${dateInput.value}
Saat: ${timeInput.value}

Not: ${noteInput.value.trim() || "Yok"}

Ödeme Bilgileri:
IBAN ödemesi yapıldı olarak işaretlendi.
Hesap Sahibi: ${bookingConfig.accountName}
IBAN: ${bookingConfig.iban}
`;

    showBookingToast("Randevu bilgileri hazırlandı. WhatsApp açılıyor...", "success");

    setTimeout(() => {
      window.open(
        `https://wa.me/${bookingConfig.whatsapp}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }, 800);

    form.reset();
    updateSummary();
  });

  function validateField(field, message) {
    if (!field.value.trim()) {
      field.classList.add("field-error");
      showBookingToast(message, "error");
      field.focus();
      return false;
    }

    field.classList.remove("field-error");
    return true;
  }

  function clearErrors() {
    form.querySelectorAll(".field-error").forEach((field) => {
      field.classList.remove("field-error");
    });
  }
});

function showBookingToast(message, type) {
  let toast = document.querySelector(".booking-message");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "booking-message";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = `booking-message ${type} show`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}
