const BASE_URL = "http://localhost:3000/Users"

const profileImage = document.querySelector("#image_url")
const profileName = document.querySelector("#name")
const profileInstruments = document.querySelector("#instruments")
const profileGenre = document.querySelector("#description")

document
    .querySelector("#Information-fill-out")
    
const button = document.querySelector("#button")
 



function getAllMusicians(){
    return fetch("http://localhost:3000/Users")
    .then(res => res.json())
    
}

getAllMusicians().then(data => data.forEach(element => renderMusician(element)))

const cards = document.querySelector(".cards")


function renderMusician(musicianObj){
    console.log(musicianObj.profileImgUrl)
    const newCard = document.createElement("li")
    newCard.className = "card"
    const musicianName = document.createElement("p")
    musicianName.textContent = `Name: ${musicianObj.name}`
    const musicianPicture = document.createElement("img")
    musicianPicture.src = musicianObj.profileImgUrl
    newCard.appendChild(musicianPicture)
    newCard.appendChild(musicianName)
    const musicianInstrument = document.createElement("p")
    musicianInstrument.id = `musicianInstrument`
    musicianInstrument.textContent = `Instrument(s): ${musicianObj.instruments}`
    newCard.appendChild(musicianInstrument)
    const musicianGenre = document.createElement("p")
    musicianGenre.textContent = `Genre Specialty: ${musicianObj.genreSpecialty}`
    newCard.appendChild(musicianGenre)
    cards.appendChild(newCard)
    newCard.instrument = musicianObj.instruments
    const deleteMusicianButton = document.createElement("button")
    deleteMusicianButton.id = musicianObj.id
    deleteMusicianButton.innerHTML = "Delete"
    deleteMusicianButton.style.background = '#DC143C'
    deleteMusicianButton.addEventListener("click", deleteMusician)
    newCard.appendChild(deleteMusicianButton)
}

function deleteMusician(e){

    fetch(BASE_URL +"/" + e.target.id,{
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => console.log("Deleted"))
}





function handleMusicianFormSubmit(e){
    e.preventDefault();

    console.log(e.target)
    console.log(profileImage.value)
    console.log(profileName.value)
    console.log(profileInstruments.value)
    console.log(profileGenre.value)

    const musicianObject = {
        profileImgUrl: profileImage.value,
        name: profileName.value,
        instruments: profileInstruments.value,
        genreSpecialty: profileGenre.value
    } 
    
    


    const config = {
    method: "POST",
    headers:{
    "Content-Type": "application/json"},
    body: JSON.stringify(musicianObject)
    }
   fetch(BASE_URL, config)
    .then(res => res.json())
    .then(newMusician => {
        renderMusician(newMusician)
    })



   
    
}



document.querySelector("#Information-fill-out").addEventListener("submit", e => handleMusicianFormSubmit(e));

document.addEventListener("DOMContentLoaded", () =>{

    let dropdown = document.querySelector("#dropdown")
    dropdown.addEventListener("change", findInstrument)
})

let allInstruments = []

const findInstrument = event =>{
    getAllMusicians().then(musicianList => {
        console.log(event)
        console.log(musicianList)
        
        console.dir(event.target.value)
        let instrumentValue = event.target.value
        console.log(instrumentValue)

        
        if (instrumentValue !== "All"){
            musicianList = musicianList.filter(musician => musician.instruments === instrumentValue)//( element => element.BASE_URL.instruments == instrumentValue)
            console.log(musicianList)
        }
        

        cards.innerHTML = ""
        musicianList.forEach(musician => renderMusician(musician))

    })
    // let musicianList = document.querySelectorAll(".card")
    // musicianList = Array.from(musicianList) //converting musicianList from NodeList to an array

    

};
