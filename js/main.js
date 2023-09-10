
const posts = document.querySelector(".posts")
const latest_posts = document.querySelector(".latest-posts")

const BASE_URL = 'https://cors.noroff.dev/fitness-power.pami.no/wp-json/wp/v2/Posts?per_page=12&_embed'
//const BASE_URL = ' https://public-api.wordpress.com/wp/v2/sites/fitness-power.pami.no.wordpress.com/posts'
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
//fetchdata()

async function renderHTml() {
    const Posts = await fetchdata();
    
    console.log({Posts})
    //console.log({html: latest_posts.innerHTML})
    latest_posts.innerHTML = ``;

    Posts.forEach(function (element) {
        const allpostsElement = document.createElement("div");

        const mainPosts = `
        <div class="firstPost">
            <img class="firstimages" src="${element._embedded["wp:featuredmedia"][0].source_url}" alt="#"/>
            <h4>${element.title.rendered}</h4>
        </div>
        `;

        allpostsElement.innerHTML = mainPosts;
        latest_posts.appendChild(allpostsElement);
    
    })
}

renderHTml();
    