// public/js/comments.js
document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000';
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    const commentsList = document.getElementById('comments-list');
    const commentForm = document.getElementById('comment-form');

    function loadComments() {
        if (postId) {
            fetch(`${API_URL}/comments?postId=${postId}`)
                .then(response => response.json())
                .then(comments => {
                    commentsList.innerHTML = ''; // Limpa antes de adicionar
                    if (comments.length === 0) {
                        commentsList.innerHTML = '<p>Seja o primeiro a comentar!</p>';
                    } else {
                        comments.forEach(comment => {
                            const commentElement = document.createElement('div');
                            commentElement.classList.add('comment-item');
                            commentElement.innerHTML = `
                                <strong>${comment.author}</strong> em ${new Date(comment.commentDate).toLocaleDateString()}
                                <p>${comment.content}</p>
                            `;
                            commentsList.appendChild(commentElement);
                        });
                    }
                })
                .catch(error => console.error('Erro ao carregar comentários:', error));
        }
    }

    if (commentsList && commentForm) {
        loadComments(); // Carrega comentários ao carregar a página

        commentForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o recarregamento da página

            const authorInput = document.getElementById('comment-author');
            const contentInput = document.getElementById('comment-content');

            const newComment = {
                postId: parseInt(postId!),
                author: authorInput.value,
                content: contentInput.value,
                commentDate: new Date().toISOString()
            };

            fetch(`${API_URL}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComment)
            })
            .then(response => response.json())
            .then(addedComment => {
                console.log('Comentário adicionado:', addedComment);
                authorInput.value = ''; // Limpa o formulário
                contentInput.value = '';
                loadComments(); // Recarrega a lista de comentários
            })
            .catch(error => console.error('Erro ao adicionar comentário:', error));
        });
    }
});