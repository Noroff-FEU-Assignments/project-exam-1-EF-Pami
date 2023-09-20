//import { createMessage } from "errorMessage.js";

//fetching data
const blog_container = document.querySelector(".blog-container")
const first_ten_blogs = document.querySelector(".first-ten-blogs")
const more_blog = document.querySelector(".more-blogs")


const BASE_URL = 'https://cors.noroff.dev/fitness-power.pami.no/wp-json/wp/v2/Posts?_embed'

//fetching blogs posts

async function fetchBlogPosts(offset, limit) {
    try {
        return await fetchBlogPosts(`${BASE_URL}&offset=${offset}&limit=${limit}`);
    } catch (error) {
      throw new Error(error);
    }
  }

//creating blog cards

function createBlogCard(blogData) {
    const blogCardContainer = document.createElement("div");
    blogCardContainer.classList = "blog_card";

    const blogCardImage = document.createElement("img");
    blogCardImage.setAttribute("alt", `${blogData.images.alt}`);
    blogCardImage.classList = "blog_card-image";
    blogCardImage.src = `${blogData._embedded["wp:featuredmedia"][0].source_url}" alt="#"`;
    blogCardContainer.appendChild(blogCardImage);

    const blogCardTexContainer = document.createElement("div");
    blogCardTexContainer.classList = "blog_card-textbox";
    blogCardContainer.appendChild(blogCardTexContainer);

    const blogCardHeading = document.createElement("h2");
    blogCardHeading.classList = "blog_card-heading";
    blogCardHeading.innerText = blogData.title.rendered;
    blogCardTexContainer.appendChild(blogCardHeading);

    const blogCardText = document.createElement("p");
    blogCardText.classList = "blog_card-text";
    blogCardText.innerText = blogData.excerpt.rendered;
    blogCardTexContainer.appendChild(blogCardText);

    const readMoreButton = document.createElement("a");
    readMoreButton.classList = "btn";
    readMoreButton.href = `Blog-details.html?id=${blogData.id}`;
    readMoreButton.innerText = " Read more";
    blogCardTexContainer.appendChild(readMoreButton);

  return blogCardContainer;
}

//displaying blog cards

const loaderContainer = document.querySelector(".loader-container");
const blogPostsListContainer = document.querySelector(".blog-container");
const errorMessage = createMessage("error");

let loadingMorePosts = false;
const initialCardsToShow = 10;
const cardsPerLoad = 2;
let totalBlogCards = 12;
let displayedBlogCards = 0;
let newOffset = 0;

async function displayBlogCards() {
    try {
      if (loadingMorePosts) {
        return;
      }

      loadingMorePosts = true;
      loaderContainer.style.display = "block";

      const offset = newOffset;
      const cardsToFetch = displayedBlogCards < initialCardsToShow ? initialCardsToShow : cardsPerLoad;
      const json = await fetchBlogPosts(offset, cardsToFetch);

      if (totalBlogCards === 0) {
        totalBlogCards = json.total;
      }

      if (json.length === 0) {
        loadingMorePosts = false;
        loaderContainer.style.display = "none";
        return;
      }

      json.forEach((blogData) => {
        const blogCard = createBlogCard(blogData);
        blogPostsListContainer.appendChild(blogCard);
      });

      if (json.length < 10) {
        loadingMorePosts = false;
      }

      if (displayedBlogCards >= totalBlogCards) {
        const loadMorebtn = document.getElementById(".loadmorebtn");
        if (loadMorebtn) {
          loadMorebtn.remove();
        }
      } else if (json.length === 10) {
        const loadMorebtn = document.createElement("button");
        loadMorebtn.classList = "laodmorebtn";
        loadMorebtn.innerText = "Load more posts...";
        loadMorebtn.addEventListener("click", function () {
          if (!loadingMorePosts) {
            newOffset += 10;
            displayBlogCards();
            blogPostsListContainer.removeChild(loadMorebtn);
          }
        });

        blogPostsListContainer.appendChild(loadMorebtn);
    } else {
      loadingMorePosts = false;
    }
  } catch (error) {
    console.log(error);
    blogPostsListContainer.innerHTML = errorMessage;
    throw new Error(error);
  } finally {
    loadingMorePosts = false;
    loaderContainer.style.display = "none";
  }
}

displayBlogCards();







  
    

