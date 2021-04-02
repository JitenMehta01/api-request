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
    console.log(originalDate);
    const month = originalDate.splice(1, 1).join('');
    originalDate.unshift(month);
    const day = originalDate.pop();
    originalDate.unshift(day);
    console.log(originalDate);

    return originalDate

}


function modalWindow (data){
    gallery.addEventListener('click', e =>{
        const card = e.target.closest('.card');
        if(card){
            const modalContainer = document.createElement('div');
            modalContainer.className = 'modal-container';
            if(gallery.lastElementChild.className !== 'modal-container'){
            gallery.insertAdjacentElement('beforeend', modalContainer);
            const email = card.querySelector('.card-info-container p:nth-child(2)').textContent;
            data.map(person =>{
                if(person.email === email){
                    modalContainer.innerHTML = modalHTML(person);
                    const test = transformDate(person.dob.date);

                }
            })
            }
        }
    })
}

grabData(apiUrl)
.then(generateHTML)
.then(modalWindow)

