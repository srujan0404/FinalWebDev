const postButton = document.getElementById("post-btn");
const postsContainer = document.querySelector(".posts");

function LoadPosts() {
  const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];

  storedPosts.forEach((post) => {
    const newpost = document.createElement("div");
    newpost.classList.add("post-main");
    newpost.innerHTML = `
      <div class="profile">
        <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/031/original/profile_image.png?1706888739" alt="#">
      </div>
      <div class="post-r">
        <div class="post-del">
          <h4>Name</h4>
          <h5>username</h5>
          <div class="post--btns">
            <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/028/original/edit.png?1706888661" alt="#">
            <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/027/original/delete.png?1706888643" alt="#" id="delete-post">
          </div>
        </div>
        <div class="post-txt-area">
          <p>${post.text}</p>
        </div>
        <div class="btns">
          <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/026/original/comment.png?1706888619" alt="#" class="comment-post">
          <img src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/029/original/heart.png?1706888679" alt="#" class="heart-icon">
        </div>
      </div>
    `;

    postsContainer.appendChild(newpost);

    const heartIcon = newpost.querySelector(".heart-icon");
    heartIcon.addEventListener("click", () => {
      newpost.classList.toggle("liked");

      if (newpost.classList.contains("liked")) {
        heartIcon.src =
          "https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/025/original/state_clicked.png?1706888455";
      } else {
        heartIcon.src =
          "https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/029/original/heart.png?1706888679";
      }

      const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const updatedPosts = storedPosts.map((storedPost) => {
        if (storedPost.id === post.id) {
          return { ...storedPost, liked: newpost.classList.contains("liked") };
        }
        return storedPost;
      });
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
    });
    
    const deletePostImage = newpost.querySelector("#delete-post");
    deletePostImage.addEventListener("click", () => {
        console.log("clicked")
      deletePost(post.id);
    });
    
  });

}

function addPost(text) {
  const newpost = { id: Date.now(), text, liked: false };

  const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  storedPosts.push(newpost);
  localStorage.setItem("posts", JSON.stringify(storedPosts));

  LoadPosts();
}

postButton.addEventListener("click", () => {
  const textareaValue = document.getElementById("post-area").value;
  if (textareaValue.trim()) {
    addPost(textareaValue);
    document.getElementById("post-area").value = "";
  }
});

function deletePost(postId) {
  const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  const updatedPosts = storedPosts.filter((post) => post.id !== postId);
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  LoadPosts();
}

LoadPosts();
