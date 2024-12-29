
import { trimString } from "./helper.js";


export function showModal(modal, willOpen) {
  // Modal elemanın açılıp kapanması dışarından verilen bir willOpen değerine bağlı olarak düzenle
  modal.style.display = willOpen ? "block" : "none";

  //   modal.style.display = (willOpen ? "block") Eğer true ise eleman block olacak  : ( "none") değilse none olacak ;
};

export const renderMails = (outlet, data) => {
  // Mail elemanlarının aktarılacağı kapsam içerisine mail verilerini dön

  outlet.innerHTML = data
    .map(
      (mail) => `
         <div class="mail" data-id='${mail.id}'>
         
              <div class="left">
                <input type="checkbox" />
               <i class="bi bi-star${mail.stared ? "-fill" : ""}"></i>
                <span>${mail.recevier} </span>
              </div>
      
              <div class="right">
                <p class="messagge-title">${mail.title} </p>
                <p class="messagge-description">
                  ${trimString(mail.message, 40)}
                </p>
                <p class="messagge-date">${mail.date} </p>
                <div class="delete">
                  <i class="bi bi-trash-fill"></i>
                </div>
              </div>
            </div>
            `
    )
    .join(" ");
};

export function renderCategories(outlet, data, selectedCategory) {
  // Eski kategorileri sil
  outlet.innerHTML = "";
  // Verileri dön ve yeni kategorileri render et
  data.forEach((category) => {
    // Bir eleman oluştur
    const categortyItem = document.createElement("a");
    // Oluşturulan elemana verileri ekle
    categortyItem.dataset.name = category.title;


    // Aktif kategoriye class ekle

    categortyItem.className = selectedCategory === category.title && "active";

    // Category elemanının  içeriğini belirle
    categortyItem.innerHTML = `   
            <i class="${category.class}"></i>
            <span>${category.title}</span>  
    `;
    outlet.appendChild(categortyItem);
  });
}