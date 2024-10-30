// fonction teste pour html css 
 function ReadMore() {

    document.getElementById("display").style.display = "block"; //pour ouvrir le modal
 }

 function ReadLess() {
     document.getElementById("display").style.display = "none"; // pour le fermer 
 }

const more = document.getElementById("mybutton");
 more.addEventListener("click", ReadMore);

 const close = document.querySelector(".close");
close.addEventListener("click", ReadLess);
 

//fonction pour intégrer le forms dans le modal du homepage 
function Apply() {
    document.getElementById("forms").style.display = "block";
}

function closeApply() {
    document.getElementById("forms").style.display = "none";
}

window.onclick = function (event) {
    var containerforms = document.getElementById("forms");
    if (event.target === containerforms) {
        containerforms.style.display = "none";
    }
}




// fonction pour ouvrir les modals avec différentes description lorsque les ad seront chargés via DB 
function openModal(modalId) {
    document.querySelector(".modal").style.display = "block";

    // requete get pour charger les info dans le serveur 

    fetch('getData?modal=$[modalID]')
        .then(response => response.json())
        .then(data => {
            document.querySelector('$[modal]Content').textContent = data.content;
        })
        .catch(error => console.error('Erreur:', error));
}


function closeModal(modalID) {
    document.querySelector(".modal").style.display = "none"; // pour le fermer 
}


const learnmore = document.getElementById("mybutton");
learnmore.addEventListener("click", openModal);

const closeButton = document.querySelector(".close");
learnmore.addEventListener("click", closeModal);


// requete GET 
export async function getOne(req, res) {
    try {
        const id = req.query.modal
        const data = await getOneThing(id)
        if (data) {
            res.status(200).json({ message: `Data ID=${id} accessed with sucess`, data })
        } else {
            res.status(404).json({ message: `Data ID=${id} not found` })
        }
    }
    catch (error) {
        console.error('Error fetching data', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}



// fonction pour recueillir les données entrées par les JS lorsqu'ils postules via formulaire 
// requête post !! 

