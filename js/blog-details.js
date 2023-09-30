const mainElement = document.querySelector(".blog-details")
const querystring = document.location.search;
console.log({querystring});
const params = new URLSearchParams(querystring);
const id = params.get('id');


 const BASE_URL = `https://cors.noroff.dev/fitness-power.pami.no/wp-json/wp/v2/Posts/${id}`


async function fetchdata() {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data)
    return data;
}
fetchdata();

async function renderHTml() {
    const blogdiv = await fetchdata();
    const mainElement = document.querySelector(".blog-details");
    mainElement.innerHTML = `
    
        <div>
            <h1>Blog details</h1>
            <img id="specificimg" src ="${blogdiv.jetpack_featured_media_url}"/>
        </div>
        <div id="blog-content">    
            <h4>${blogdiv.title.rendered}</h4>
            <p> ${blogdiv.content.rendered}</p>
            
        </div>
    
        
    `
    document.title = `Fitness Power - ${blogdiv.title.rendered}`;
    //console.log(products);

}

renderHTml()

// triggering the modal
const modal = document.getElementById("imageModal");
const modalimage = document.getElementById("modal-image");
const closemodal = document.getElementById("close");
const overlay = document.createElement("div");
overlay.className = "modal-overlay";
console.log(modal);

document.body.appendChild(overlay);

document.getElementById("specificimg").addEventListener("click", function () {
  modal.style.display = "block";
  overlay.style.display = "block";
  modalimage.src = this.src;
});

closemodal.addEventListener("click", function () {
  modal.style.display = "none";
  overlay.style.display = "none";
});

overlay.addEventListener("click", function () {
    modal.style.display = "none";
    overlay.style.display = "none";
  });

