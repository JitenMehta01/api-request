//api
const apiUrl = 'https://randomuser.me/api/?results=12';

// other var
const gallery = document.getElementById('gallery');


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
    gallery.addEventListener('click', e =>{
        if(e.target.closest('.card')){
            const modalContainer = document.createElement('div');
            modalContainer.className = 'modal-container';
            // if there is no modawindow, create one when a a card is clicked.
            if(gallery.lastElementChild.className === 'card'){
            gallery.insertAdjacentElement('beforeend', modalContainer);
            const email = document.querySelector('.card .card-info-container p:nth-child(2)').textContent;
            data.map(person =>{
            // if the email on the card is the same as the person data's email, fill the card with content.
                if(person.email === email){
                    modalContainer.innerHTML = modalHTML(person);
                    return modalContainer;
                }
            });
            }
        } else if(e.target.id === 'modal-close-btn'){
            const closeModal = document.querySelector('#modal-close-btn');
            closeModal.addEventListener('click', (
                
            ) =>{
                console.log('working');
            })
        }         
    });
    
}











        
        




















grabData(apiUrl)
.then(generateHTML)
.then(modalWindow)


