// Carousel for the images 
const images = document.querySelectorAll(".Posts");
images.forEach(function (image) {
  image.onclick = function (event) {
    document
      .querySelector(".mainimages")
      .classList.remove("mainimages");
    const clickParent = event.target.parentNode;
    clickParent.classList.add("mainimages");
  };
});


// API fetch
const BASE_URL = 'https://cors.noroff.dev/fitness-power.pami.no/wp-json/wp/v2/Posts?per_page=12&_embed';

let currentPage = 1; // The current page of posts
const postsPerPage = 4; // Number of posts to display per page
let totalPosts = 0; //  Getting the total number of blog posts


// fetching the total number of posts
async function fetchAllPosts() {
    try {
      const response = await fetch(`${BASE_URL}`);
      const data = await response.json();
      totalPosts = data.length;
    } catch (error) {
      console.error("Error fetching total posts", error);
    }
  }

// rendering latest posts in the carousel
async function renderLatestPosts(page) {
    const carousel_container = document.querySelector(".carousel");
  
    try {
      // Fetch the latest posts based on the current page
      const response = await fetch(
        `${BASE_URL}&per_page=${postsPerPage}&orderby=date&page=${page}`
      );
      const data = await response.json();
  
      // Clear existing carousel items
      carousel_container.innerHTML = "";
  
      // Loop through the fetched posts and create carousel items
      data.forEach(function (post) {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
  
        // Create post content
        const postContent = `
          <a href="Blog-details.html?id=${post.id}">
            <img class="postimages" src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post.title.rendered}">
            <h3>${post.title.rendered}</h3>
          </a>
        `;
  
        carouselItem.innerHTML = postContent;
        carousel_container.appendChild(carouselItem);
      });
    } catch (error) {
      console.error("Error loading latest posts", error);
    }
  }

  // Initialize the carousel by fetching total posts and rendering the first page
 fetchAllPosts().then(() => {
    renderLatestPosts(currentPage);
  });
  
  // Buttons
  // Event listeners for next and previous buttons
  const prevButton = document.getElementById("carousel_button_prev");
  const nextButton = document.getElementById("carousel_button_next");
  
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderLatestPosts(currentPage);
    }
  });
  
  nextButton.addEventListener("click", () => {
    const maxPage = Math.ceil(totalPosts / postsPerPage);
    if (currentPage < maxPage) {
      currentPage++;
    } else {
      // If we are on the last page, go back to the first page
      currentPage = 1;
    }
    renderLatestPosts(currentPage);
  });

