const blog_container = document.querySelector(".blog-container")
const first_ten_blogs = document.querySelector(".first-ten-blogs")
const more_blog = document.querySelector(".more-blogs")

const BASE_URL = 'https://cors.noroff.dev/fitness-power.pami.no/wp-json/wp/v2/Posts?_embed'


async function fetchdata() {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("error")
        throw error;
    }
}
fetchdata();

async function renderHTml() {
    const blogpost = await fetchdata();
    console.log({blogpost})

    first_ten_blogs.innerHTML = ``;

    blogpost.forEach(function (element) {
        const PostsElement = document.createElement("li");

        const Postsblogs = `
        <div class= "first-ten-blogs">
        <h2>${element.title.rendered}</h2>
        <img class= "featuredimage" src ="${element._embedded["wp:featuredmedia"][0].source_url}" alt="#"/>
        <p> ${element.excerpt.rendered}</p>
        </div>
        `;

        PostsElement.innerHTML = Postsblogs;

        PostsElement.addEventListener("click", function () {
            window.location.href = `Blog-details.html?id=${element.id}`;
        });

        first_ten_blogs.appendChild(PostsElement);
    });
}

renderHTml();