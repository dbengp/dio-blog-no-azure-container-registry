// public/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000'; // Assumindo JSON Server ou sua API de backend

    // Lógica para a página inicial (index.html)
    if (document.getElementById('posts-container')) {
        fetch(`${API_URL}/posts`)
            .then(response => response.json())
            .then(posts => {
                const postsContainer = document.getElementById('posts-container');
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('post-card');
                    postElement.innerHTML = `
                        <h2><a href="/post.html?id=${post.id}">${post.title}</a></h2>
                        <p class="post-meta">Por ${post.author} em ${new Date(post.publicationDate).toLocaleDateString()}</p>
                        <p>${post.content.substring(0, 150)}...</p>
                        <a href="/post.html?id=${post.id}" class="read-more">Ler Mais</a>
                    `;
                    postsContainer.appendChild(postElement);
                });
            })
            .catch(error => console.error('Erro ao carregar posts:', error));
    }

    // Lógica para a página de detalhes do post (post.html)
    if (document.getElementById('post-detail-title')) {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id');

        if (postId) {
            fetch(`${API_URL}/posts/${postId}`)
                .then(response => response.json())
                .then(post => {
                    if (post) {
                        document.getElementById('post-title').textContent = post.title;
                        document.getElementById('post-detail-title').textContent = post.title;
                        document.getElementById('post-author').textContent = post.author;
                        document.getElementById('post-date').textContent = new Date(post.publicationDate).toLocaleDateString();
                        document.getElementById('post-content').innerHTML = `<p>${post.content}</p>`; // Usar innerHTML para parágrafos

                        // Carregar comentários (pode ser em um arquivo separado como comments.js)
                        // fetch(`${API_URL}/comments?postId=${postId}`)...
                    } else {
                        document.getElementById('post-detail-title').textContent = 'Post não encontrado';
                    }
                })
                .catch(error => console.error('Erro ao carregar detalhes do post:', error));
        } else {
            document.getElementById('post-detail-title').textContent = 'ID do post não fornecido';
        }
    }
});