
import { renderCategories, renderMails, showModal } from "./ui.js";
import { getDate } from "./helper.js";
import { categories } from "./contans.js";



const hamburgerMenu = document.querySelector(".hamburger-menu");
const navigation = document.querySelector("nav");
const createMailBtn = document.querySelector(".create");
const modal = document.querySelector(".modal-wrapper");
const closeModalBtn = document.querySelector("#close-btn");
const form = document.querySelector("#create-mail-form");
const mailArea = document.querySelector(".mails-area")
const strMailData = localStorage.getItem("data");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-icon");
const categoryArea = document.querySelector(".nav-middle");




// localstoragedan gelen verileri javascript nesnesine çevir
const mailData = JSON.parse(strMailData) || [];


document.addEventListener("DOMContentLoaded", () => {
  renderMails(mailArea, mailData);
});

hamburgerMenu.addEventListener("click", () => {
  navigation.classList.toggle("hide");
})

createMailBtn.addEventListener("click", () => showModal(modal, true));
closeModalBtn.addEventListener("click", () => showModal(modal, false));


window.addEventListener("resize", (e) => {
  const width = e.target.innerWidth;

  if (width < 1100) {
    navigation.classList.add("hide");
  }
  else {
    navigation.classList.remove("hide");
  }

});




const watchCategory= (e)=>{
  const leftNav = e.target.parentElement;
  const selectedCategory = leftNav.dataset.name;
  renderCategories(categoryArea,categories,selectedCategory);

  if(selectedCategory === "Yıldızlananlar"){
    const filtered = mailData.filter((i)=> i.stared === true);
    renderMails(mailArea,filtered);
    return;
  }
};

categoryArea.addEventListener("click", watchCategory);



const sendMail = (e) => {
  e.preventDefault();
  const recevier = (e.target[0].value);
  const title = (e.target[1].value);
  const message = (e.target[2].value);

  if (!recevier || !title || !message) {

    Toastify({
      text: "Form doldurunuz",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#FDCC00",
        borderRadius: "10px",
      },

      onClick: function () { } // Callback after click
    }).showToast();


    return;
  };

  const newMail = {
    // recevier,title,message,id,date
    id: new Date().getTime(),
    sender: "CİHAN",
    recevier,
    title,
    message,
    stared: false,
    date: getDate(),
  };

  mailData.unshift(newMail);

  const strData = JSON.stringify(mailData);
  // Stringe çevrilen veriyi localstorage kayıt et.Localstorage verileri key-value değer çiftleri halinde ister.

  // Formun gönderilmesiyle elde edilen verileri localstorage a kayıt et
  localStorage.setItem("data", strData);
  //Modal içerisindeki inputları sıfırla
  e.target[0].value = "";
  e.target[1].value = "";
  e.target[2].value = "";

  showModal(modal, false);

  Toastify({
    text: "Mail başarıyla gönderildi.",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#24BB33",
      borderRadius: "10px",
    },
    onClick: function () { }, // Callback after click
  }).showToast();

  renderMails(mailArea, mailData);


};

const updateMail = (e) => {
  // Eğer silme butonuna tıklandıysa bu maili sil
  if (e.target.classList.contains("bi-trash-fill")) {
    // Sil iconuna tıklayınca mail elemanını silmemiz gerekir.Bunu iconun kapsam elemanına erişerek yaparız.

    // const mail = e.target.parentElement.parentElement.parentElement;
    const mail = e.target.closest(".mail");
    // Mailin id'sine eriş
    const mailId = mail.dataset.id;
    // Id si bilinen elemanı diziden kaldır
    const filtredData = mailData.filter((mail) => mail.id != mailId);
    // Filtrelenmiş diziyi localstorage aktar
    // i-) filtrelenmiş maili stringe çevir
    const strData = JSON.stringify(filtredData);
    // ii-) Localstoragedan verileri kaldır
    localStorage.removeItem("data");
    // iii-) Filtrelenmiş veriyi localstorage aktar
    localStorage.setItem("data", strData);

    // Kaldırılan maili arayüzden de kaldır
    mail.remove();
  }

  if (
    e.target.classList.contains("bi-star") ||
    e.target.classList.contains("bi-star-fill")
  ) {
    const mail = e.target.parentElement.parentElement;

    const mailId = mail.dataset.id;
    // mailData localStorage dizi
    const FoundedMail = mailData.find((i) => i.id == mailId);

    const updateMail = { ...FoundedMail, stared: !FoundedMail.stared };
    const index = mailData.findIndex((i) => i.id == mailId);

    mailData[index] = updateMail;

    localStorage.setItem("data", JSON.stringify(mailData));


    renderMails(mailArea, mailData);

  };

};

form.addEventListener("submit", sendMail);

mailArea.addEventListener("click", updateMail);


// search aralınan metni render eder

searchButton.addEventListener("click", () => {
  const filtredArray = mailData.filter((i) => {
    return i.message.toLowerCase().includes(searchInput.value.toLowerCase());
  });

  renderMails(mailArea, filtredArray);


});