function generateHTML(data){
    h1.textContent = `AWESOME STARTUP EMPLOYEE DIRECTORY`;
    search.innerHTML = `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `;
    data.map(person =>{
    const html = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${person.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
        <h3 id = ${person.name.first}-${person.name.last}>${person.name.first} ${person.name.last}</h3>
        <p class = "card-text">${person.email}</p>
        <p class = 'card-text'>${person.location.city}, ${person.location.state}</p>
    </div>
    `;
    gallery.insertAdjacentHTML('beforeend', html);
    });
    console.log(data);
    return data;
}

function modalHTML (data){
    const date = new Date(data.dob.date); // to display dob
return `
<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${data.picture.large}" alt="profile picture">
        <h3 id="${data.name.first}_${data.name.last}_modal" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
        <p class="modal-text">${data.email}</p>
        <p class="modal-text cap">${data.location.city}</p>
        <hr>
        <p class="modal-text">${data.cell}5</p>
        <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.postcode}</p>
        <p class="modal-text">Birthday: ${date.getDay()} / ${date.getMonth()} / ${date.getFullYear()}</p>
    </div>
</div>

<div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
</div>
`
}