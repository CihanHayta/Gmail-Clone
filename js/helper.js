import { months } from "./contans.js";

// Mail objesi içerisinde kullanılacak tarih verisini oluşturan fonksiyon
const getDate = () => {
  // genel tarih objesi
  const date = new Date();
  // tarih objesi içerisinde gün değerine erişme
  const day = date.getDate();
  // tarih objesi içerisinde ay değerine erişme
  const month = date.getMonth() + 1;
  // Ay numarasına karşılık gelen ay adını bul
  const updatedMonths = months[month - 1];

  // Gün ve ay verisini fonksiyon çağırıldığında geri döndür
  return day + " " + updatedMonths;
};

// Metinleri kısıtlayan fonksiyon
const trimString = (text, max) => {
  // Eğer ilgili metin max değeri aşmamışsa bunu direkt return etsin
  if (text.length < max) {
    return text;
  }
  // Eğer ilgili metin max değeri aşarsa bunu kısıtlasın
  else {
    return text.slice(0, max) + "...";
  }
};

export { getDate, trimString };