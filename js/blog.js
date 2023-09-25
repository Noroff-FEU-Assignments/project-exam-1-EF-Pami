document.addEventListener("DOMContentLoaded", async function () {
    let firstBlogs = document.querySelector(".first-ten-blogs");
    const more_blog = document.querySelector(".more-blogs")
    //let viewMore = document.querySelector(".more-blogs");

    //fetching posts API
    const BASE_URL = 'https://cors.noroff.dev/fitness-power.pami.no/wp-json/wp/v2/Posts?_embed'


  
  async function fetchData(page, perPage) {
    try {
      const response = await fetch(
        `${BASE_URL}&page=${page}&per_page=${perPage}`
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error loading blogs", error);
      throw error;
    }
  }

  // Render the posts from API call
  async function renderHTML() {
    try {
      const blogpost = await fetchData(currentPage, postsPerPage);

      // Append the new blogs to the existing content
      blogpost.forEach(function (element) {
        const postsElement = document.createElement("li");
        const Postsblogs = `
          <div class="first-ten-blogs">
            <div class="box">
                <h3>${element.title.rendered}</h3>
                <img class="featuredimage" src="${element._embedded["wp:featuredmedia"][0].source_url}" alt="#" />
                <p> ${element.excerpt.rendered}</p>
                <button class="btn"> Read more </button>
            </div>
          </div>
        `;
        postsElement.innerHTML = Postsblogs;
        postsElement.addEventListener("click", function () {
          window.location.href = `Blog-details.html?id=${element.id}`;
        });

        firstBlogs.appendChild(postsElement); // Append to the existing content
      });

      if (blogpost.length < postsPerPage) {
        loadMoreButton.style.display = "none";
      } 
      
     // Removes the loading element after rendering
     const loading = document.getElementById("loading");
     loading.remove();
   } catch (error) {
     console.error("Error rendering HTML", error);
     throw error
   }
 }

 // "Load more"-button code
 let currentPage = 1;
 const postsPerPage = 9;

 // Function to load more posts
 function loadMorePosts() {
   currentPage++;
   renderHTML();
 }

 // Click event listener to "Load More" button
 const loadMoreButton = document.getElementById("loadmorebtn");
 loadMoreButton.addEventListener("click", loadMorePosts);

 // Fetching and rendering the initial posts
 const initialPosts = await fetchData(currentPage, postsPerPage);
 renderHTML();
});