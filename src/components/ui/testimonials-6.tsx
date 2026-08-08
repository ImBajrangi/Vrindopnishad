import React from "react";
import "./testimonials.css";

type Testimonial = {
  quote: string;
  image: string;
  name: string;
  role: string;
  company?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Vrindopnishad has digitized ancient manuscripts with remarkable fidelity. The stotra audio clarity is incomparable.",
    image: "https://images.shadcnspace.com/assets/profiles/albert.webp",
    name: "Swami Prakashananda",
    role: "Vedic Scholar",
    company: "Haridwar",
  },
  {
    quote:
      "Accessing authentic saint discourses and daily nitya niyam right at dawn transformed my spiritual sadhana.",
    image: "https://images.shadcnspace.com/assets/profiles/linda.webp",
    name: "Ananya Deshmukh",
    role: "Daily Sadhak",
    company: "Vrindavan Dham",
  },
  {
    quote:
      "An extraordinary digital sanctuary. The Gita shloka translations and cross-references are scholarly and pure.",
    image: "https://images.shadcnspace.com/assets/profiles/rough.webp",
    name: "Dr. Ramanuj Shastri",
    role: "Sanskrit Professor",
    company: "BHU Varanasi",
  },
  {
    quote:
      "Navigating Braj Parikrama with real-time temple timings and sattvic meal support made our pilgrimage seamless.",
    image: "https://images.shadcnspace.com/assets/profiles/jessica.webp",
    name: "Radhika Sharma",
    role: "Braj Yatri",
    company: "New Delhi",
  },
  {
    quote:
      "Preserving rare Braj literature and manuscript scans in high resolution is a divine gift for future generations.",
    image: "https://images.shadcnspace.com/assets/profiles/jenny.webp",
    name: "Acharya Devvrat",
    role: "Heritage Archivist",
    company: "Mathura Sanctuary",
  },
  {
    quote:
      "The audio player interface for saint discourses and classical kirtan is fast, elegant, and spiritually uplifting.",
    image: "https://images.shadcnspace.com/assets/profiles/albert.webp",
    name: "Govind Das",
    role: "Kirtan Practitioner",
    company: "ISKCON Vrindavan",
  },
  {
    quote:
      "The responsive design and dark mode interface make night-time scripture reading deeply peaceful.",
    image: "https://images.shadcnspace.com/assets/profiles/linda.webp",
    name: "Priya Patel",
    role: "Spiritual Seeker",
    company: "Mumbai",
  },
  {
    quote:
      "Combining modern web elegance with sacred Vedic wisdom is done with sublime perfection here.",
    image: "https://images.shadcnspace.com/assets/profiles/rough.webp",
    name: "Vikramaditya Sen",
    role: "Philosopher",
    company: "Kolkata",
  },
  {
    quote:
      "Every detail—from the gentle light rays to authentic Sanskrit recitations—exudes pure devotion.",
    image: "https://images.shadcnspace.com/assets/profiles/jessica.webp",
    name: "Meera Sharma",
    role: "Sadhika",
    company: "Jaipur",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
  return (
    <section className="v-testimonial-section">
      <div className="v-testimonial-header">
        <span className="v-testimonial-badge">Testimonials</span>
        <h2 className="v-testimonial-title">What Seekers Say</h2>
        <p className="v-testimonial-desc">Authentic experiences from devotees, scholars, and sadhaks around the world.</p>
      </div>

      <div className="v-testimonial-slider-container">
        {/* Column 1 */}
        <div className="v-testimonial-column">
          <div className="v-infinite-track-vertical" style={{ animationDuration: '30s' }}>
            {[...firstColumn, ...firstColumn].map((t, i) => (
              <TestimonialsCard key={`col1-${t.name}-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        {/* Column 2 */}
        <div className="v-testimonial-column">
          <div className="v-infinite-track-vertical" style={{ animationDuration: '45s' }}>
            {[...secondColumn, ...secondColumn].map((t, i) => (
              <TestimonialsCard key={`col2-${t.name}-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        {/* Column 3 */}
        <div className="v-testimonial-column">
          <div className="v-infinite-track-vertical" style={{ animationDuration: '35s' }}>
            {[...thirdColumn, ...thirdColumn].map((t, i) => (
              <TestimonialsCard key={`col3-${t.name}-${i}`} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsCard({ testimonial }: { testimonial: Testimonial }) {
  const { quote, image, name, role, company } = testimonial;
  return (
    <figure className="v-testimonial-card">
      <blockquote className="v-testimonial-quote">"{quote}"</blockquote>
      <figcaption className="v-testimonial-author">
        <img
          src={image}
          alt={`${name}'s profile`}
          className="v-testimonial-avatar"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f59e0b&color=fff`;
          }}
        />
        <div className="v-testimonial-info">
          <cite className="v-testimonial-name">{name}</cite>
          <span className="v-testimonial-role">
            {role}{company ? `, ${company}` : ''}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

export default TestimonialsSection;
