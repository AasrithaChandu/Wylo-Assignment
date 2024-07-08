let posts = [];
let editPostId = null;

document.getElementById('createPostButton').addEventListener('click', () => {
    showCreatePostScreen();
});

document.getElementById('postForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    if (editPostId !== null) {
        // Update existing post
        const postIndex = posts.findIndex(post => post.id === editPostId);
        posts[postIndex] = {
            id: editPostId,
            title,
            content
        };
        editPostId = null;
    } else {
        // Create new post
        const newPost = {
            id: Date.now(),
            title,
            content
        };
        posts.push(newPost);
    }
    document.getElementById('postForm').reset();
    showPostsDisplayScreen();
    displayPosts();
});

function showCreatePostScreen(post = null) {
    document.getElementById('postsDisplayScreen').classList.add('hidden');
    document.getElementById('createPostScreen').classList.remove('hidden');
    if (post) {
        document.getElementById('postTitle').value = post.title;
        document.getElementById('postContent').value = post.content;
        document.getElementById('formTitle').textContent = 'Edit Post';
        document.getElementById('submitPostButton').textContent = 'Update';
    } else {
        document.getElementById('formTitle').textContent = 'Create Post';
        document.getElementById('submitPostButton').textContent = 'Create';
    }
}

function showPostsDisplayScreen() {
    document.getElementById('postsDisplayScreen').classList.remove('hidden');
    document.getElementById('createPostScreen').classList.add('hidden');
}

function displayPosts() {
    const postsList = document.getElementById('postsList');
    postsList.innerHTML = '';
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <button onclick="editPost(${post.id})">Edit</button>
    `;
        postsList.appendChild(postDiv);
    });
}

function editPost(id) {
    const post = posts.find(post => post.id === id);
    editPostId = id;
    showCreatePostScreen(post);
}

// Initial display
showPostsDisplayScreen();
displayPosts();
