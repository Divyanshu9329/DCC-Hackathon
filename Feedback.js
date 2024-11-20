document.addEventListener("DOMContentLoaded", () => {
  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackContainer = document.getElementById("feedbackContainer");
  const stars = document.querySelectorAll(".stars span");
  const ratingValue = document.getElementById("ratingValue");
  const feedbackList = [];

  stars.forEach(star => {
      star.addEventListener("click", () => {
          const value = parseInt(star.getAttribute("data-value"));
          ratingValue.value = value;

          stars.forEach(s => s.classList.remove("selected"));
          stars.forEach((s, idx) => {
              if (idx < value) s.classList.add("selected");
          });
      });
  });

  feedbackForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const studentName = document.getElementById("studentName").value.trim();
      const feedbackComment = document.getElementById("feedbackComment").value.trim();
      const rating = parseInt(ratingValue.value);
      const score = parseInt(document.getElementById("score").value);

      if (rating === 0) {
          alert("Please provide a star rating.");
          return;
      }

      feedbackList.push({
          studentName,
          feedbackComment,
          rating,
          score,
      });

      renderFeedbackList();

      feedbackForm.reset();
      stars.forEach(star => star.classList.remove("selected"));
      ratingValue.value = "0";
  });

  const renderFeedbackList = () => {
      feedbackContainer.innerHTML = "";

      feedbackList.forEach(feedback => {
          const feedbackCard = document.createElement("div");
          feedbackCard.className = "feedback-card";
          feedbackCard.innerHTML = `
              <h3>${feedback.studentName}</h3>
              <p><strong>Feedback:</strong> ${feedback.feedbackComment}</p>
              <div class="stars">${"★".repeat(feedback.rating)}</div>
              <p><strong>Score:</strong> ${feedback.score}/100</p>
          `;
          feedbackContainer.appendChild(feedbackCard);
      });
  };
});