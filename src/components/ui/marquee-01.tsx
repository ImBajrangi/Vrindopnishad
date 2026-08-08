import React from "react";
import { Star } from "lucide-react";
import "./testimonials.css";

const reviews = [
  {
    name: "Radhika Sharma",
    username: "@radhika_sadhika",
    role: "Spiritual Practitioner",
    body: "Daily nitya niyam recitations and authentic manuscript access transformed my daily spiritual practice completely.",
    profile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Arjun Verma",
    username: "@arjun_vedic",
    role: "Vedic Scholar",
    body: "Seamless UI coupled with instant access to authentic saint discourses and PDF archives. Truly exceptional experience!",
    profile: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Priya Patel",
    username: "@priya_yatri",
    role: "Braj Parikrama Yatri",
    body: "Foody Vrinda sattvic meal delivery during Braj Parikrama was pure bliss. Hygienic, timely, and spiritually uplifting.",
    profile: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Swami Prakashananda",
    username: "@prakashananda",
    role: "Sanskrit Researcher",
    body: "Vrindopnishad digitizes rare sacred manuscripts with remarkable scholarly reverence and high audio clarity.",
    profile: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Acharya Devvrat",
    username: "@devvrat_mathura",
    role: "Literature Custodian",
    body: "Preserving rare Braj literature and high-resolution manuscript archives is a priceless blessing for future generations.",
    profile: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    name: "Govind Das",
    username: "@govind_kirtan",
    role: "Classical Kirtankar",
    body: "The audio player interface for saint discourses and classical kirtan is fast, elegant, peaceful, and sublime.",
    profile: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    rating: 5,
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({
  profile,
  name,
  username,
  role,
  body,
  rating = 5,
}: {
  profile: string;
  name: string;
  username: string;
  role?: string;
  body: string;
  rating?: number;
}) => {
  return (
    <div className="v-marquee-card">
      {/* 5-Star Rating Row */}
      <div className="v-testimonial-stars">
        {Array.from({ length: rating }).map((_, idx) => (
          <Star key={idx} size={14} className="star-icon" fill="#f59e0b" color="#f59e0b" />
        ))}
      </div>

      {/* Testimonial Quote */}
      <p className="v-testimonial-quote">“{body}”</p>

      {/* Author Profile Footer */}
      <div className="v-testimonial-author">
        <img
          className="v-testimonial-avatar"
          alt={name}
          src={profile}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f59e0b&color=fff`;
          }}
        />
        <div className="v-testimonial-info">
          <span className="v-testimonial-name">{name}</span>
          <span className="v-testimonial-role">{role || username}</span>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialMarqueeDemo() {
  return (
    <section className="v-testimonial-section">
      {/* Section Header */}
      <div className="v-testimonial-header">
        <h2 className="v-testimonial-title">Loved by Spiritual Seekers</h2>
        <p className="v-testimonial-desc">
          Discover how Vrindopnishad is transforming daily sadhana, manuscript research, and sacred pilgrimage.
        </p>
      </div>

      {/* Marquee Rows Container */}
      <div className="v-marquee-wrapper">
        {/* Row 1 - Left to Right */}
        <div className="v-marquee-row">
          <div className="v-infinite-track-horizontal track-row-1">
            {[...firstRow, ...firstRow, ...firstRow, ...firstRow].map((review, i) => (
              <ReviewCard key={`row1-${review.username}-${i}`} {...review} />
            ))}
          </div>
        </div>

        {/* Row 2 - Right to Left */}
        <div className="v-marquee-row">
          <div className="v-infinite-track-horizontal track-row-2">
            {[...secondRow, ...secondRow, ...secondRow, ...secondRow].map((review, i) => (
              <ReviewCard key={`row2-${review.username}-${i}`} {...review} />
            ))}
          </div>
        </div>

        {/* Side Gradient Fade Overlays */}
        <div className="v-marquee-fade-left" />
        <div className="v-marquee-fade-right" />
      </div>
    </section>
  );
}

export { TestimonialMarqueeDemo as TestimonialMarquee };

