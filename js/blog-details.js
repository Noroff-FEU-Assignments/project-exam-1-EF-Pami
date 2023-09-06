const mainElement = document.querySelector(".blog-details")
const querystring = document.location.search;
console.log({querystring});
const params = new URLSearchParams(querystring);
const id = params.get('id');


 const BASE_URL = `https://cors.noroff.dev/fitness-power.pami.no/wp-json/wc/store/products/${id}`


async function fetchdata() {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data)
    return data;
}
fetchdata();

async function renderHTml() {
    const products = await fetchdata();
    const mainElement = document.querySelector(".blog-details");
    mainElement.innerHTML = `
    <div>
        <img src ="${products.images[0].src}" alt="${products.name}"/>
    </div>
    <div id="blog-content">    
        <h2> ${products.name}</h2>
        <p> ${products.description}</p>
           
    </div>
        
    `
    document.title = 'product_details';
    //console.log(products);

}

renderHTml()