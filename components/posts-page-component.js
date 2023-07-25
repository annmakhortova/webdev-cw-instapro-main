import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  if (posts.length === 0){
    return
   }
   
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
    const appHtml = posts.map((post) => {
    console.log(post.likes.length)
    let likeLen = post.likes.length
    const first = post.likes[0]
    let likesText = ''
    let likesCount = likeLen - 1
    if (first) {
      likesText = first.name
    }
    return `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        <li class="post">
          <div class="post-header" data-user-id="${post.userId}">
              <img src="${post.userUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${post.userName}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.postUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${post.postId}" class="like-button">
              <img src="./assets/images/like-active.svg">
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${(!first) ? likeLen : (likeLen === 1) ? likesText : likesText + " и еще " + likesCount}</strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${post.userName}</span>
            ${post.description}
          </p>
          <p class="post-date">
          ${post.postDate}
          </p>
        </li>
        <li class="post">
      </ul>
    </div>`
  })

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}

