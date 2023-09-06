const blog_container = document.querySelector(".blog-container")
const first_ten_blog = document.querySelector(".first-ten-blogs")
const more_blog = document.querySelector(".more-blogs")

const BASE_URL = 'https://cors.noroff.dev/fitness-power.pami.no/wp-json/wc/store/products?'
async function fetchdata() {
    try {
        console.log (BASE_URL)
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;

        } catch (error) {
        //console.error(error);
    }
    
}

async function renderblog() {
    const products = await fetchdata();
    
    console.log({products})
    //console.log({html: latest_posts.innerHTML})
    first_ten_blog.innerHTML = ``;
    
    products.forEach((products) => {
        const productDiv = document.createElement("div");
        productDiv.className = "first-blogs";

        const productsName = document.createElement("h3");
        productsName.textContent = products.name;

        const thumbnailimg = document.createElement("img");
        thumbnailimg.src =products.images[0].src || ""; 
        thumbnailimg.alt = products.name
        productDiv.appendChild(thumbnailimg);

        //const productPrices = document.createElement("p");
        //productPrices.textContent = "prices:" + products.prices.price;

        const Button = document.createElement("a");
        Button.textContent = "View More";
        Button.className = "cta-button";
        Button.href = `Blog-details.html?id=${products.id}`;
        
        
        productDiv.appendChild(productsName);
        //productDiv.appendChild(productPrices);
        productDiv.appendChild(Button);
        first_ten_blog.appendChild(productDiv);

    })

    for(let count = 0; count <= products.length; count++){
        
        if (count ==9) break;
    }
}
        
renderblog()