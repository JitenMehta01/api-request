//api
const apiUrl = 'https://randomuser.me/api';

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
    const data = [];
    for(let i=0; i < 12; i++){
    let response = await getJSON(url);
    data.push(response.results[0]);
    }
    console.log(data);
    return Promise.all(data);
}


function generateHTML(data){
    data.map(person =>{
    const html = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${person.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
        <h3 id = ${person.name.first}-${person.name.last}>${person.name.first} ${person.name.last}</h3>
        <p class = "card-text">${person.email}</p>
        <p class = 'card-text'>${person.location.city}, ${person.location.state}</p>
    </div>
    `;
    gallery.insertAdjacentHTML('beforeend', html);
    });
}

/* <div class="card">
<div class="card-img-container">
    <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
</div>
<div class="card-info-container">
    <h3 id="name" class="card-name cap">first last</h3>
    <p class="card-text">email</p>
    <p class="card-text cap">city, state</p>
</div>
</div> */


grabData(apiUrl)
.then(generateHTML)