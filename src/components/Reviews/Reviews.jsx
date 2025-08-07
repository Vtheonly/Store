// src/components/Reviews/Reviews.jsx
import React, { useState } from "react";
import "./Reviews.css";

const Reviews = ({ productId }) => {
  const [reviews] = useState([
    {
      id: 1,
      name: "Ahmed K.",
      rating: 5,
      date: "2024-01-20",
      comment: "Excellent produit, très bonne qualité. Je recommande vivement !",
      verified: true
    },
    {
      id: 2,
      name: "Fatima B.",
      rating: 4,
      date: "2024-01-18",
      comment: "Très satisfaite de mon achat. La taille correspond parfaitement.",
      verified: true
    },
    {
      id: 3,
      name: "Yacine M.",
      rating: 5,
      date: "2024-01-15",
      comment: "Livraison rapide et produit conforme à la description. Parfait !",
      verified: false
    },
    {
      id: 4,
      name: "Amina L.",
      rating: 4,
      date: "2024-01-12",
      comment: "Bonne qualité, je suis contente de mon achat. Service client réactif.",
      verified: true
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: ""
  });

  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    console.log("New review:", newReview);
    setNewReview({ name: "", rating: 5, comment: "" });
    setShowReviewForm(false);
    // Show success message
    alert("Merci pour votre avis ! Il sera publié après vérification.");
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? "filled" : ""}`}
      >
        ★
      </span>
    ));
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h3>Avis Clients</h3>
        <div className="rating-summary">
          <div className="average-rating">
            <span className="rating-number">{averageRating.toFixed(1)}</span>
            <div className="stars">{renderStars(Math.round(averageRating))}</div>
            <span className="review-count">({reviews.length} avis)</span>
          </div>
          <button 
            className="add-review-btn"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            Laisser un avis
          </button>
        </div>
      </div>

      {showReviewForm && (
        <form className="review-form" onSubmit={handleSubmitReview}>
          <h4>Votre avis</h4>
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              value={newReview.name}
              onChange={(e) => setNewReview({...newReview, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Note</label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
            >
              <option value={5}>5 étoiles - Excellent</option>
              <option value={4}>4 étoiles - Très bien</option>
              <option value={3}>3 étoiles - Bien</option>
              <option value={2}>2 étoiles - Moyen</option>
              <option value={1}>1 étoile - Décevant</option>
            </select>
          </div>
          <div className="form-group">
            <label>Commentaire</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              rows={4}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">Publier l'avis</button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => setShowReviewForm(false)}
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="reviewer-info">
                <span className="reviewer-name">{review.name}</span>
                {review.verified && <span className="verified-badge">✓ Achat vérifié</span>}
              </div>
              <div className="review-meta">
                <div className="stars">{renderStars(review.rating)}</div>
                <span className="review-date">{new Date(review.date).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;