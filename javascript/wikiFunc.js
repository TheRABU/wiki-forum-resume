const allPostContainer = document.getElementById("all-post-container");
const latestPostContainer = document.getElementById("latest-post-container");
const searchButton = document.getElementById("search-btn");
const spinner = document.getElementById("loading-spinner");
let readTextCounter = 0;

// fetch all post from the api
const fetchAllPost = (searchText) => {
  //   const response = await fetch(
  //     "https://openapi.programming-hero.com/api/retro-forum/posts"
  //   );
  //   const { data } = response.json();
  //   showAllPostCards(data);
  fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
  )
    .then((response) => response.json())
    .then((data) => showAllPostCards(data, searchText));
  toggleLoadingSpinner(true);
};

// fetchLatestPost
const fetchLatestPosts = () => {
  fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts")
    .then((res) => res.json())
    .then((data) => showLatestPostCards(data));
};

// fetch all posts by searchValue
// const fetchPostBySearch = async (searchText) => {
//   const response = await fetch(

//   );
//   const data = response.json();
//   toggleLoadingSpinner(true);
//   console.log(data);
// };

// show all data
const showAllPostCards = (posts, searchText) => {
  allPostContainer.textContent = "";
  posts.posts.forEach((post) => {
    const postTitle = post.title;
    const eachPostDiv = document.createElement("div");
    eachPostDiv.innerHTML = `
        <div class="card lg:card-side bg-[#F3F3F5] mx-auto shadow-xl w-full lg:w-[750px] max-h-min lg:h-[250px]">
            <figure class="h-full p-3 lg:p-8">
            <div class="indicator">
            <span class="indicator-item badge bg-green-700"></span> 
            <div class="grid w-32 h-32 bg-base-300 place-items-center">
                <img src="${post.image}"/>
            </div>
          </div>
            </figure>
            <div class="card-body px-5 lg:px-14">
              <div class="flex justify-evenly items-center">
                <p>#${post.category}</p>
                <h2>Author: <span>${post.author.name}</span></h2>
              </div>
                <h2 class="card-title">${post.title}</h2>
                <p>
                    ${post.description}
                </p>
              <hr />
              <div class="card-actions justify-between">
                <div class="icons flex gap-x-10">
                  <div class="message flex justify-center items-center gap-x-2">
                    <img src="./images/tabler-icon-message-2.png" alt="" />
                    <p>${post.comment_count}</p>
                  </div>
                  <div class="watch flex justify-center items-center gap-x-2">
                    <img src="./images/tabler-icon-eye.png" alt="" />
                    <p>${post.view_count}</p>
                  </div>
                  <div class="date flex justify-center items-center gap-x-2">
                    <img src="./images/tabler-icon-clock-hour-9.png" alt="" />
                    <p>${post.posted_time}</p>
                  </div>
                </div>
                <div class="">
                  <button class="mark-as-read-btn" onclick="markedAsRead('${post.title}')">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_57_425)">
                        <path
                          d="M13.9998 0C6.26805 0 9.15527e-05 6.26814 9.15527e-05 13.9999C9.15527e-05 21.7314 6.26805 28 13.9998 28C21.7315 28 27.9999 21.7314 27.9999 13.9999C27.9999 6.26814 21.7315 0 13.9998 0ZM14 4.91741L22.2847 10.0835H5.71542L14 4.91741ZM22.3879 18.333H22.3871C22.3871 19.1616 21.7155 19.8331 20.887 19.8331H7.1131C6.28447 19.8331 5.61303 19.1615 5.61303 18.333V10.4122C5.61303 10.3245 5.62199 10.2393 5.63655 10.1556L13.552 15.0914C13.5617 15.0975 13.5721 15.1016 13.5821 15.1072C13.5925 15.113 13.6032 15.1186 13.6138 15.1239C13.6697 15.1527 13.7273 15.176 13.7862 15.1912C13.7923 15.1929 13.7983 15.1936 13.8044 15.195C13.869 15.2102 13.9344 15.2197 13.9998 15.2197H14.0002C14.0007 15.2197 14.0012 15.2197 14.0012 15.2197C14.0665 15.2197 14.1319 15.2105 14.1965 15.195C14.2026 15.1935 14.2086 15.1929 14.2147 15.1912C14.2735 15.176 14.3309 15.1527 14.3871 15.1239C14.3977 15.1186 14.4084 15.113 14.4188 15.1072C14.4287 15.1016 14.4392 15.0975 14.4489 15.0914L22.3644 10.1556C22.3789 10.2393 22.3879 10.3244 22.3879 10.4122V18.333Z"
                          fill="#10B981"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_57_425">
                          <rect width="28" height="28" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
    `;
    // Change the online/offline status of authors from the api's response
    if (post.isActive === false) {
      // Find the avatar elements and toggle their visibility
      const indicatorOnline = eachPostDiv.querySelector(".indicator-item");

      if (indicatorOnline) {
        indicatorOnline.classList.add("bg-red-600");
      } else {
        indicatorOnline.classList.remove("bg-red-600");
      }
    }

    allPostContainer.appendChild(eachPostDiv);
    toggleLoadingSpinner(false);
    // markedAsRead(postTitle);
  });
};
// get All read buttons
// const markReadButtonFunctionality = (id, title) => {
//   const getAllReadTextButtons = document.querySelectorAll(".mark-as-read-btn");
//   getAllReadTextButtons.forEach((button) => {
//     button.addEventListener("click", (readTextCounter) => {
//       markedAsRead(id);
//       readTextCounter++;
//       console.log(readTextCounter);
//     });
//   });
// };

// markAsReadButton's functionality
const addedTitles = [];

const markedAsRead = (title) => {
  if (!addedTitles.includes(title)) {
    const markedAsReadContainer = document.getElementById(
      "append-mark-as-read"
    );
    const newPost = document.createElement("div");
    newPost.innerHTML = `
              <div class="collapse-title text-xl font-medium">
                  ${title}
              </div>
            `;
    markedAsReadContainer.appendChild(newPost);
    addedTitles.push(title);
    // update message counter
    readTextCounter++;
    if (readTextCounter < 0) {
      return;
    }
    const value = document.getElementById("read-text");
    value.innerText = readTextCounter;
  } else {
    window.alert(`This title: ${title} is already added as mark as read`);
  }

  //   console.log("Tile is: ", title);
};

const showLatestPostCards = (cards) => {
  cards.forEach((card) => {
    const eachCardDiv = document.createElement("div");
    eachCardDiv.innerHTML = `
    <div class="card bg-base-100 mx-5 lg:mx-auto h-full shadow-xl">
                <figure class="px-10 pt-3">
                  <img src="${card.cover_image}" alt="Shoes" class="rounded-xl" />
                </figure>
                <div class="flex justify-start mx-auto lg:mx-0 px-2 lg:px-16">
                    <div>
                        <img src="./images/date.png" alt="date-image">
                    </div>
                    <p>${card.author.posted_date}</p>
                </div>
                <div class="card-body items-center text-left">
                  <h2 class="card-title">${card.title}</h2>
                  <p>${card.description}</p>
                  <div class="card-actions">
                    <div class="avatar">
                            <div class="w-12 rounded-full">
                              <img src="${card.profile_image}" />
                            </div>
                    </div>
                    <div class="flex flex-col justify-center">
                        <h2 >${card.author.name}</h2>
                        <p class="author-designation">${card.author.designation}</p>
                    </div>
                  </div>
                </div>
            </div>
    `;

    // if (card.author.designation === undefined) {
    //   const authorPost = document.querySelector(".author-designation");
    //   authorPost.textText = "Unknown";
    // }
    // const {designation} = card.author.designation?undefined: "Unkown";
    // const {posted_date} = card.author.posted_date?undefined: "Unkown";

    latestPostContainer.appendChild(eachCardDiv);
  });
};

// loading spinner
const toggleLoadingSpinner = (isSpinnerLoading) => {
  if (isSpinnerLoading) {
    spinner.classList.remove("hidden");
  } else {
    // spinner.classList.add("hidden");
    setTimeout(() => {
      spinner.classList.add("hidden");
    }, 2000);
  }
};
// handle Search functionality
const handleSearch = () => {
  searchButton.addEventListener("click", () => {
    const searchInput = document.getElementById("search-field");
    const searchText = searchInput.value;
    fetchAllPost(searchText);
  });
};

fetchAllPost("");
fetchLatestPosts();
