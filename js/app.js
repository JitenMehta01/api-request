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


function transformDate(date){
    const originalDate = date.slice(0,10).split('-');
    const month = originalDate.splice(1, 1).join('');
    originalDate.unshift(month);
    const day = originalDate.pop();
    originalDate.unshift(day);
    const dob = `
        Birthday: ${originalDate[0]} / ${originalDate[1]} / ${originalDate[2]}`;
    
    return dob;

}


function modalWindow (data){
    gallery.addEventListener('click', e =>{
        const card = e.target.closest('.card');
        // if the event target has .card relativly close by
        if(card){
            const modalContainer = document.createElement('div');
            modalContainer.className = 'modal-container';
            // if there is no modawindow, create one when a a card is clicked.
            if(gallery.lastElementChild.className !== 'modal-container'){
            gallery.insertAdjacentElement('beforeend', modalContainer);
            const email = card.querySelector('.card-info-container p:nth-child(2)').textContent;
            data.map(person =>{
            // if the email on the card is the same as the person data's email, fill the card with content.
                if(person.email === email){
                    modalContainer.innerHTML = modalHTML(person);
                    const dob = document.querySelector('.modal-info-container').lastElementChild;
                    dob.textContent = transformDate(person.dob.date);
                }
            });
            } 
        } 
        // closes modal only if the modal-container exists
        if (gallery.lastElementChild.className === 'modal-container') {
            const closeModal = document.querySelector('#modal-close-btn');
            closeModal.addEventListener('click', e =>{
                const modalContainer = document.querySelector('.modal-container');
                gallery.removeChild(modalContainer);
            })
        }
    });
    return data;
}

function personCarousel(data){
    console.log(data);
}

// map over data
// identify the card match in the data array
// add click event to the next button
// 

grabData(apiUrl)
.then(generateHTML)
.then(modalWindow)
.then(personCarousel)

