const addColor = document.getElementById("add-color");
const textarea = document.getElementById("notas");
const colorList = document.querySelector(".cards");
const cardNotes = colorList.querySelectorAll(".card-theme");
const container = document.querySelector(".card-container");
const emoji = document.querySelector(".flex-emoji");
const emonjiClick = document.getElementById("emonji-click");
const  emojislist = document.querySelectorAll(".flex-emoji li");
let cardCounter = 0;

emonjiClick.addEventListener("click",()=>{
emoji.classList.toggle("hides")
document.querySelector("#add-card").style.display = "none";

})

addColor.addEventListener("click", () => {
  colorList.classList.toggle("hide");
});
const calendario=()=>{
  const data = new Date()
  const dia = data.getDate() 
  const ano=data.getFullYear()
  const meses =data.getMonth()+1
   let mes

  switch(meses){
    case 1:
     mes="01"
     break
     case 2:
      mes="02"
     break
     case 3:
      mes="03"
     break
     case 4:
      mes="04"
     break
     case 5:
      mes="05"
     break
     case 6:
     mes="06"
     break
     case 7:
      mes="07"
     break
     case 8:
      mes="08"
     break 
     case 9:
      mes="09"
     break
     case 10:
     mes=10
     break
     case 11:
     mes=11
     break
     default : 
     mes=12
  }

  return[dia,mes,ano]

}


const deleteCard = (event) => {
  const deleteIcon = event.target.closest(".delete");
  if (deleteIcon) {
    const card = deleteIcon.closest(".card");
    if (card) {
      card.remove();
    }
  }
};
const focusTextarea = (event) => {
  const focusIcon = event.target.closest(".card-edit");
  const saveIcon = event.target.closest(".card-save");
  
  if (focusIcon) {
    const textarea = focusIcon.closest(".card").querySelector(".cart-title");
    const saveButton = focusIcon.closest(".card").querySelector(".card-save");
    const editButton = focusIcon.closest(".card").querySelector(".card-edit");
    if (textarea) {
      saveButton.classList.toggle("salvar");
      editButton.classList.toggle("editar");
      textarea.focus();
    }
  }

  if (saveIcon) {
    const textarea = saveIcon.closest(".card").querySelector(".cart-title");
    const editButton = saveIcon.closest(".card").querySelector(".card-edit");
    const saveButton = saveIcon.closest(".card").querySelector(".card-save");
    if (textarea) {
      editButton.classList.toggle("editar");
      saveButton.classList.toggle("salvar");
      textarea.focus();
     
    }
  }
};

const saveLocalStorage= (cardTextarea) => {

  cardTextarea.addEventListener("input", () => {
    const cardId = cardTextarea.id;
    localStorage.setItem(cardId, cardTextarea.value);
  });
};
let  activeTextarea
cardNotes.forEach((element) => {
  const [dia, mes, ano] = calendario();
  const color = element.style.backgroundColor;
  
  element.addEventListener("click", () => {
    cardCounter++
    const card = document.createElement("div");
    card.classList.add('card');
    card.innerHTML = `
      <i class="fa-solid fa-delete-left delete"></i>
      <textarea name="" id="d${cardCounter}" cols="20" rows="2" class="cart-title"></textarea>
      <div class="card-fooder">
        <small class="data">${dia}-${mes}-${ano}</small>
        <span class="ed-save">
          <small class="card-edit" id="lapis"><i class="fas fa-pen"></i></small>
          <small class="card-save" id="save"><i class="fa-regular fa-floppy-disk"></i></small>
        </span>
      </div>
    `;
    card.style.backgroundColor = color;
    container.prepend(card);

    const cardTextarea = card.querySelector(`#d${cardCounter}`);
     cardTextarea.addEventListener("focus",()=>{
      activeTextarea=cardTextarea
     
     })
     
     const storedText = localStorage.getItem(cardTextarea.id);
     if (storedText) {
       cardTextarea.value = storedText;
     }
 
    
      saveLocalStorage(cardTextarea);
    document.querySelector("#add-card").style.display = "none";

    emojislist.forEach((emoji) => {
      emoji.addEventListener("click", (ev) => {
        const selectedEmoji = ev.target.textContent;
        if (cardTextarea===activeTextarea) {
          cardTextarea.value += selectedEmoji;
         
       
        }
        if(selectedEmoji){
          saveLocalStorage(cardTextarea);
        }
      });
      
    });
   
  });

  
});


container.addEventListener("click",deleteCard)
container.addEventListener("click",focusTextarea)






