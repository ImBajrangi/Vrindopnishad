import React from "react";
import { X } from "lucide-react";
import "./testimonials.css";

interface LogoCloudProps {
  title?: string;
}

const items = [
  {
    type: "logo",
    name: "goldline",
    svg: (
      <svg className="lc3-brand-svg" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 24V16M20 24V12M24 24V18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <text x="40" y="26" fill="currentColor" fontSize="18" fontWeight="700" letterSpacing="-0.5">goldline</text>
      </svg>
    )
  },
  {
    type: "testimonial",
    name: "Jane Smith",
    role: "Product Manager",
    avatar: "https://images.shadcnspace.com/assets/profiles/linda.webp",
    quote: "The user experience is top-notch! The interface is clean, intuitive, and easy to navigate."
  },
  {
    type: "logo",
    name: "amara",
    svg: (
      <svg className="lc3-brand-svg" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
        <text x="20" y="25" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="700">a</text>
        <text x="42" y="26" fill="currentColor" fontSize="19" fontWeight="700" letterSpacing="-0.5">amara</text>
      </svg>
    )
  },
  {
    type: "testimonial",
    name: "Daniel Martinez",
    role: "Full-Stack Developer",
    avatar: "https://images.shadcnspace.com/assets/profiles/rough.webp",
    quote: "The best investment we've made! The support team is also super responsive and helpful."
  },
  {
    type: "logo",
    name: "kanba",
    svg: (
      <svg className="lc3-brand-svg" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 20C12 15 16 11 21 11C26 11 30 15 30 20C30 25 26 29 21 29" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M17 25C17 20 21 16 26 16C31 16 35 20 35 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <text x="44" y="26" fill="currentColor" fontSize="19" fontWeight="700" letterSpacing="-0.5">kanba</text>
      </svg>
    )
  },
  {
    type: "testimonial",
    name: "John Doe",
    role: "Software Engineer",
    avatar: "https://images.shadcnspace.com/assets/profiles/albert.webp",
    quote: "This product has completely transformed the way we work. The efficiency and ease of use are unmatched!"
  }
];

export function LogoCloud3({ title }: LogoCloudProps) {
  return (
    <div className="lc3-container">
      {title && <p className="lc3-title">{title}</p>}

      <div className="lc3-marquee-wrapper">
        <div className="v-infinite-track-horizontal" style={{ animationDuration: '35s' }}>
          {[...items, ...items].map((item, index) => (
            <React.Fragment key={`item-${index}`}>
              {item.type === "logo" ? (
                <div className="lc3-logo-box">
                  {item.svg}
                </div>
              ) : (
                <div className="lc3-testimonial-box">
                  <div className="lc3-card-header">
                    <div className="lc3-author-row">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="lc3-avatar"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=f59e0b&color=fff`;
                        }}
                      />
                      <div className="lc3-author-text">
                        <span className="lc3-name">{item.name}</span>
                        <span className="lc3-role">{item.role}</span>
                      </div>
                    </div>
                    <X className="lc3-close-icon" />
                  </div>
                  <p className="lc3-quote">{item.quote}</p>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Gradient edge masks */}
        <div className="lc3-mask-left"></div>
        <div className="lc3-mask-right"></div>
      </div>
    </div>
  );
}

export default LogoCloud3;
