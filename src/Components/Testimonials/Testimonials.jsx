import { useState } from "react";
import "./Testimonials.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import profileImg from "../../assets/profile.jpg";

const REVIEWS_DATA = [
  {
    id: 1,
    quote:
      "Working with Farman transformed our web product completely. From sleek React interfaces to robust Python backend integration, communication was seamless, delivery was on time, and the attention to detail was exceptional.",
    author: "Imran Sheikh",
    role: "Founder, Star Beekeepers",
    image: profileImg
  },
  {
    id: 2,
    quote:
      "Farman possesses a rare combination of strong algorithmic thinking in Python and an aesthetic eye for frontend user experiences. His work on the real-time chat and dashboard systems exceeded expectations.",
    author: "Aaqib Mir",
    role: "Lead Coordinator, CityCabs Services",
    image: profileImg
  },
  {
    id: 3,
    quote:
      "During his internship connected to CID Srinagar, Farman proved himself disciplined, fast-learning, and highly capable in full-stack web and data workflows. A dependable engineer who solves real problems.",
    author: "Project Supervisor",
    role: "CID Srinagar Tech Initiative",
    image: profileImg
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
  };

  const current = REVIEWS_DATA[currentIndex];

  return (
    <section id="testimonials" className="editorial-section">
      {/* Left Margin Indicator */}
      <div className="section-indicator">
        <span className="section-indicator-dot" />
        <span>TESTIMONIALS / 03</span>
      </div>

      {/* Main Content */}
      <div className="editorial-content-area">
        <div className="editorial-heading-row">
          <h2 className="editorial-section-title">
            Kind Words from<br />Happy Clients.
          </h2>

          {/* Prev/Next Slider Controls matching reference image */}
          <div className="reviews-slider-arrows">
            <button
              type="button"
              className="slider-arrow-btn"
              onClick={prevReview}
              aria-label="Previous review"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="slider-arrow-btn"
              onClick={nextReview}
              aria-label="Next review"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Testimonial Card Display matching reference image */}
        <div className="testimonial-display-card">
          <div className="testimonial-avatar-wrap">
            <img
              src={current.image}
              alt={current.author}
              className="testimonial-avatar-img"
            />
            <div className="avatar-ambient-glow" />
          </div>

          <div className="testimonial-quote-wrap">
            <blockquote className="testimonial-quote-text">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <div className="testimonial-author-meta">
              <span className="author-name">{current.author}</span>
              <span className="author-role">{current.role}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
