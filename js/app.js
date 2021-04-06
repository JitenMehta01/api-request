//api
const apiUrl = 'https://randomuser.me/api/?results=12';

// other var
const gallery = document.getElementById('gallery');
const search = document.querySelector('.search-container');
const h1 = document.querySelector('.header-text-container h1')


// helper fetch function
async function getJSON(url){
try {
    const response = await fetch(url);
    return await response.json()
} catch (error) {
    throw error;
}
}

// waits for a resolved response and returns all data parsed to JSON
async function grabData(url){
    h1.textContent = 'Loading...'
    const response = await getJSON(url);
    const data = response.results;
    return Promise.all(data);
}


// this function takes the parsed data and creates a modal window. This modal window will also be a carousel.
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
 
// this functiona allows users to filter each person when characters are typed in the search bar.
  function filter () {
    const personName = [...document.querySelectorAll('.card-info-container h3')];
    const searchValue = search.querySelector('#search-input').value.toLowerCase(); 
    personName.forEach(person =>{
        const card = person.closest('.card');
        if(person.textContent.toLowerCase().indexOf(searchValue) < 0){
            card.style.display = 'none';
        } else{
            card.style.display = '';
        }
    });
}

// this event listener will listen for characters being typed in
search.addEventListener('keyup', () =>{
    filter();
});

// this event will listen for a click if the search button is clicked. This is incase users paste instead of typing characters.
search.addEventListener('click', e =>{
    if(e.target.id === 'search-submit'){
    filter();
    }
});



grabData(apiUrl)
.then(generateHTML)
.then(modalWindow)
.catch(e =>{
h1.innerHTML = `
Oh no! Something went wrong.
`
console.error(e);
});



