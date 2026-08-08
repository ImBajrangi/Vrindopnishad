import React from "react";
import { Star } from "lucide-react";
import "./testimonials.css";

type Testimonial13Item = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
};

const items: Testimonial13Item[] = [
  {
    id: "1",
    name: "Radhika Sharma",
    role: "Daily Sadhak",
    company: "Vrindavan Dham",
    avatar: "https://images.shadcnspace.com/assets/profiles/linda.webp",
    rating: 5,
    content: "The daily nitya niyam and authentic manuscript access transformed my daily spiritual practice. Exquisite experience!",
  },
  {
    id: "2",
    name: "Arjun Verma",
    role: "Devotee & Researcher",
    company: "Delhi",
    avatar: "https://images.shadcnspace.com/assets/profiles/albert.webp",
    rating: 5,
    content: "Seamless UI coupled with instant access to authentic saint discourses and PDF archives. Highly recommended!",
  },
  {
    id: "3",
    name: "Priya Patel",
    role: "Pilgrim",
    company: "Mumbai",
    avatar: "https://images.shadcnspace.com/assets/profiles/jessica.webp",
    rating: 5,
    content: "Foody Vrinda sattvic meal delivery during Braj Parikrama was pure bliss. Pure, hygienic, and spiritually uplifting.",
  },
];

export function Testimonials13() {
  return (
    <section className="t13-container">
      <div className="t13-header">
        <div className="t13-badge">
          <Star style={{ width: '14px', height: '14px', fill: '#f59e0b', color: '#f59e0b' }} />
          Community Reviews
        </div>
        <h2 className="t13-title">Loved by Thousands of Seekers</h2>
        <p className="t13-desc">
          Read genuine experiences from devotees, scholars, and daily sadhaks across the globe.
        </p>
      </div>

      <div className="t13-grid">
        {items.map((item) => (
          <div key={item.id} className="t13-card">
            <div>
              <div className="t13-stars">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} style={{ width: '16px', height: '16px', fill: '#f59e0b', color: '#f59e0b' }} />
                ))}
              </div>
              <p className="t13-quote">"{item.content}"</p>
            </div>

            <div className="t13-author">
              <img
                src={item.avatar}
                alt={item.name}
                className="t13-avatar"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=f59e0b&color=fff`;
                }}
              />
              <div>
                <p className="t13-name">{item.name}</p>
                <p className="t13-role">{item.role}, {item.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials13;
