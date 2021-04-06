//api
const apiUrl = 'https://randomuser.me/api/?results=12';

// other var
const gallery = document.getElementById('gallery');
const search = document.querySelector('.search-container');


// helper fetch function
async function getJSON(url){
try {
    const response = await fetch(url);
    return await response.json()
} catch (error) {
    throw error;
}
}

async function grabData(url){
    const response = await getJSON(url);
    const data = response.results;
    return Promise.all(data);
}



function modalWindow (data){
    let personIndex;
    gallery.addEventListener('click', e =>{
        const card = e.target.closest('.card');
        const modalContainer = document.querySelector('.modal-container');
        // if the user clicks on a card, create a modalWindow
        if(card){
            const modalContainer = document.createElement('div');
            modalContainer.className = 'modal-container';
            // if there is no modawindow, create one when a a card is clicked.
            if(gallery.lastElementChild.className === 'card'){
            gallery.insertAdjacentElement('beforeend', modalContainer);
            const email = card.querySelector('.card-info-container p:nth-child(2)').textContent;
            data.map((person, index) =>{
            // if the email on the card is the same as the person data's email, fill the card with content.
                if(person.email === email){
                    personIndex = index;
                    console.log(personIndex);
                    modalContainer.innerHTML = modalHTML(person);
                }
            });
            }
        } 
        // if the user clicks on on the X button, close the modal
        else if(e.target.closest('#modal-close-btn')){
            const modalContainer = document.querySelector('.modal-container');
            gallery.removeChild(modalContainer);
            
        }
        // if the user clicks on the next button, render the next person in the data array into HTML
        else if(e.target.closest('#modal-next')){
             if(personIndex < data.length -1){
            modalContainer.innerHTML = modalHTML(data[personIndex += 1]);
             } else{
                 document.querySelector('#modal-next').disabled = true;
             }
         }
        // if the user clicks on the prev button, render the next person in the data array into HTML
         else if(e.target.closest('#modal-prev')){
             if(personIndex > 0 ){
            modalContainer.innerHTML = modalHTML(data[personIndex -= 1]);
             } else{
            document.querySelector('#modal-prev').disabled = true;
             }
         }
              
    });

}

// create a variable which holds the uppercase value ofsearch bar
// create a variable which holds an array of the names from data
// add a keydown event listener to the searchbar
  // iterate through the array
  // if the value of the searchbar matches an index and returns a value that is less than 0, set the display to none. Otherwise set it to initial. 

  function filter () {
const personName = [...document.querySelectorAll('.card-info-container h3')];
  const searchValue = search.querySelector('#search-input').value.toLowerCase(); 
  console.log(searchValue);
  personName.forEach(person =>{
      const card = person.closest('.card');
      if(person.textContent.toLowerCase().indexOf(searchValue) < 0){
          card.style.display = 'none';
      } else{
          card.style.display = '';
      }
  });
}

search.addEventListener('keyup', () =>{
    filter();
});

search.addEventListener('click', () =>{
    filter();
});







grabData(apiUrl)
.then(generateHTML)
.then(modalWindow);


