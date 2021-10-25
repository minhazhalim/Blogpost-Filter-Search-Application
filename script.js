const postContainer = document.querySelector('.post-container');
const search = document.querySelector('[type="search"]');
const postsToShow = 6;
let maximumDisplayLimit = postsToShow;
let posts = [];
let filteredPosts = [];
function generatePost(post){
     const returnPostDate = (date) => `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][date.getMonth()]} ${date.getDate()},${date.getFullYear()}`;
     const article = document.createElement('article');
     article.classList.add('post');
     article.innerHTML = `
          <div class="post__meta">
               <div class="post__tag--container">${post.meta.tags.map((tag) => `<span class="post__tag">${tag}</span>`).join('')}</div>
               <p class="post__date">${returnPostDate(new Date(post.meta.date))}</p>
          </div>
          <h3 class="post__header"><a href="${post.meta.url}">${post.title}</a></h3>
          <div class="post__author">
               <img class="post__author--avatar" width="55" src="${post.meta.author.avatar}" alt="${post.user.name[0].firstName} ${post.user.name[1].lastName}">
               <div>
                    <p class="post__author--name">${post.user.name[0].firstName} ${post.user.name[1].lastName}</p>
                    <p class="post__author--role"><small>${post.meta.author.jobTitle}</small></p>
               </div>
          </div>
          <div class="post__body">${post.summary}</div>
          <a href="${post.meta.url}" class="button">Read Post</a>
     `;
     return article;
}
function loadPosts(){
     const fragment = document.createDocumentFragment();
     filteredPosts.slice(0,maximumDisplayLimit).map((post) => fragment.appendChild(generatePost(post)));
     postContainer.innerHTML = "";
     postContainer.appendChild(fragment);
}
function filterPosts(){
     const searchFilter = (post) => [post.title,post.summary,post.user.name[0].firstName,post.user.name[1].lastName,post.meta.tags.map((tag) => tag).join('')].join('').toLowerCase().indexOf(search.value.toLowerCase()) !== -1;
     filteredPosts = posts.filter(searchFilter);
     loadPosts();
}
async function fetchPosts(){
     await fetch('posts.json')
          .then((response) => {
               if(!response.ok) throw new Error('Network Response Was Not Ok');
               return response.json();
          })
          .then((data) => {
               posts = data.sort((a,b) => new Date(b.meta.date) - new Date(a.meta.date));
               filterPosts();
          })
          .catch((error) => {
               console.log('There has been a Problem with Your Fetch Operation:',error);
          });
}
fetchPosts();
function viewMorePosts(){
     maximumDisplayLimit += postsToShow;
     loadPosts();
}
document.querySelector('.button--view').addEventListener('click',viewMorePosts);
search.addEventListener('keyup',filterPosts);