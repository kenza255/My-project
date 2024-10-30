async function lfworks() {
    const r = await fetch("http://localhost:8080/ad", {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080"
        }
    });
    const adlist = await r.json()
    datas = adlist.datas
    return datas
}

async function lfcompanies(){
    const r = await fetch(`http://localhost:8080/company`, {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8080"
        }
    })
        const companylist = await r.json()
        companiesdatas = companylist.datas
        return companiesdatas
    };


    lfworks().then(datas => console.log(datas))
    lfcompanies().then(companiesdatas => console.log(companiesdatas))
    
async function loaddata() {
    await lfworks()
    await lfcompanies()
    loadworks()
}

// Mode d'affichage des images //
function loadworks() {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    datas.forEach((data, index) => {
        const pubdate = data.created_at
        formatDate(pubdate)
        const indexcompany = data.idcompany - 1
        const card = document.createElement("fullad");
        card.innerHTML = `
                        <div class="info">
                            <div class="jobtitle">
                                <h3>${data.title}</h3> 
                            </div>
                            <div class="location">
                                <p> ${companiesdatas[indexcompany].name} </p>
                                 <p> ${companiesdatas[indexcompany].location} </p>
                            </div>
                        </div>
                        <div class="short_description">
                            <p>
                                ${data.short_description}
                            </p>
                        </div>
                        <div class="job-info">
                            <div class="type">
                                <p>${data.contract_type}</p>
                                <p>${formatedpubdate}</p>
                            </div>
                            <button class="details-btn mybutton" onclick="ReadMore(${index})">Learn More</button>
                        </div>
                    </div>
                    <div id="display${index}" class="modal hidden">
                        <div class="display-content">
                            <span class="close" onclick="ReadLess(${index})">&times;</span> <!--&times means close button--->
                            <div class="modal-content">
                                <div class="job-details">
                                    <div class="titledate">
                                        <h1>${data.title}</h1>
                                        <h4>Published on: ${formatedpubdate}</h4>
                                    </div>
                                    <div class="plus"> 
                                        <div class="infloc">
                                            <h3>London</h3>
                                            <h3>SWIZI</h3>
                                        </div>
                                        <div class="infcon">
                                            <h3>${data.wages}</h3>
                                        </div>
                                    </div>
                                    <div class="fulldes">
                                        ${data.description}
                                    </div>
                                    <div>
                                        <button class="apply-btn" 
                                        id="apply-btn" 
                                        onclick="loadApplyForm(${index})">Apply</button>
                                    </div>
                                </div>
                                <div id="forms" class="formscontainer hidden">
                                    <span class="previously" onclick="loadJobDetails(${index})"> &#8592 </span>
                                    <h1> You are applying for :</h1>
                                    <h2>${data.title}</h2>
                                    <form id="applicationForm${index}" class="applicationForm">
                                        <input type="hidden" name="idad" value="${data.id}">
                                        <input type="hidden" name="idcompany" value="${data.idcompany}">
                                        <div class="fname">
                                            <label for="name${index}"> Name</label>
                                            <input type="text" id="name${index}" name="name" placeholder="Name and First name ">
                                        </div>
                                        <div class="email ">
                                            <label for="email${index}"><i class="fa fa-envelope"></i> Email</label>
                                            <input type="text" id="email${index}" name="email" placeholder="name@example.com">
                                        </div>
                                        <div class="msg">
                                            <label for="message${index}">Motivation message : </label>
                                            <textarea id="message${index}" name="message" placeholder="Write a motivation text"
                                                style="height:200px"></textarea>
                                        </div>
                                        <div>
                                            <button type="submit" class="sendbtn" id="sendbtn${index}">Send</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>`;
        gallery.appendChild(card);
        const form = document.querySelector(`#applicationForm${index}`)
        if (form){
            form.addEventListener('submit', handleApplication)
        }
    });

}

async function handleApplication(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    try {
        const response = await fetch('http://localhost:8080/appliance',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Send as JSON
            },
            body: JSON.stringify(data) // Convert object to JSON
        });
        if(!response.ok){
            const errorData = await response.json();
            console.error('Error data:', errorData)
            throw new Error(`Error ${response.status}: ${errorData.message}: ${errorData.message}`);
        }
        const result = await response.json()
        alert('Candidature envoyée avec succès ! ')
    } catch (error) {
        console.error ('Erreur', error)
        alert('Unable to send your datas. Please try again')
    }
}

function ReadMore(id) {
    const modal = document.getElementById(`display${id}`);
    modal.style.display = "flex"; // Ouvre la modal
}

function ReadLess(id) {
    const modal = document.getElementById(`display${id}`);
    modal.style.display = "none"; // Ferme la modal 
}


function loadJobDetails(index) {
    const jobdetails = document.querySelector(`#display${index} .job-details`)
    const applyform = document.querySelector (`#display${index} .formscontainer`)
    jobdetails.style.display = 'flex'
    applyform.style.display = 'none'

}

function loadApplyForm(index) {
    const jobdetails = document.querySelector(`#display${index} .job-details`)
    const applyform = document.querySelector (`#display${index} .formscontainer`)
    jobdetails.style.display = 'none'
    applyform.style.display = 'flex'
}

function formatDate(timestamp){
    pubdatetraduction = new Date(timestamp)
    return formatedpubdate = pubdatetraduction.toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day:'2-digit'})
}

loaddata();






