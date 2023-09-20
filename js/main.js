
const posts = document.querySelector(".posts")
const latest_posts = document.querySelector(".latest-posts")

const BASE_URL = 'https://cors.noroff.dev/fitness-power.pami.no/wp-json/wp/v2/Posts?per_page=12&_embed'

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
        <section class ="posts">
            <div class="latest-Post">
                <img class="firstimages" src="${element._embedded["wp:featuredmedia"][0].source_url}" alt="#"/>
                <h4>${element.title.rendered}</h4>
            </div>
        </section
        
        `;

    const count = 0;
    const inc = 0;
    margin = 0;
    const slider = document.getElementsByClassName("latest-posts")[0];
    const postDisplay = 0;

    if(screen.width > 900) {
        postDisplay = document.getElementsByClassName("posts")[0].getAttribute("post-display-d");
        margin = postDisplay * 5;
    }

    if(screen.width > 700 && screen.width < 900) {
        postDisplay = document.getElementsByClassName("posts")[0].getAttribute("post-diplay-t");
        margin = postDisplay * 6.8;
    }

    if(screen.width > 280 && screen.width < 700) {
        postDisplay = document.getElementsByClassName("posts")[0].getAttribute("post-display-m");
        margin = postDisplay * 20;
    }

    const firstimages = document.getElementsByClassName("firstimages");
    const postleft = mainPosts.length % postDisplay;
    const postslide = math.floor(mainPosts.length / postDisplay) - 1;
    for(let i = 0; i <mainPosts.length; i++) {
        firstimages[i].style.width = (screen.width / postDisplay) - margin + "px";
    }

    function next() {
        if(inc !== postslide + postleft) {
            if(inc == postslide) {
                inc = inc + postleft;
                count = count - (screen.width / postDisplay) * postleft;
            }
            else {
                inc++;
                count = count - screen.width;
            }
        }
        slider.style.left = count + "px";
    }

    function previous() {
        if(inc !==0) {
            if(inc ==postleft) {
                inc = inc - postleft;
                count = count + (screen.width / postDisplay) * postleft;
            }
            else {
                inc--;
                count = count + screen.width;
            }
        }
        console.log(inc)
        slider.style.left = count + "px";
    }
    



        allpostsElement.innerHTML = mainPosts;
        latest_posts.appendChild(allpostsElement);
    
    })

    
}

renderHTml();
    