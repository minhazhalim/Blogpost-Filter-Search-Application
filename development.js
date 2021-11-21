const postsContainer = document.querySelector('.posts-container');
const loader = document.querySelector('.loader');
const filter = document.querySelector('.filter');
let limit = 5;
let page = 1;
async function getPosts(){
     const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
     const data = await response.json();
     return data;
}
async function showPosts(){
     const posts = await getPosts();
     posts.forEach(post => {
          const div = document.createElement('div');
          div.classList.add('post');
          div.innerHTML = `
               <div class="number">${post.id}</div>
               <div class="post-info">
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-body">${post.body}</p>
               </div>
          `;
          postsContainer.appendChild(div);
     });
}
showPosts();
function showLoading(){
     loader.classList.add('show');
     setTimeout(() => {
          loader.classList.remove('show');
          setTimeout(() => {
               page++;
               showPosts();
          },300);
     },1000);
}
function filterPosts(event){
     const term = event.target.value.toUpperCase();
     const post = document.querySelectorAll('.post');
     post.forEach(posts => {
          const postTitle = posts.querySelector('.post-title').innerText.toUpperCase();
          const postBody = posts.querySelector('.post-body').innerText.toUpperCase();
          if(postTitle.indexOf(term) > -1 || postBody.indexOf(term) > -1){
               posts.style.display = 'flex';
          }else{
               posts.style.display = 'none';
          }
     });
}
filter.addEventListener('input',filterPosts);
window.addEventListener('scroll',() => {
     const {scrollTop,scrollHeight,clientHeight} = document.documentElement;
     if(scrollHeight - scrollTop === clientHeight) showLoading();
});