document.addEventListener('DOMContentLoaded', () => {
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const reviewsContainer = document.getElementById('reviews-container');
    const featuredReviewsContainer = document.getElementById('featured-reviews-container');
    const updateForm = document.getElementById('update-form');
    const searchInput = document.getElementById('search-input');
    const themeSwitch = document.getElementById('theme-switch');

    const players = [
        { name: "Player 1", score: 1500, stars: 5, avatar: "https://via.placeholder.com/50" },
        { name: "Player 2", score: 1400, stars: 4, avatar: "https://via.placeholder.com/50" },
        { name: "Player 3", score: 1300, stars: 4, avatar: "https://via.placeholder.com/50" },
    ];

    const reviews = [
        { reviewer: "Reviewer 1", stars: 4, text: "Great effort and teamwork!" },
        { reviewer: "Reviewer 2", stars: 5, text: "Outstanding performance!" },
    ];

    const renderLeaderboard = () => {
        leaderboardContainer.innerHTML = '';
        players
            .sort((a, b) => b.score - a.score)
            .forEach((player) => {
                const row = document.createElement('div');
                row.className = 'leaderboard-row';
                row.innerHTML = `
                    <img src="${player.avatar}" alt="Avatar">
                    <p class="player-name">${player.name}</p>
                    <p class="player-score">${player.score} Points</p>
                    <p class="player-stars">${'★'.repeat(player.stars)}</p>
                `;
                leaderboardContainer.appendChild(row);
            });
    };

    const renderFeaturedReviews = () => {
        featuredReviewsContainer.innerHTML = '';
        reviews.slice(0, 2).forEach((review) => {
            const card = document.createElement('div');
            card.className = 'featured-review';
            card.innerHTML = `
                <p><strong>${review.reviewer}</strong></p>
                <p>${review.text}</p>
                <p>${'★'.repeat(review.stars)}</p>
            `;
            featuredReviewsContainer.appendChild(card);
        });
    };

    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const playerName = document.getElementById('player-name').value;
        const playerScore = parseInt(document.getElementById('player-score').value);
        const playerStars = parseInt(document.getElementById('player-stars').value);
        const playerAvatar = document.getElementById('player-avatar').value || "https://via.placeholder.com/50";
        const reviewText = document.getElementById('review-text').value;

        const existingPlayer = players.find((player) => player.name === playerName);
        if (existingPlayer) {
            existingPlayer.score = playerScore;
            existingPlayer.stars = playerStars;
            existingPlayer.avatar = playerAvatar;
        } else {
            players.push({ name: playerName, score: playerScore, stars: playerStars, avatar: playerAvatar });
        }

        if (reviewText) {
            reviews.push({ reviewer: playerName, stars: playerStars, text: reviewText });
        }

        renderLeaderboard();
        renderFeaturedReviews();
        updateForm.reset();
    });

    searchInput.addEventListener('input', (e) => {
        const filterText = e.target.value.toLowerCase();
        const filteredPlayers = players.filter((player) =>
            player.name.toLowerCase().includes(filterText)
        );

        leaderboardContainer.innerHTML = '';
        filteredPlayers.forEach((player) => {
            const row = document.createElement('div');
            row.className = 'leaderboard-row';
            row.innerHTML = `
                <img src="${player.avatar}" alt="Avatar">
                <p class="player-name">${player.name}</p>
                <p class="player-score">${player.score} Points</p>
                <p class="player-stars">${'★'.repeat(player.stars)}</p>
            `;
            leaderboardContainer.appendChild(row);
        });
    });

    themeSwitch.addEventListener('change', (e) => {
        document.documentElement.setAttribute('data-theme', e.target.checked ? 'light' : 'dark');
    });

    renderLeaderboard();
    renderFeaturedReviews();
});